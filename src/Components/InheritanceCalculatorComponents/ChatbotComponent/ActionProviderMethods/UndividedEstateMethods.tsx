import ActionProvider from '../ActionProvider';
import InfoMessagesWidget from '../Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget';
import { ChatbotInterface } from '../Generics';
import Person from '../Helper/Classes/Person';
import {
    ChatStepTypes,
    QuestionType,
    undividedOwnershipType,
} from '../Helper/Enums/ChatStepTypes';
import { ParentChildSelector } from '../Helper/Enums/ParentChildSelector';
import {
    CurrencyOutput,
    ParseCurrencyStringForOutput,
} from '../Helper/Methods/HandleCurrency';
import QuestionConstants from '../Helper/Methods/QuestionConstants';
import {
    createNewPerson,
    getNode,
    getPerson,
    get_class_and_distance_closest_surviving_relative,
} from './OtherChatbotMethods';

export const undividedEstateChoice = (
    undividedEstateChoiceResponse: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (undividedEstateChoiceResponse) {
        state = {
            ...state,
            stepID: ChatStepTypes.undividedEstateStep,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part1,
                undividedEstateChoice: undividedEstateChoiceResponse,
            },
        };
        const totalEstateNetValueQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.TotalEstateNetValueQuestion,
        );
        state = actionProvider.addMessageToBotState(
            totalEstateNetValueQuestion,
            state,
        );
    } else {
        state = {
            ...state,
            stepID: ChatStepTypes.netWealthStep,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: 'none',
                undividedEstateChoice: undividedEstateChoiceResponse,
            },
        };
        const netWealthQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.NetWealthQuestion,
        );
        state = actionProvider.addMessageToBotState(netWealthQuestion, state);
    }
    return state;
};

export const totalEstateValue = (
    totalEstateValueResponse: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const totalEstateValueQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.TotalEstateNetValueQuestion,
    );
    const currencyIntResponse = CurrencyOutput(totalEstateValueResponse);
    const currencyStringResponse = ParseCurrencyStringForOutput(
        currencyIntResponse[1],
    );
    const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
    if (currencyIntResponse[0] === 5) {
        const ownershipTypeQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.OwnershipTypeQuestion,
            QuestionConstants.OwnershipQuestionWidgetOptions,
        );
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part2,
                totalEstateValue: parseInt(currencyIntResponse[1]),
            },
        };
        const currencyCustom = actionProvider.createClientMessage(currencyJSX);
        state = actionProvider.addMessageToBotState(currencyCustom, state);
        state = actionProvider.addMessageToBotState(
            ownershipTypeQuestion,
            state,
        );
    } else {
        const totalEstateWarning = actionProvider.createChatBotMessage(
            QuestionConstants.TotalEstateNetValueWarning,
        );

        state = actionProvider.addMessageToBotState(totalEstateWarning, state);
        state = actionProvider.addMessageToBotState(
            totalEstateValueQuestion,
            state,
        );
    }
    return state;
};

export const undividedOwnershipResponse = (
    ownershipResponse: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (ownershipResponse === undividedOwnershipType.felleseie) {
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part6,
                undividedEstateSeparateWealth:
                    state.undividedEstate.totalEstateValue / 2,
                ownershipType: undividedOwnershipType.felleseie,
            },

            netWealth: state.undividedEstate.totalEstateValue / 2,
        };
        if (state.undividedEstate.undividedEstateSeparateWealth > 0) {
            const undividedEstateSpouseQuestion =
                actionProvider.createChatBotMessage(
                    QuestionConstants.UndividedEstateSpouseQuestion,
                );
            state = actionProvider.addMessageToBotState(
                undividedEstateSpouseQuestion,
                state,
            );
        } else {
            if (
                state.person !== state.testator &&
                state.person._undividedEstateSpouse
            ) {
                const temp_class_undivided_spouse =
                    get_class_and_distance_closest_surviving_relative(
                        getNode(
                            state.person._undividedEstateSpouse,
                            state.nodeMap,
                        ),
                        state,
                    )[0];
                if (temp_class_undivided_spouse === undefined) {
                    state.netWealth =
                        state.netWealth +
                        state.undividedEstate.undividedEstateSeparateWealth;
                    state.undividedEstate.undividedEstateSeparateWealth = 0;
                }

                if (state.netWealth <= 0) {
                    actionProvider.askFinalQuestion(state);
                } else {
                    actionProvider.setState((state: any) => {
                        state = {
                            ...state,
                            stepID: ChatStepTypes.underAgeStep,
                        };
                    });
                    const underAgeQuestion =
                        actionProvider.createChatBotMessage(
                            QuestionConstants.UnderAgeQuestion,
                            QuestionConstants.YesNoWidgetOptions,
                        );
                    state = actionProvider.addMessageToBotState(
                        underAgeQuestion,
                        state,
                    );
                    return state;
                }
            }
        }
    } else if (ownershipResponse === 'DELVIS SÆREIE') {
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part3,
            },
        };
        const delvisFirstQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.DelvisFirstQuestion,
        );
        state = actionProvider.addMessageToBotState(delvisFirstQuestion, state);
    } else if (ownershipResponse === 'FULLT SÆREIE') {
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part5,
            },
        };
        const fulltSaereieQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.FulltSaereieQuestion,
        );
        state = actionProvider.addMessageToBotState(
            fulltSaereieQuestion,
            state,
        );
    } else {
        const ownershipTypeWarning = actionProvider.createChatBotMessage(
            QuestionConstants.OwnershipTypeWarning,
        );
        const ownershipTypeQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.OwnershipTypeQuestion,
            QuestionConstants.OwnershipQuestionWidgetOptions,
        );
        state = actionProvider.addMessageToBotState(
            ownershipTypeWarning,
            state,
        );
        state = actionProvider.addMessageToBotState(
            ownershipTypeQuestion,
            state,
        );
    }
    return state;
};

export const delvisFirstResponse = (
    response: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const currencyIntResponse = CurrencyOutput(response);
    const currencyStringResponse = ParseCurrencyStringForOutput(
        currencyIntResponse[1],
    );
    const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
    if (currencyIntResponse[0] === 5) {
        const currencyCustom = actionProvider.createClientMessage(currencyJSX);
        state = actionProvider.addMessageToBotState(currencyCustom, state);
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part4,
                temp_first: parseInt(currencyIntResponse[1]),
            },
        };
        const delvisSecondQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.DelvisSecondQuestion,
        );
        state = actionProvider.addMessageToBotState(
            delvisSecondQuestion,
            state,
        );
    } else {
        const netWealthWarning = actionProvider.createChatBotMessage(
            QuestionConstants.NetWealthWarning,
        );
        const delvisFirstQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.DelvisFirstQuestion,
        );
        state = actionProvider.addMessageToBotState(netWealthWarning, state);
        state = actionProvider.addMessageToBotState(delvisFirstQuestion, state);
    }
    return state;
};

export const delvisSecondResponse = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const currencyIntResponse = CurrencyOutput(res);
    const currencyStringResponse = ParseCurrencyStringForOutput(
        currencyIntResponse[1],
    );
    const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
    if (currencyIntResponse[0] === 5) {
        const currencyCustom = actionProvider.createClientMessage(currencyJSX);
        state = actionProvider.addMessageToBotState(currencyCustom, state);
        state.undividedEstate.temp_last = parseInt(currencyIntResponse[1]);
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part6,
                undividedEstateSeparateWealth:
                    (state.undividedEstate.totalEstateValue -
                        state.undividedEstate.temp_last -
                        state.undividedEstate.temp_first) /
                        2 +
                    state.undividedEstate.temp_first,
            },
            netWealth:
                (state.undividedEstate.totalEstateValue -
                    state.undividedEstate.temp_last -
                    state.undividedEstate.temp_first) /
                    2 +
                state.undividedEstate.temp_last,
        };
        const undividedEstateSpouseQuestion =
            actionProvider.createChatBotMessage(
                QuestionConstants.UndividedEstateSpouseQuestion,
            );
        state = actionProvider.addMessageToBotState(
            undividedEstateSpouseQuestion,
            state,
        );
    } else {
        const netWealthWarning = actionProvider.createChatBotMessage(
            QuestionConstants.NetWealthWarning,
        );
        const delvisSecondQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.DelvisSecondQuestion,
        );
        state = actionProvider.addMessageToBotState(netWealthWarning, state);
        state = actionProvider.addMessageToBotState(
            delvisSecondQuestion,
            state,
        );
    }
    return state;
};

export const delvisFulltResponse = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const currencyIntResponse = CurrencyOutput(res);
    const currencyStringResponse = ParseCurrencyStringForOutput(
        currencyIntResponse[1],
    );
    const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
    if (currencyIntResponse[0] === 5) {
        const currencyCustom = actionProvider.createClientMessage(currencyJSX);
        state = actionProvider.addMessageToBotState(currencyCustom, state);
        state = {
            ...state,
            undividedEstate: {
                ...state.undividedEstate,
                undivided_flag: QuestionType.part6,
                undividedEstateSeparateWealth:
                    state.undividedEstate.totalEstateValue - parseInt(res),
            },
            netWealth: parseInt(res),
        };
        if (state.undividedEstate.undividedEstateSeparateWealth > 0) {
            const undividedEstateSpouseQuestion =
                actionProvider.createChatBotMessage(
                    QuestionConstants.UndividedEstateSpouseQuestion,
                );
            state = actionProvider.addMessageToBotState(
                undividedEstateSpouseQuestion,
                state,
            );
        }
    } else {
        const netWealthWarning = actionProvider.createChatBotMessage(
            QuestionConstants.NetWealthWarning,
        );
        const fulltSaereieQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.FulltSaereieQuestion,
        );
        state = actionProvider.addMessageToBotState(netWealthWarning, state);
        state = actionProvider.addMessageToBotState(
            fulltSaereieQuestion,
            state,
        );
    }
    return state;
};

export const undividedEstateSpouse = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const undividedSpouseID = res;

    const newUndividedSpouse = createNewPerson(
        undividedSpouseID,
        state,
        actionProvider,
    );

    state.person = newUndividedSpouse;
    state.testator._undividedEstateSpouse = newUndividedSpouse._id;
    state.testator.setPathforPartner(
        ParentChildSelector.undividedSpouse,
        newUndividedSpouse,
    );
    const newUndividedSpouseDetail = Person.getPerson(
        newUndividedSpouse._id,
        state.personsMap,
    );
    newUndividedSpouseDetail._deceased = true;
    const textBeforeSucsrUndvdSpouse = actionProvider.createChatBotMessage(
        QuestionConstants.TextBeforeSucsrUndvdSpouse,
    );
    state = actionProvider.addMessageToBotState(
        textBeforeSucsrUndvdSpouse,
        state,
    );
    state = {
        ...state,
        stepID: ChatStepTypes.undividedEstateStep,
        successor_flag: QuestionType.part3,
        temp_person: newUndividedSpouse,
        undividedSpouseId: newUndividedSpouse._id,
    };
    newUndividedSpouse._partnerNode = state.testator._id;
    const newSuccessorTogetherQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.undividedChildrenTogetherCount(),
    );
    state = actionProvider.addMessageToBotState(
        newSuccessorTogetherQuestion,
        state,
    );
    return state;
};
export const handleUndividedStep = (
    state: any,
    actionProvider: ActionProvider,
    isTwoParent: boolean,
) => {
    const testator = state.person;
    const testatorDetail = Person.getPerson(testator._id, state.personsMap);
    if (state.undividedEstate.undivided_flag === QuestionType.part6) {
        state.undividedEstate.undivided_flag = QuestionType.part7;
        state.person._partnerNode = null;
        state.successor_flag = QuestionType.part3;
        const newSuccessorUndvdSpouseQuestion =
            actionProvider.createChatBotMessage(
                QuestionConstants.undvdSpouseOtherSuccessorQuestion(),
            );
        state = actionProvider.addMessageToBotState(
            newSuccessorUndvdSpouseQuestion,
            state,
        );
    } else if (state.undividedEstate.undivided_flag === QuestionType.part7) {
        const temp_class_undivided_spouse =
            get_class_and_distance_closest_surviving_relative(
                getNode(state.person._id, state.nodeMap),
                state,
            )[0];
        if (temp_class_undivided_spouse !== 1) {
            // ask parent of und spouse question
            state.undividedEstate.undivided_flag = QuestionType.part8;
            state.parent_flag = QuestionType.part1;
            state.temp_person = state.person;
            const newParentQuestion = actionProvider.createChatBotMessage(
                QuestionConstants.addParentsQuestion1(
                    testatorDetail._personName,
                ),
            );
            state = actionProvider.addMessageToBotState(
                newParentQuestion,
                state,
            );
        } else {
            state = askTestatorOtherChildrenQuestion(state, actionProvider);
        }
    } else {
        if (isTwoParent && state.temp_person._parents.length < 2) {
            state.successor_flag = QuestionType.initialQuestion;
            state.parent_flag = QuestionType.part3;
            const personName = getPerson(
                state.temp_person._id,
                state.personsMap,
            )._personName;
            const secondParentChoiceQuestion =
                actionProvider.createChatBotMessage(
                    QuestionConstants.askSecondParentChoiceQuestion(
                        `${personName}`,
                    ),
                    QuestionConstants.YesNoWidgetOptions,
                );
            state = actionProvider.addMessageToBotState(
                secondParentChoiceQuestion,
                state,
            );
            return state;
        }
        if (state.testator._undividedEstateSpouse) {
            const temp_class_undivided_spouse =
                get_class_and_distance_closest_surviving_relative(
                    getNode(
                        state.testator._undividedEstateSpouse,
                        state.nodeMap,
                    ),
                    state,
                )[0];
            if (temp_class_undivided_spouse === undefined) {
                state.netWealth =
                    state.netWealth +
                    state.undividedEstate.undividedEstateSeparateWealth;
                state.undividedEstate.undividedEstateSeparateWealth = 0;
            }
            if (state.netWealth <= 0) {
                actionProvider.askFinalQuestion(state);
                return state;
            } else {
                state = askTestatorOtherChildrenQuestion(state, actionProvider);
            }
        }
    }
    return state;
};

const askTestatorOtherChildrenQuestion = (
    state: any,
    actionProvider: ActionProvider,
) => {
    state = {
        ...state,
        stepID: ChatStepTypes.testatorOtherChildStep,
    };
    state.successor_flag = QuestionType.part3;
    state.person = state.testator;
    state.temp_person = state.testator;
    const testatorOtherSuccessorQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.testatorOtherSuccessorQuestion(),
    );
    state = actionProvider.addMessageToBotState(
        testatorOtherSuccessorQuestion,
        state,
    );
    return state;
};

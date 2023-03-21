import Person from './Helper/Classes/Person';
import { ChatbotInterface, InitialChatbotState } from './Generics';
import { ChatStepTypes } from './Helper/Enums/ChatStepTypes';
import { ReactElement } from 'react';
import { NodeEntity } from './Helper/Classes/NodeEntity';
import chartSelector from '../../../store/chartSelector';
import { messageService } from './services/ChatbotCommunicator';
import {
    delvisFirstResponse,
    delvisFulltResponse,
    delvisSecondResponse,
    totalEstateValue,
    undividedEstateChoice,
    undividedEstateSpouse,
    undividedOwnershipResponse,
} from './ActionProviderMethods/UndividedEstateMethods';
import QuestionConstants from './Helper/Methods/QuestionConstants';
import {
    handleAskUnderAgeQuestion,
    handleNetWealth,
    handleTestator,
    handleUnderAge,
} from './ActionProviderMethods/TestatorInformationMethods';
import {
    handleCohabitantChoice,
    handleSpouseOption,
    handleSpouseInput,
    handleCohabitantInput,
} from './ActionProviderMethods/PartnerMethods';
import {
    handleAskForNextGrandParent,
    handleChildAliveOption,
    handleGrandParentFirst,
    handleMarriedParents,
    handleParentAliveOption,
    handleParentsInput,
    handleSecondParentExists,
    handleSuccessorCnt,
    handleSuccessorInput,
} from './ActionProviderMethods/RelativeMethods';
import {
    handleClosestSurvivingRelativeChildren,
    handleClosestSurvivingRelativeGrandParens,
    handleClosestSurvivingRelativeParents,
    handleFinalQuestionDef,
} from './ActionProviderMethods/OtherChatbotMethods';
import {
    commonMethods,
    focusWritingArea,
    handleWidgetFunctions,
} from './Helper/Methods/CommonMethods';
import _ from 'lodash';
class ActionProvider {
    // handleMessage(message: string, isClicked = false, isClickedUndiv = false) {
    //     this.setState((state: any) => {
    //         handleWidgetFunctions(
    //             message,
    //             this,
    //             state,
    //             isClicked,
    //             isClickedUndiv,
    //         );
    //         let finalState: any;
    //         if (messageService.getRevert()) {
    //             finalState = messageService.removePreviousStates(
    //                 messageService.getRevertCnt(),
    //             );
    //             messageService.resetRevertCnt();
    //             messageService.resetRevert();

    //             finalState.messages.push(
    //                 state.messages[state.messages.length - 1],
    //             );
    //             state = finalState;
    //         }
    //         const prevState = _.cloneDeep(state);
    //         prevState.messages.pop();
    //         messageService.addPreviousState(prevState);
    //         message = message.trim();
    //         state = commonMethods(message, state, this);
    //         focusWritingArea();
    //         return this.returnState(state);
    //     });
    // }
    createChatBotMessage: (
        questionElement: ReactElement,
        widget?: Record<string, unknown>,
    ) => ReactElement;
    setState: (state: unknown) => ChatbotInterface;
    createClientMessage: (
        messageElement: ReactElement,
    ) => ReactElement<any, any>;
    stateRef: any;
    checkstate: any = null;
    isStarted = true;
    glb_state: any = null;
    GRANDCHILDREN_PATH_LIMIT = 4;
    constructor(
        createChatBotMessage: (
            questionElement: ReactElement,
            widget?: Record<string, unknown>,
        ) => ReactElement,
        setStateFunc: (state: any) => any,
        createClientMessage: (messageElement: ReactElement) => any,
        stateRef: any,
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
    }

    setRevertListeners() {
        messageService.clearAllInternalSubscription();
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const subscription = messageService
            .getMessageInChatbot()
            .subscribe((message: any) => {
                this.revertState();
            });
        messageService.addInternalSubscription(subscription);
    }
    revertState = () => {
        const revertCount = localStorage.getItem('revertCount');
        let lastState: any;
        if (revertCount) {
            lastState = messageService.getPreviousState(parseInt(revertCount));
        } else {
            lastState = messageService.getPreviousState(0);
        }

        if (lastState) {
            if (revertCount) {
                localStorage.setItem(
                    'revertCount',
                    (parseInt(revertCount) + 1).toString(),
                );
            } else {
                localStorage.setItem('revertCount', '1');
            }
            this.setState((state: any) => {
                state = lastState;
                return this.returnState(state);
            });
        }
    };
    handleTestator = (testatorResponse: string, state: any) => {
        return handleTestator(testatorResponse, state, this);
    };

    handleUndividedEstateChoice = (
        undividedEstateChoiceResponse: boolean,
        state: any,
    ) => {
        return undividedEstateChoice(
            undividedEstateChoiceResponse,
            state,
            this,
        );
    };

    handleTotalEstateValueResponse = (
        totalEstateValueResponse: string,
        state: any,
    ) => {
        return totalEstateValue(totalEstateValueResponse, state, this);
    };

    handleOwnershipResponse = (ownershipResponse: string, state: any) => {
        return undividedOwnershipResponse(ownershipResponse, state, this);
    };

    handleDelvisFirstResponse = (res: string, state: any) => {
        return delvisFirstResponse(res, state, this);
    };

    handleDelvisSecondResponse = (res: string, state: any) => {
        return delvisSecondResponse(res, state, this);
    };

    handleFulltSaereieResponse = (res: string, state: any) => {
        return delvisFulltResponse(res, state, this);
    };

    handleUndividedEstateSpouse = (res: string, state: any) => {
        return undividedEstateSpouse(res, state, this);
    };

    handleNetWealth(currencyResponse: string, state: any) {
        /**
         *  * function for handling wealth replies.
         *  * stepID is updated to 3 and then proceed to underage question.
         *  * conditions for reply in currencyDisplayValue function.
         */

        return handleNetWealth(currencyResponse, state, this);
    }

    handleUnderAge = (selectedOption: boolean, state: any) => {
        return handleUnderAge(selectedOption, state, this);
    };

    handleSpouseChoice = (spouseChoice: boolean, state: any) => {
        return handleSpouseOption(spouseChoice, state, this);
    };

    handleSpouseInput = (spouseResponse: string, state: any) => {
        return handleSpouseInput(spouseResponse, state, this);
    };

    handleCohabitantChoice = (
        cohabitantChoiceResponse: boolean,
        state: any,
    ) => {
        return handleCohabitantChoice(cohabitantChoiceResponse, state, this);
    };

    handleCohabitantInput = (cohabitantResponse: string, state: any) => {
        return handleCohabitantInput(cohabitantResponse, state, this);
    };

    handleSuccessorCount(successorCountResponse: string, state: any) {
        return handleSuccessorCnt(successorCountResponse, state, this);
    }
    handleSuccessorInput = (successorResponse: string, state: any) => {
        return handleSuccessorInput(successorResponse, state, this);
    };

    handleChildAliveOption = (aliveResponse: boolean, state: any) => {
        return handleChildAliveOption(aliveResponse, state, this);
    };

    handleSecondParentExists = (secondParentChoice: boolean, state: any) => {
        return handleSecondParentExists(secondParentChoice, state, this);
    };

    handleParentsInput = (parentResponse: string, state: any) => {
        return handleParentsInput(parentResponse, state, this);
    };

    handleParentAliveOption = (alive: boolean, state: any) => {
        return handleParentAliveOption(alive, state, this);
    };

    grandParentFirst = (state: any) => {
        return handleGrandParentFirst(state, this);
    };

    askForNextGrandParent = (state: any) => {
        return handleAskForNextGrandParent(state, this);
    };

    // TODO check options
    handleMarriedParents = (marriedParentsResponse: boolean, state: any) => {
        return handleMarriedParents(marriedParentsResponse, state, this);
    };

    // eslint-disable-next-line
    handleFinalQuestion = (finalOption: boolean, state: any) => {
        return handleFinalQuestionDef(finalOption, state, this);
    };

    askUnderAgeQuestion = (state: any) => {
        return handleAskUnderAgeQuestion(state, this);
    };

    closestSurvivingRelativeChildren = (state: any) => {
        return handleClosestSurvivingRelativeChildren(state, this);
    };

    getParentChildrenIDStrings = (
        collection: Array<number>,
        state: any,
    ): ReactElement => {
        return (
            <strong>{`{{ ${collection
                .map(
                    (child_id) =>
                        Person.getPerson(child_id, state.personsMap)
                            ._personName,
                )
                .filter((name) => name !== '')
                .join(', ')} }}`}</strong>
        );
    };

    askFinalQuestion = (state: any) => {
        // if (state == null) {
        state = {
            ...state,
            stepID: ChatStepTypes.finalStep,
        };
        const finalQuestion = this.createChatBotMessage(
            QuestionConstants.FinalQuestion,
            QuestionConstants.YesNoWidgetOptions,
        );
        state = this.addMessageToBotState(finalQuestion, state);
        return state;
        // }
        // this.setState((state: ChatbotInterface) => {
        //     state = {
        //         ...state,
        //         stepID: ChatStepTypes.finalStep,
        //     };
        //     const finalQuestion = this.createChatBotMessage(
        //         QuestionConstants.FinalQuestion,
        //         QuestionConstants.YesNoWidgetOptions,
        //     );
        //     state = this.addMessageToBotState(finalQuestion, state);
        //     return this.returnState(state);
        // });
    };

    closestSurvivingRelativeParents = (isSecondParent = true, state: any) => {
        return handleClosestSurvivingRelativeParents(
            isSecondParent,
            state,
            this,
        );
    };

    closestSurvivingRelativeGrandParents = (
        isSecondParent = true,
        state: any,
    ) => {
        return handleClosestSurvivingRelativeGrandParens(
            isSecondParent,
            state,
            this,
        );
    };

    // Generic functions
    addMessageToBotState = (messages: any, curState: any): any => {
        // if (!curState) {
        //     this.setState((state: any) => {
        //         if (Array.isArray(messages)) {
        //             state.messages = [...state.messages, ...messages];
        //         } else {
        //             state.messages = [...state.messages, messages];
        //         }
        //         return this.returnState(state);
        //     });
        // } else
        // {
        if (Array.isArray(messages)) {
            curState.messages = [...curState.messages, ...messages];
        } else {
            curState.messages = [...curState.messages, messages];
        }
        return curState;
        // return this.returnState(state);
        // }
    };

    handleDefault = () => {
        const message = this.createChatBotMessage(
            QuestionConstants.DefaultText,
            {
                withAvatar: true,
            },
        );

        this.addMessageToBotState(message, null);
    };

    generateNextID = (id: number) => {
        this.setState((state: any) => {
            state.id = state.id + 1;
            return this.returnState(state);
        });
        return id;
    };

    set_spouse = (
        firstSpouse_id: number,
        secondSpouse_id: number,
        add_for_both: boolean,
        state: any,
    ) => {
        NodeEntity.getNode(firstSpouse_id, state.nodeMap)._spouse =
            secondSpouse_id;
        if (add_for_both) {
            NodeEntity.getNode(secondSpouse_id, state.nodeMap)._spouse =
                firstSpouse_id;
        }
        return state;
    };

    check = (delay: number) => {
        const self = this;
        if (this.isStarted) {
            this.checkstate = setInterval(() => {
                if (self.glb_state !== null) {
                    self.isStarted = false;
                    messageService.sendMessageFromChatbot({
                        detail: self.glb_state,
                    });
                    // close the interval
                    self.glb_state = null;
                    clearInterval(this.checkstate);
                }
            }, delay);
        }
    };
    returnState = (state: any, delay = 200) => {
        setTimeout(() => {
            this.check(delay);
            this.glb_state = chartSelector(state);
        }, delay);
        return state;
    };

    resetChatbot = () => {
        this.setState((state: any) => {
            state = InitialChatbotState;
            state.messages = [];
            state.personMap = new Map();
            state.nodeMap = new Map();
            state.testator = new NodeEntity(0, 0);
            const initialQuestion = this.createChatBotMessage(
                QuestionConstants.TestatorQuestion,
            );
            state = this.addMessageToBotState(initialQuestion, state);
            return this.returnState(state);
        });
    };
    revertLastState = () => {
        // let curState = this.stateRef;
        // console.log('revertLastState');
        // const prevState = messageService.removePreviousState();
        // if (prevState == null) {
        //     this.resetChatbot();
        //     return this.returnState(curState);
        // }
        // curState = {
        //     ...prevState,
        // };
        // this.setState((state: any) => {
        //     state = InitialChatbotState;
        //     state.messages = [];
        //     state.personMap = new Map();
        //     state.nodeMap = new Map();
        //     state.testator = new NodeEntity(0, 0);
        //     return this.returnState(state);
        // });

        // curState.messages = prevState.messages;
        // curState.personMap = prevState.personMap;
        // curState.nodeMap = prevState.nodeMap;
        // curState.testator = prevState.testator;
        // curState.stepID = prevState.stepID;
        // this.setState((state: any) => {

        //     state = _.cloneDeep(prevState);
        //     state.messages = prevState.messages;
        //     state.personMap = prevState.personMap;
        //     state.nodeMap = prevState.nodeMap;
        //     state.testator = prevState.testator;
        //     state.stepID = prevState.stepID;
        //     return this.returnState(state, 500);
        // });
        messageService.setRevert();
        // messageService.printPreviousStates();
        this.setState((state: any) => {
            // console.log('revertLastState');
            // messageService.printPreviousStates();
            // console.log('Revert Cnt: ' + messageService.getRevertCnt());
            const prevState = messageService.getPreviousState(
                messageService.getRevertCnt(),
            );
            messageService.addRevertCnt();
            if (prevState == null) {
                this.resetChatbot();
                return this.returnState(state);
            }
            state = prevState;

            return this.returnState(state);
        });
    };
    delay = (n: number) => {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
        });
    };

    handleValidation = (tempMessages: any, state: any) => {
        // this.setState((state: any) => {
        if (tempMessages && tempMessages.length !== 0) {
            state.messages = tempMessages;
            return state;
        }
        return state;
        // });
    };
}

export default ActionProvider;

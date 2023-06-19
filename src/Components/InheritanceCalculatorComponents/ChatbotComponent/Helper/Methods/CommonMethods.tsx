import ActionProvider from '../../ActionProvider';
import { messageService } from '../../services/ChatbotCommunicator';
import {
    BinaryAnswerTypeYes,
    BinaryAnswerTypeNo,
} from '../Enums/BinaryAnswerTypes';
import { ChatStepTypes, QuestionType } from '../Enums/ChatStepTypes';
import { ValidationType } from '../Enums/ValidationType';
import { ChatbotValidation } from './ChatbotValidation';
import { returnKeyFromEnteredNumberText } from './NumberInput';
import {
    getReturnValueFromBooleanWidget,
    getReturnValueFromUndividedWidget,
} from './OtherMethods';
import _ from 'lodash';
import {
    handleNetWealth,
    handleTestator,
    handleUnderAge,
} from '../../ActionProviderMethods/TestatorInformationMethods';
import {
    delvisFirstResponse,
    delvisFulltResponse,
    delvisSecondResponse,
    totalEstateValue,
    undividedEstateChoice,
    handleUndvdEstateSpouse,
    undividedOwnershipResponse,
} from '../../ActionProviderMethods/UndividedEstateMethods';
import {
    handleChildAliveOption,
    handleMarriedParents,
    handleParentAliveOption,
    handleParentsInput,
    handleSecondParentExists,
    handleSuccessorCnt,
    handleSuccessorInput,
} from '../../ActionProviderMethods/RelativeMethods';
import {
    handleCohabitantChoice,
    handleCohabitantInput,
    handleSpouseInput,
    handleSpouseOption,
} from '../../ActionProviderMethods/PartnerMethods';

export const commonMethods = (
    message: string,
    curState: any,
    actionProvider: ActionProvider,
) => {
    const chatbotValidator = new ChatbotValidation(actionProvider, curState);
    // initialStep
    if (curState.stepID === ChatStepTypes.initalStep) {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue])) {
            return handleTestator(message, curState, actionProvider);
        }
    }

    //testatorStep
    else if (curState.stepID === ChatStepTypes.testatorStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            return evaluateBooleanMessage(
                message,
                curState,
                actionProvider,
                undividedEstateChoice,
            );
        }
    }

    // undividedEstateStep
    else if (curState.stepID === ChatStepTypes.undividedEstateStep) {
        if (curState.undividedEstate.undivided_flag === QuestionType.part1) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.invalidAmount,
                ])
            )
                return totalEstateValue(message, curState, actionProvider);
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part2) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForUndividedOptions,
                ])
            )
                return undividedOwnershipResponse(
                    message,
                    curState,
                    actionProvider,
                );
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part3)
            if (
                chatbotValidator.validate(message, [
                    ValidationType.invalidAmount,
                ])
            )
                return delvisFirstResponse(message, curState, actionProvider);
        if (curState.undividedEstate.undivided_flag === QuestionType.part4)
            if (
                chatbotValidator.validate(message, [
                    ValidationType.invalidAmount,
                ])
            )
                return delvisSecondResponse(message, curState, actionProvider);
        if (curState.undividedEstate.undivided_flag === QuestionType.part5)
            if (
                chatbotValidator.validate(message, [
                    ValidationType.invalidAmount,
                ])
            )
                return delvisFulltResponse(message, curState, actionProvider);
        if (
            curState.undividedEstate.undivided_flag === QuestionType.part6 ||
            curState.undividedEstate.undivided_flag === QuestionType.part7
        )
            return handleSuccessor(
                message,
                curState,
                actionProvider,
                chatbotValidator,
            );
        if (curState.undividedEstate.undivided_flag === QuestionType.part8) {
            if (curState.parent_flag === QuestionType.part1)
                if (
                    chatbotValidator.validate(message, [
                        ValidationType.emptyValue,
                    ])
                )
                    return handleParentsInput(
                        message,
                        curState,
                        actionProvider,
                    );
                else if (curState.parent_flag == QuestionType.part2) {
                    message = message.toLowerCase();
                    if (
                        chatbotValidator.validate(message, [
                            ValidationType.incorrectValueForBoolean,
                        ])
                    )
                        return evaluateBooleanMessage(
                            message,
                            curState,
                            actionProvider,
                            handleParentAliveOption,
                        );
                } else if (curState.parent_flag === QuestionType.part3) {
                    if (
                        chatbotValidator.validate(message, [
                            ValidationType.incorrectValueForBoolean,
                        ])
                    )
                        return evaluateBooleanMessage(
                            message,
                            curState,
                            actionProvider,
                            handleSecondParentExists,
                        );
                }
        }
    } else if (curState.stepID === ChatStepTypes.testatorOtherChildStep)
        return handleSuccessor(
            message,
            curState,
            actionProvider,
            chatbotValidator,
        );
    // netWealthStep
    else if (curState.stepID === ChatStepTypes.netWealthStep) {
        if (
            chatbotValidator.validate(message, [
                ValidationType.emptyValue,
                ValidationType.invalidAmount,
            ])
        )
            return handleNetWealth(message, curState, actionProvider);
    }

    // underAgeStep
    else if (curState.stepID === ChatStepTypes.underAgeStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        )
            return evaluateBooleanMessage(
                message,
                curState,
                actionProvider,
                handleUnderAge,
            );
    }

    // spouse start
    else if (curState.stepID === ChatStepTypes.spouseChoice) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        )
            return evaluateBooleanMessage(
                message,
                curState,
                actionProvider,
                handleSpouseOption,
            );
    } else if (curState.stepID === ChatStepTypes.spouseStep) {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
            return handleSpouseInput(message, curState, actionProvider);
    }
    // spouse end

    // cohabitant start
    else if (curState.stepID === ChatStepTypes.cohabitantChoice) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        )
            return evaluateBooleanMessage(
                message,
                curState,
                actionProvider,
                handleCohabitantChoice,
            );
    } else if (curState.stepID === ChatStepTypes.cohabitantStep) {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
            return handleCohabitantInput(message, curState, actionProvider);
    }

    //  cohabitant end
    // successorStep
    else if (curState.stepID === ChatStepTypes.successorStep) {
        if (curState.successor_flag === QuestionType.part1) {
            if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
                return handleSuccessorInput(message, curState, actionProvider);
        } else if (curState.successor_flag === QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            )
                return evaluateBooleanMessage(
                    message,
                    curState,
                    actionProvider,
                    handleChildAliveOption,
                );
        } else if (curState.successor_flag === QuestionType.part3) {
            const convertedMessage = returnKeyFromEnteredNumberText(message);
            if (
                chatbotValidator.validate(convertedMessage, [
                    ValidationType.emptyValue,
                    ValidationType.onlyDigit,
                ])
            )
                return handleSuccessorCnt(
                    convertedMessage,
                    curState,
                    actionProvider,
                );
        }
    }

    //  parentsStep
    else if (curState.stepID === ChatStepTypes.parentsStep) {
        if (curState.successor_flag === QuestionType.part1) {
            if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
                return handleSuccessorInput(message, curState, actionProvider);
        } else if (curState.successor_flag === QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            )
                return evaluateBooleanMessage(
                    message,
                    curState,
                    actionProvider,
                    handleChildAliveOption,
                );
        } else if (curState.successor_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.emptyValue,
                    ValidationType.onlyDigit,
                ])
            )
                return handleSuccessorCnt(message, curState, actionProvider);
        }
        if (curState.parent_flag === QuestionType.part1) {
            if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
                return handleParentsInput(message, curState, actionProvider);
        } else if (curState.parent_flag == QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            )
                return evaluateBooleanMessage(
                    message,
                    curState,
                    actionProvider,
                    handleParentAliveOption,
                );
        } else if (curState.parent_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            )
                return evaluateBooleanMessage(
                    message,
                    curState,
                    actionProvider,
                    handleSecondParentExists,
                );
        }
    }

    // marriedParentsStep
    else if (curState.stepID === ChatStepTypes.marriedParentsStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        )
            return evaluateBooleanMessage(
                message,
                curState,
                actionProvider,
                handleMarriedParents,
            );
    }

    // grandParentStep
    else if (curState.stepID === ChatStepTypes.grandParentStep) {
        if (curState.successor_flag === QuestionType.part1) {
            if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
                return handleSuccessorInput(message, curState, actionProvider);
        } else if (curState.successor_flag === QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            )
                return evaluateBooleanMessage(
                    message,
                    curState,
                    actionProvider,
                    handleChildAliveOption,
                );
        } else if (curState.successor_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.emptyValue,
                    ValidationType.onlyDigit,
                ])
            )
                return handleSuccessorCnt(message, curState, actionProvider);
        } else if (curState.parent_flag === QuestionType.part1)
            if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
                return handleParentsInput(message, curState, actionProvider);
            else if (curState.parent_flag == QuestionType.part2) {
                message = message.toLowerCase();
                if (
                    chatbotValidator.validate(message, [
                        ValidationType.incorrectValueForBoolean,
                    ])
                )
                    return evaluateBooleanMessage(
                        message,
                        curState,
                        actionProvider,
                        handleParentAliveOption,
                    );
            } else if (curState.parent_flag === QuestionType.part3) {
                if (
                    chatbotValidator.validate(message, [
                        ValidationType.incorrectValueForBoolean,
                    ])
                )
                    return evaluateBooleanMessage(
                        message,
                        curState,
                        actionProvider,
                        handleSecondParentExists,
                    );
            }
    }

    messageService.removePreviousState();
    curState = { ...curState, messages: curState.messages.slice(0, -1) };
    return curState;
};

const disableButtons = () => {
    const buttonElements: any = document.getElementsByClassName(
        'option-selector-button',
    );
    for (let i = 0; i < buttonElements.length; i++) {
        const currentElement = buttonElements[i];
        if (!currentElement.disabled) currentElement.disabled = true;
        currentElement.style.pointerEvents = 'none';
    }
};

const handleSuccessor = (
    message: string,
    curState: any,
    actionProvider: ActionProvider,
    chatbotValidator: ChatbotValidation,
) => {
    if (curState.successor_flag === QuestionType.part1) {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue]))
            return handleSuccessorInput(message, curState, actionProvider);
    } else if (curState.successor_flag === QuestionType.part2) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            return evaluateBooleanMessage(
                message,
                curState,
                actionProvider,
                handleChildAliveOption,
            );
        }
    } else if (curState.successor_flag === QuestionType.part3) {
        if (
            chatbotValidator.validate(message, [
                ValidationType.emptyValue,
                ValidationType.onlyDigit,
            ])
        ) {
            return handleSuccessorCnt(message, curState, actionProvider);
        }
    } else {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue])) {
            return handleUndvdEstateSpouse(message, curState, actionProvider);
        }
        curState.messages = curState.messages.slice(0, -1);
        return curState;
    }
};

export const handleWidgetFunctions = (
    message: string,
    actionProvider: ActionProvider,
    state: any,
    isClicked: boolean,
    isClickedUndiv: boolean,
) => {
    const widgetFunctions = [
        { widget: isClicked, func: getReturnValueFromBooleanWidget },
        { widget: isClickedUndiv, func: getReturnValueFromUndividedWidget },
    ];

    widgetFunctions.forEach(({ widget, func }) => {
        if (widget) {
            const returnValue = func(message, state);
            const clientMessage =
                actionProvider.createClientMessage(returnValue);
            state = actionProvider.addMessageToBotState(clientMessage, state);
        }
    });
    return state;
};

export const focusWritingArea = () => {
    const inputBoxElement = document.getElementsByClassName(
        'react-chatbot-kit-chat-input',
    )[0] as HTMLInputElement;
    if (inputBoxElement) {
        inputBoxElement.focus();
    }
};

export const handleMessage = (
    actionProvider: ActionProvider,
    message: string,
    isClicked = false,
    isClickedUndiv = false,
) => {
    actionProvider.setState((state: any) => {
        handleWidgetFunctions(
            message,
            actionProvider,
            state,
            isClicked,
            isClickedUndiv,
        );
        let finalState: any;
        if (messageService.getRevert()) {
            finalState = messageService.removePreviousStates(
                messageService.getRevertCnt(),
            );
            messageService.resetRevertCnt();
            messageService.resetRevert();

            if (
                finalState.messages[finalState.messages.length - 1] !==
                state.messages[state.messages.length - 1]
            )
                finalState.messages.push(
                    state.messages[state.messages.length - 1],
                );
            state = finalState;
        }
        const prevState = _.cloneDeep(state);
        prevState.messages.pop();
        messageService.addPreviousState(prevState);
        message = message.trim();
        state = commonMethods(message, state, actionProvider);
        state = { ...state };

        focusWritingArea();
        return actionProvider.returnState(state);
    });
};

const evaluateBooleanMessage = (
    message: string,
    curState: any,
    actionProvider: any,
    func: any,
) => {
    disableButtons();
    return message in BinaryAnswerTypeYes
        ? typeof func === 'function'
            ? func(true, curState, actionProvider)
            : alert('func is not a function')
        : message in BinaryAnswerTypeNo
        ? typeof func === 'function'
            ? func(false, curState, actionProvider)
            : alert('func is not a function')
        : alert('check for error');
};

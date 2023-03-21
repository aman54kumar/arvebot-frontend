import ActionProvider from '../../ActionProvider';
import { ChatbotInterface } from '../../Generics';
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

export const commonMethods = (
    message: string,
    curState: any,
    actionProvider: ActionProvider,
) => {
    const chatbotValidator = new ChatbotValidation(actionProvider, curState);
    // initialStep
    if (curState.stepID === ChatStepTypes.initalStep) {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue])) {
            return actionProvider.handleTestator(message, curState);
        }
        return;
    }

    //testatorStep
    if (curState.stepID === ChatStepTypes.testatorStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleUndividedEstateChoice(
                    true,
                    curState,
                );
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleUndividedEstateChoice(
                    false,
                    curState,
                );
            } else {
                alert('check for error');
            }
        }
    }

    // undividedEstateStep
    if (curState.stepID === ChatStepTypes.undividedEstateStep) {
        if (curState.undividedEstate.undivided_flag === QuestionType.part1) {
            return actionProvider.handleTotalEstateValueResponse(
                message,
                curState,
            );
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part2) {
            return actionProvider.handleOwnershipResponse(message, curState);
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part3) {
            return actionProvider.handleDelvisFirstResponse(message, curState);
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part4) {
            return actionProvider.handleDelvisSecondResponse(message, curState);
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part5) {
            return actionProvider.handleFulltSaereieResponse(message, curState);
        }
        if (
            curState.undividedEstate.undivided_flag === QuestionType.part6 ||
            curState.undividedEstate.undivided_flag === QuestionType.part7
        ) {
            return handleSuccessor(
                message,
                curState,
                actionProvider,
                chatbotValidator,
            );
        }
        if (curState.undividedEstate.undivided_flag === QuestionType.part8) {
            if (curState.parent_flag === QuestionType.part1) {
                return actionProvider.handleParentsInput(message, curState);
            } else if (curState.parent_flag == QuestionType.part2) {
                message = message.toLowerCase();
                if (
                    chatbotValidator.validate(message, [
                        ValidationType.incorrectValueForBoolean,
                    ])
                ) {
                    if (message in BinaryAnswerTypeYes) {
                        disableButtons();
                        return actionProvider.handleParentAliveOption(
                            true,
                            curState,
                        );
                    } else if (message in BinaryAnswerTypeNo) {
                        disableButtons();
                        return actionProvider.handleParentAliveOption(
                            false,
                            curState,
                        );
                    } else {
                        alert('check for error');
                    }
                }
            } else if (curState.parent_flag === QuestionType.part3) {
                if (
                    chatbotValidator.validate(message, [
                        ValidationType.incorrectValueForBoolean,
                    ])
                ) {
                    if (message in BinaryAnswerTypeYes) {
                        disableButtons();
                        return actionProvider.handleSecondParentExists(
                            true,
                            curState,
                        );
                    } else if (message in BinaryAnswerTypeNo) {
                        disableButtons();
                        return actionProvider.handleSecondParentExists(
                            false,
                            curState,
                        );
                    } else {
                        alert('check for error');
                    }
                }
            }
        }
    }

    if (curState.stepID === ChatStepTypes.testatorOtherChildStep) {
        return handleSuccessor(
            message,
            curState,
            actionProvider,
            chatbotValidator,
        );
    }
    // netWealthStep
    if (curState.stepID === ChatStepTypes.netWealthStep) {
        if (
            chatbotValidator.validate(message, [ValidationType.invalidAmount])
        ) {
            return actionProvider.handleNetWealth(message, curState);
        }
    }

    // underAgeStep
    if (curState.stepID === ChatStepTypes.underAgeStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleUnderAge(true, curState);
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleUnderAge(false, curState);
            } else {
                alert('check for error');
            }
        }
    }

    // spouse start
    if (curState.stepID === ChatStepTypes.spouseChoice) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleSpouseChoice(true, curState);
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleSpouseChoice(false, curState);
            } else {
                alert('check for error');
            }
        }
    }
    if (curState.stepID === ChatStepTypes.spouseStep) {
        if (chatbotValidator.validate(message, [ValidationType.emptyValue])) {
            return actionProvider.handleSpouseInput(message, curState);
        }
    }
    // spouse end

    // cohabitant start
    if (curState.stepID === ChatStepTypes.cohabitantChoice) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleCohabitantChoice(true, curState);
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleCohabitantChoice(false, curState);
            } else {
                alert('check for error');
            }
        }
    }

    if (curState.stepID === ChatStepTypes.cohabitantStep) {
        return actionProvider.handleCohabitantInput(message, curState); //set stepID = 7
    }

    //  cohabitant end

    // successorStep
    if (curState.stepID === ChatStepTypes.successorStep) {
        if (curState.successor_flag === QuestionType.part1) {
            return actionProvider.handleSuccessorInput(message, curState);
        } else if (curState.successor_flag === QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleChildAliveOption(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleChildAliveOption(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        } else if (curState.successor_flag === QuestionType.part3) {
            const convertedMessage = returnKeyFromEnteredNumberText(message);
            if (
                convertedMessage &&
                chatbotValidator.validate(convertedMessage, [
                    ValidationType.emptyValue,
                    ValidationType.onlyDigit,
                ])
            ) {
                return actionProvider.handleSuccessorCount(
                    convertedMessage,
                    curState,
                );
            } else {
                return;
                // remove last message and update stepid
                // return actionProvider.handleValidation();
            }
        }
    }

    //  parentsStep
    if (curState.stepID === ChatStepTypes.parentsStep) {
        if (curState.successor_flag === QuestionType.part1) {
            return actionProvider.handleSuccessorInput(message, curState);
        } else if (curState.successor_flag === QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleChildAliveOption(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleChildAliveOption(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        } else if (curState.successor_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.emptyValue,
                    ValidationType.onlyDigit,
                ])
            ) {
                return actionProvider.handleSuccessorCount(message, curState);
            } else {
                return;
            }
        }
        if (curState.parent_flag === QuestionType.part1) {
            return actionProvider.handleParentsInput(message, curState);
        } else if (curState.parent_flag == QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleParentAliveOption(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleParentAliveOption(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        } else if (curState.parent_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleSecondParentExists(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleSecondParentExists(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        }
    }

    // marriedParentsStep
    if (curState.stepID === ChatStepTypes.marriedParentsStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleMarriedParents(true, curState);
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleMarriedParents(false, curState);
            } else {
                alert('check for error');
            }
        }
    }

    // grandParentStep
    if (curState.stepID === ChatStepTypes.grandParentStep) {
        if (curState.successor_flag === QuestionType.part1) {
            return actionProvider.handleSuccessorInput(message, curState);
        } else if (curState.successor_flag === QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleChildAliveOption(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleChildAliveOption(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        } else if (curState.successor_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.emptyValue,
                    ValidationType.onlyDigit,
                ])
            ) {
                return actionProvider.handleSuccessorCount(message, curState);
            } else {
                return;
                // remove last message and update stepid
                // return actionProvider.handleValidation();
            }
        } else if (curState.parent_flag === QuestionType.part1) {
            return actionProvider.handleParentsInput(message, curState);
        } else if (curState.parent_flag == QuestionType.part2) {
            message = message.toLowerCase();
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleParentAliveOption(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleParentAliveOption(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        } else if (curState.parent_flag === QuestionType.part3) {
            if (
                chatbotValidator.validate(message, [
                    ValidationType.incorrectValueForBoolean,
                ])
            ) {
                if (message in BinaryAnswerTypeYes) {
                    disableButtons();
                    return actionProvider.handleSecondParentExists(
                        true,
                        curState,
                    );
                } else if (message in BinaryAnswerTypeNo) {
                    disableButtons();
                    return actionProvider.handleSecondParentExists(
                        false,
                        curState,
                    );
                } else {
                    alert('check for error');
                }
            }
        }
    }

    // finalStep
    if (curState.stepID === ChatStepTypes.finalStep) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleFinalQuestion(true, curState);
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleFinalQuestion(false, curState);
            } else {
                alert('check for error');
            }
        }
        // return actionProvider.handleFinalQuestion(message)
    }
};
const disableButtons = () => {
    const buttonElements: any = document.getElementsByClassName(
        'option-selector-button',
    );
    // const lastBtnEl = buttonElements[buttonElements.length-1]
    // if (!lastBtnEl.disabled) lastBtnEl.disabled = true;
    //     lastBtnEl.style.pointerEvents = 'none';
    for (let i = 0; i < buttonElements.length; i++) {
        const currentElement = buttonElements[i];
        if (!currentElement.disabled) currentElement.disabled = true;
        currentElement.style.pointerEvents = 'none';
    }
};

// const setRevertListeners = () => {
//     messageService.clearAllInternalSubscription();
//     /* eslint-disable @typescript-eslint/no-unused-vars */
//     const subscription = messageService
//         .getMessageInChatbot()
//         .subscribe((message) => {
//             this.revertState();
//         });
//     messageService.addInternalSubscription(subscription);
// };
// const revertState = () => {
//     const lastState = messageService.removePreviousState();
//     console.log('setting state:');
//     console.log(lastState);

//     const previousStates: any = messageService.getPreviousStates();
//     console.log('previous States:');
//     console.log(previousStates);

//
//     }
// };
// const flagSwitch = (curState: ChatbotInterface, message: any) => {
//     if (curState.successor_flag === QuestionType.part1) {
//         return this.actionProvider.handleSuccessorInput(message);
//     } else if (curState.successor_flag === QuestionType.part2)
//         return this.actionProvider.handleChildAliveOption(message);
//     else if (curState.successor_flag === QuestionType.part3) {
//         if (
//             chatbotValidator.validate(message, [
//                 ValidationType.emptyValue,
//                 ValidationType.onlyDigit,
//             ])
//         ) {
//             return this.actionProvider.handleSuccessorCount(message);
//         } else {
//             // remove last message and update stepid
//             // return this.actionProvider.handleValidation();
//         }
//     }
//     return null;
// };
const handleSuccessor = (
    message: string,
    curState: ChatbotInterface,
    actionProvider: ActionProvider,
    chatbotValidator: ChatbotValidation,
) => {
    if (curState.successor_flag === QuestionType.part1) {
        return actionProvider.handleSuccessorInput(message, curState);
    } else if (curState.successor_flag === QuestionType.part2) {
        message = message.toLowerCase();
        if (
            chatbotValidator.validate(message, [
                ValidationType.incorrectValueForBoolean,
            ])
        ) {
            if (message in BinaryAnswerTypeYes) {
                disableButtons();
                return actionProvider.handleChildAliveOption(true, curState);
            } else if (message in BinaryAnswerTypeNo) {
                disableButtons();
                return actionProvider.handleChildAliveOption(false, curState);
            } else {
                alert('check for error');
            }
        }
    } else if (curState.successor_flag === QuestionType.part3) {
        if (
            chatbotValidator.validate(message, [
                ValidationType.emptyValue,
                ValidationType.onlyDigit,
            ])
        ) {
            return actionProvider.handleSuccessorCount(message, curState);
        } else {
            // remove last message and update stepid
            // return this.actionProvider.handleValidation();
        }
    }
    return actionProvider.handleUndividedEstateSpouse(message, curState);
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

            finalState.messages.push(state.messages[state.messages.length - 1]);
            state = finalState;
        }
        const prevState = _.cloneDeep(state);
        prevState.messages.pop();
        messageService.addPreviousState(prevState);
        message = message.trim();
        state = commonMethods(message, state, actionProvider);
        focusWritingArea();
        return actionProvider.returnState(state);
    });
};

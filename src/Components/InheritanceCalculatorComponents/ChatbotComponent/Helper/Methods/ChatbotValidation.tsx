import ActionProvider from '../../ActionProvider';
import {
    BinaryAnswerTypeNo,
    BinaryAnswerTypeYes,
} from '../Enums/BinaryAnswerTypes';
import { DefaultWarningMessage, ValidationType } from '../Enums/ValidationType';
import _ from 'lodash';
import { undividedOwnershipType } from '../Enums/ChatStepTypes';

export class ChatbotValidation {
    constructor(
        private actionProvider: ActionProvider,
        private chatbotState: any,
    ) {}
    validate = (
        message: string,
        validationTypes: Array<number>,
        warningMessage = '',
    ): boolean => {
        validationTypes = this.addEmptyRuleAndSortInc(validationTypes);
        for (const validationType of validationTypes) {
            let validationResult = false;
            switch (validationType) {
                case ValidationType.emptyValue:
                    validationResult = this.validateEmpty(message);
                    break;
                case ValidationType.invalidAmount:
                    validationResult = this.validateAmount(message);
                    break;
                case ValidationType.onlyDigit:
                    validationResult = this.validateDigit(message);
                    break;
                case ValidationType.incorrectValueForBoolean:
                    validationResult = this.validateValueForBoolean(message);
                    break;
                case ValidationType.incorrectValueForUndividedOptions:
                    validationResult =
                        this.validateValueForUndividedOptions(message);
                    break;
                default:
                    console.error('Invalid Validation type');
                    return false;
            }
            if (warningMessage === '' && !validationResult) {
                warningMessage = this.getWarningMessage(validationType);
            }
            if (!validationResult && this.chatbotState) {
                this.showWarning(warningMessage);
                const messageCopy = _.cloneDeep(this.chatbotState.messages);
                this.actionProvider.handleValidation(
                    messageCopy,
                    this.actionProvider.stateRef,
                );
                return false;
            } else {
                this.hideWarning();
            }
        }
        return true;
    };

    validateEmpty = (message: string) => {
        // if valid string, returns true
        if (message.length !== 0) return true;
        return false;
    };

    validateAmount = (message: string) => {
        const re = /^\d*(\.\d+)?$/;
        if (message.match(re)) {
            return true;
        } else return false;
    };

    validateDigit = (message: string) => {
        const checkNatural = /^(0|([1-9]\d*))$/;
        if (checkNatural.test(message)) return true;
        return false;
    };

    validateValueForBoolean = (message: string) => {
        if (
            (message in BinaryAnswerTypeYes || message in BinaryAnswerTypeNo) &&
            !(message in [0, 1])
        ) {
            return true;
        }
        return false;
    };

    // validateValueForUndividedOptions = (message: string) => {
    //     if (
    //         Object.values(undividedOwnershipType).includes(
    //             message as undividedOwnershipType,
    //         )
    //     ) {
    //         return true;
    //     }
    //     return false;
    // };

    validateValueForUndividedOptions = (message: string) => {
        const ownershipTypes = Object.values(undividedOwnershipType);
        for (const type of ownershipTypes) {
            if (type.includes(message.toUpperCase())) {
                return true;
            }
        }
        return false;
    };

    private showWarning = (warningMessage: string) => {
        const warningDiv = document.getElementById('chatbot-warning-div');
        if (warningDiv) {
            warningDiv.innerHTML = `<div id="chatbot-warning-innerDiv"><p style="margin: 0.3rem">${warningMessage}</p></div>`;
            warningDiv.style.display = 'block';

            const newDiv = document.getElementById('chatbot-warning-innerDiv');
            const closeButton = document.createElement('button');
            closeButton.innerHTML = 'x';
            closeButton.style.cssText = 'position: absolute; top: 0; right: 0;';
            closeButton.addEventListener('click', () => {
                if (newDiv) newDiv.remove();
            });
            if (newDiv !== null) {
                newDiv.appendChild(closeButton);
            }
            return;
        }
    };
    private hideWarning = () => {
        const warningDiv = document.getElementById('chatbot-warning-div');
        if (warningDiv) {
            warningDiv.style.display = 'none';
            return;
        }
    };
    getWarningMessage(validationType: ValidationType) {
        switch (validationType) {
            case ValidationType.emptyValue:
                return DefaultWarningMessage.emptyValueMessage;
            case ValidationType.incorrectValueForBoolean:
                return DefaultWarningMessage.errorForBooleanMessage;
            case ValidationType.invalidAmount:
                return DefaultWarningMessage.invalidAmountMessage;
            case ValidationType.onlyDigit:
                return DefaultWarningMessage.onlyDigitMessage;
            case ValidationType.incorrectValueForUndividedOptions:
                return DefaultWarningMessage.incorrectValueForUndividedMessage;
            default:
                return 'Improve error message in ChatbotType.ts';
        }
    }

    addEmptyRuleAndSortInc = (valArray: Array<number>): Array<number> => {
        if (!valArray.includes(0)) valArray.push(0);
        return valArray.sort((a, b) => a - b);
    };
}

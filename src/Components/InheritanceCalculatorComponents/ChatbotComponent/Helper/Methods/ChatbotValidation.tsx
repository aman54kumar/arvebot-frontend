import ActionProvider from "../../ActionProvider";
import { BinaryAnswerTypeNo, BinaryAnswerTypeYes } from "../Enums/BinaryAnswerTypes";
import { DefaultWarningMessage, ValidationType } from "../Enums/ValidationType";
import _ from "lodash";

export class ChatbotValidation {
    constructor(private actionProvider: ActionProvider, private chatbotState: any) { }
    validate = (message: string, validationTypes: Array<number>, warningMessage?: string): boolean => {

        for (const validationType of validationTypes) {
            if (warningMessage === undefined) {
                warningMessage = this.getDefaultWarningMessage(validationType);
            }
            let validationResult = false;
            switch (validationType) {
                case ValidationType.emptyValue:
                    validationResult = this.validateEmpty(message);
                    break
                case ValidationType.invalidAmount:
                    validationResult = this.validateAmount(message);
                    break
                case ValidationType.onlyDigit:
                    validationResult = this.validateDigit(message);
                    break
                case ValidationType.incorrectValueForBoolean:
                    validationResult = this.validateValueForBoolean(message);
                    break;
                default:
                    console.error("Invalid Validation type")
                    return false;
            }
            if (!validationResult && this.chatbotState) {
                this.showWarning(warningMessage)
                const messageCopy = _.cloneDeep(this.chatbotState.messages)
                this.actionProvider.handleValidation(messageCopy);
                return false;
            } else {
                this.hideWarning();
            }
        }
        return true;
    }
    validateEmpty = (message: string) => {
        //
        if (message.length === 0) {
            // remove last message
            return false
        }
        return true;
    }
    // eslint-disable-next-line
    validateAmount = (message: string) => {
        return false
    }

    validateDigit = (message: string) => {
        const checkNatural = /^(0|([1-9]\d*))$/
        if (checkNatural.test(message)) return true
        return false
    }

    validateValueForBoolean = (message: string) => {
        if (((message in BinaryAnswerTypeYes) || (message in BinaryAnswerTypeNo)) && !(message in [0, 1])) {
            return true
        }
        return false;
    }

    private showWarning = (warningMessage: string) => {
        const warningDiv = document.getElementById("chatbot-warning-div");
        if (warningDiv) {
            warningDiv.innerHTML = warningMessage
            warningDiv.style.display = "block";
            return;
        }
    }
    private hideWarning = () => {
        const warningDiv = document.getElementById("chatbot-warning-div");
        if (warningDiv) {
            warningDiv.style.display = "none";
            return;
        }
    }
    getDefaultWarningMessage(validationType: ValidationType) {
        switch (validationType) {
            case ValidationType.emptyValue:
                return DefaultWarningMessage.emptyValueMessage;
            case ValidationType.incorrectValueForBoolean:
                return "error boolean message"
            // return DefaultWarningMessage.errorForBooleanMessage;
            default:
                return "Improve error message in ChatbotType.ts";
        }
    }


}
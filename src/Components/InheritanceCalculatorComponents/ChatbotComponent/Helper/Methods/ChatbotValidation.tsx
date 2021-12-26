import ActionProvider from "../../ActionProvider";
import { DefaultWarningMessage, ValidationType } from "../Enums/ValidationType";

export class ChatbotValidation {
    constructor(private actionProvider: ActionProvider) { }
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
                    validationResult = this.validateDigit(message)
                    break
                default:
                    console.error("Invalid Validation type")
                    return false;
            }
            if (!validationResult) {
                this.showWarning(warningMessage)
                this.actionProvider.handleValidation();
                return false;
            }
        }
        return true;
    }
    validateEmpty = (message: string) => {
        //
        if (message.trim().length === 0) {
            // remove last message
            return false
        }
        return true;
    }
    validateAmount = (message: string) => {
        return false
    }

    validateDigit = (message: string) => {
        const checkNatural = /^(0|([1-9]\d*))$/
        if (checkNatural.test(message)) return true
        return false
    }

    private showWarning = (warningMessage: string) => {
        const warningDiv = document.getElementById("chatbot-warning-div");
        if (warningDiv) {
            warningDiv.innerHTML = warningMessage
            warningDiv.style.display = "block";
            return;
        }
    }
    getDefaultWarningMessage(validationType: ValidationType) {
        switch (validationType) {
            case ValidationType.emptyValue:
                return DefaultWarningMessage.emptyValueMessage;
            default:
                return "Error";
        }
    }


}
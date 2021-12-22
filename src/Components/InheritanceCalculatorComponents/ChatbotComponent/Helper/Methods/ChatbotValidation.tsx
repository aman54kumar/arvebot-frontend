import { ChatbotInterface } from "../../Generics";
import { DefaultWarningMessage, ValidationType } from "../Enums/ValidationType";

export class ChatbotValidation {

    validate = (message: string, validationType: ValidationType, warningMessage?: string) => {
        if (warningMessage === undefined) {
            warningMessage = this.getDefaultWarningMessage(validationType);
        }
        switch (validationType) {
            case ValidationType.emptyValue:
                return this.validateEmpty(message, warningMessage);
            case ValidationType.invalidAmount:
                return this.validateAmount(message, warningMessage);
            default:
                console.error("Invalid Validation type")
                return false;
        }
    }
    validateEmpty = (message: string, warningMessage: string) => {
        //
        if (message.trim().length === 0) {
            // show warning + remove last message
            this.showWarning(warningMessage);
            return false
        }
        return true;
    }
    validateAmount = (message: string, warningMessage: string) => {
        //
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
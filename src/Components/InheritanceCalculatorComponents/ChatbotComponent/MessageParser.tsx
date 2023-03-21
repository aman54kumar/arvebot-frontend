import ActionProvider from './ActionProvider';
import { ChatbotInterface } from './Generics';
import { handleMessage } from './Helper/Methods/CommonMethods';
import { messageService } from './services/ChatbotCommunicator';

class MessageParser {
    actionProvider: ActionProvider;
    state: any;
    constructor(actionProvider: ActionProvider, state: any) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message: string): ReturnType<() => void> {
        // store previous state
        this.state.yesNoClickedFlag = false;
        handleMessage(this.actionProvider, message, false, false);
    }
}

export default MessageParser;

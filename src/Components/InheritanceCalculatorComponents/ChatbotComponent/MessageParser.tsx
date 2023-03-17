import ActionProvider from './ActionProvider';
import { ChatbotInterface } from './Generics';
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
        this.actionProvider.handleMessage(message);
    }
}

export default MessageParser;

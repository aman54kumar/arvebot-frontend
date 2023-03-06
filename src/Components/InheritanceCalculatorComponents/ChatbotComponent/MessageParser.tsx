import ActionProvider from './ActionProvider';
import { ChatbotInterface } from './Generics';

class MessageParser {
    actionProvider: ActionProvider;
    state: ChatbotInterface;
    constructor(actionProvider: ActionProvider, state: any) {
        this.actionProvider = actionProvider;
        this.state = state;
    }

    parse(message: string): ReturnType<() => void> {
        message = message.trim();
        const curState = this.state;
        curState.yesNoClickedFlag = false;
        this.actionProvider.handleMessage(message, curState);
    }
}

export default MessageParser;

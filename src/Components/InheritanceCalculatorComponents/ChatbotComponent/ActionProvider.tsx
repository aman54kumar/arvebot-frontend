import { ChatbotInterface, InitialChatbotState } from './Generics';
import { ReactElement } from 'react';
import { NodeEntity } from './Helper/Classes/NodeEntity';
import chartSelector from '../../../store/chartSelector';
import { messageService } from './services/ChatbotCommunicator';
import QuestionConstants from './Helper/Methods/QuestionConstants';
import _ from 'lodash';
import {
    clearBooleanOptions,
    clearDisabledInput,
    revertState,
} from './ActionProviderMethods/OtherChatbotMethods';

class ActionProvider {
    createChatBotMessage: (
        questionElement: ReactElement,
        widget?: Record<string, unknown>,
    ) => ReactElement;
    setState: (state: unknown) => ChatbotInterface;
    createClientMessage: (messageElement: ReactElement) => ReactElement;
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
        createClientMessage: (messageElement: ReactElement) => ReactElement,
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
                revertState(this);
            });
        messageService.addInternalSubscription(subscription);
    }

    // TODO check options

    // eslint-disable-next-line

    // Generic functions
    addMessageToBotState = (messages: any, curState: any): any => {
        if (Array.isArray(messages)) {
            curState.messages = [...curState.messages, ...messages];
        } else {
            curState.messages = [...curState.messages, messages];
        }
        return curState;
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
            clearDisabledInput(state.stepID);
            messageService.resetChatbotState();
            const undoButton = document.getElementById('chatbot-undo-button');
            if (undoButton) undoButton.style.display = 'block';
            return this.returnState(state);
        });
    };
    revertLastState = () => {
        messageService.setRevert();
        this.setState((state: any) => {
            const prevState = messageService.getPreviousState(
                messageService.getRevertCnt(),
            );
            messageService.addRevertCnt();
            if (prevState == null) {
                this.resetChatbot();
                return this.returnState(state);
            }
            state = prevState;
            clearBooleanOptions();
            clearDisabledInput(state.stepID);
            return this.returnState(state);
        });
    };
    delay = (n: number) => {
        return new Promise(function (resolve) {
            setTimeout(resolve, n * 1000);
        });
    };

    handleValidation = (tempMessages: any, state: any) => {
        if (tempMessages && tempMessages.length !== 0) {
            state.messages = tempMessages;
            return state;
        }
        return state;
    };
}

export default ActionProvider;

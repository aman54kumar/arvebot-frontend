import { Subject, Subscription } from 'rxjs';
import _ from 'lodash';
import { InitialChatbotState } from '../Generics';

const inSubject = new Subject();
const outSubject = new Subject();
const internalSubscriptionList = new Array<Subscription>();
const externalSubscriptionList = new Array<Subscription>();
const previousStates = new Array<any>();
let revertCnt = 0;
let isRevert = false;

export const messageService = {
    sendMessageToChatbot: (message: any) => inSubject.next(message),

    sendMessageFromChatbot: (message: any) => outSubject.next(message),

    getMessageInChatbot: () => inSubject.asObservable(),

    getMessageOutChatbot: () => outSubject.asObservable(),

    addInternalSubscription: (subscription: Subscription) =>
        internalSubscriptionList.push(subscription),

    addExternalSubscription: (subscription: Subscription) =>
        externalSubscriptionList.push(subscription),

    addPreviousState: (data: any) => {
        const stateCopy = _.cloneDeep(data);
        if (
            previousStates.filter(
                (previousState) =>
                    Object.entries(previousState) == Object.entries(stateCopy),
            ).length === 0
        ) {
            previousStates.push(stateCopy);
        }
    },
    printPreviousStates: () => {
        console.log(previousStates);
    },
    removePreviousState: () => {
        if (previousStates.length === 0) {
            return null;
        }
        return previousStates.pop();
    },
    removePreviousStates: (cnt: number) => {
        let finalState = {};
        for (let i = 0; i < cnt; i++) {
            if (previousStates.length === 0) {
                return InitialChatbotState;
            }
            finalState = previousStates.pop();
        }
        return finalState;
    },
    getPreviousStates: () => previousStates,

    getPreviousState: (reverseCount: number) => {
        if (previousStates.length === 0) return null;
        return previousStates[previousStates.length - 1 - reverseCount];
    },

    clearAllInternalSubscription: () => {
        internalSubscriptionList.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    },

    clearAllExternalSubscription: () => {
        externalSubscriptionList.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    },
    addRevertCnt: () => {
        revertCnt += 1;
    },
    getRevertCnt: () => {
        return revertCnt;
    },
    resetRevertCnt: () => {
        revertCnt = 0;
    },
    setRevert: () => {
        isRevert = true;
    },
    resetRevert: () => {
        isRevert = false;
    },
    getRevert: () => {
        return isRevert;
    },
};

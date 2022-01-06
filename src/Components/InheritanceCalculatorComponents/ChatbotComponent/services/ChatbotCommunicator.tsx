import { Subject, Subscription } from 'rxjs';
import _ from "lodash";

const inSubject = new Subject();
const outSubject = new Subject();
const internalSubscriptionList = new Array<Subscription>()
const externalSubscriptionList = new Array<Subscription>()
const previousStates = new Array<any>();
export const messageService = {

    sendMessageToChatbot: (message: any) => inSubject.next(message),

    sendMessageFromChatbot: (message: any) => outSubject.next(message),

    getMessageInChatbot: () => inSubject.asObservable(),

    getMessageOutChatbot: () => outSubject.asObservable(),

    addInternalSubscription: (subscription: Subscription) => internalSubscriptionList.push(subscription),

    addExternalSubscription: (subscription: Subscription) => externalSubscriptionList.push(subscription),

    addPreviousState: (data: any) => {
        const stateCopy = _.cloneDeep(data)
        if (previousStates.filter(previousState => Object.entries(previousState) == Object.entries(stateCopy)).length === 0) {
            previousStates.push(stateCopy)
        }
    },

    removePreviousState: () => {
        if (previousStates.length === 0) {
            return null;
        }
        return previousStates.pop()
    },

    getPreviousStates: () => previousStates,

    getPreviousState: (reverseCount: number) => {
        if (previousStates.length === 0) return null;
        return previousStates[previousStates.length - 1 - reverseCount]
    },

    clearAllInternalSubscription: () => {
        internalSubscriptionList.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        })
    },

    clearAllExternalSubscription: () => {
        externalSubscriptionList.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        })
    }
};

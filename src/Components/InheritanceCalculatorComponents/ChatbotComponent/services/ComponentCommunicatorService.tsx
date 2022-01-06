import { Subject, Subscription } from 'rxjs';

const chatBotDataSubject = new Subject();
const chatbotMessageSubscriptionList = new Array<Subscription>()
export const componentCommunicatorService = {

    sendChatbotMessage: (message: any) => chatBotDataSubject.next(message),


    getChatbotMessage: () => chatBotDataSubject.asObservable(),

    addSubscription: (subscription: Subscription) => chatbotMessageSubscriptionList.push(subscription),


    clearAllSubscription: () => {
        chatbotMessageSubscriptionList.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        })
    },


};
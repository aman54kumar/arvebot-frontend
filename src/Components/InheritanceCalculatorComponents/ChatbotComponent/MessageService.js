import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject({});

export const messageService = {
  sendMessage: (message) => {
    console.log("message", message);
    subject.next(message);
  },
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};

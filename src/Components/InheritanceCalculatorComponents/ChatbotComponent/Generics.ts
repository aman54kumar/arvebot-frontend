import Person from "../ChatbotComponent/Helper/Classes/Person";

export interface ChatbotInterface<T> {
  stepID: number;
  person: T;
  caseName: string | null;
  netWealth: { intValue: number; strValue: string };
  undividedEstate: boolean;
  temp: string;
  max_depth: boolean | null;
}

export const ChatbotState: ChatbotInterface<Person> = {
  stepID: 0,
  person: new Person(""),
  caseName: null,
  netWealth: { intValue: 0, strValue: "" },
  undividedEstate: false,
  temp: "",
  max_depth: null,
};

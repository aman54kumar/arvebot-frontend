import Person from "../ChatbotComponent/Helper/Classes/Person";
import Family from "./Helper/Classes/Family";

enum successor_parent_flag {
  part1 = "part1",
  part2 = "part2",
  part3 = "part3",
  none = "none",
}
export interface ChatbotInterface<T> {
  stepID: number;
  person: T;
  caseName: string | null;
  netWealth: { intValue: number; strValue: string };
  undividedEstate: boolean;
  temp_child_id: string;
  max_depth: number | null;
  successor_flag: string;
  parent_flag: string;
  temp_person: Person | undefined;
  temp_family: Family | undefined;
  temp_child: Person;
  temp_parent: Person;
}

export const ChatbotState: ChatbotInterface<Person> = {
  stepID: 0,
  person: new Person(""),
  caseName: null,
  netWealth: { intValue: 0, strValue: "" },
  undividedEstate: false,
  temp_child_id: "",
  max_depth: null,
  successor_flag: successor_parent_flag.none,
  parent_flag: successor_parent_flag.none,
  temp_person: undefined,
  temp_family: undefined,
  temp_child: new Person(""),
  temp_parent: new Person(""),
};

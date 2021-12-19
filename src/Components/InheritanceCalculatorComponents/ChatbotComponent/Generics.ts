import Person from "../ChatbotComponent/Helper/Classes/Person";
import { NodeEntity } from "./Helper/Classes/NodeEntity";

export enum successor_parent_flag {
  part1 = "part1",
  part2 = "part2",
  part3 = "part3",
  none = "none",
}
export interface ChatbotInterface {
  stepID: number;
  person: NodeEntity;
  testator: NodeEntity;
  caseName: string;
  netWealth: number;
  successor_flag: string;
  parent_flag: string;
  temp_person: NodeEntity;
  temp_child: NodeEntity;
  temp_parent: NodeEntity;
  personsMap: Map<number, Person>;
  nodeMap: Map<number, NodeEntity>;
  id: number;
  deceasedParentsArray: Array<number>;
  grandParent_flag: string;
  rearChildrenResponse: boolean;
  undividedEstate: {
    undividedEstateChoice: boolean;
    undivided_flag: string;
    totalEstateValue: number;
    undividedEstateSeparateWealth: number;
    temp_first: number;
    temp_last: number;
  };
}

export const ChatbotState: ChatbotInterface = {
  stepID: 0,
  person: new NodeEntity(0, 0),
  testator: new NodeEntity(0, 0),
  caseName: "",
  netWealth: 0,
  successor_flag: successor_parent_flag.none,
  parent_flag: successor_parent_flag.none,
  temp_person: new NodeEntity(0, 0),
  temp_child: new NodeEntity(0, 0),
  temp_parent: new NodeEntity(0, 0),
  personsMap: new Map(),
  nodeMap: new Map(),
  id: 1,
  deceasedParentsArray: [],
  grandParent_flag: successor_parent_flag.none,
  rearChildrenResponse: false,
  undividedEstate: {
    undividedEstateChoice: false,
    undivided_flag: successor_parent_flag.none,
    totalEstateValue: 0,
    undividedEstateSeparateWealth: 0,
    temp_first: 0,
    temp_last: 0,
  },
};

import Person from '../ChatbotComponent/Helper/Classes/Person';
import { NodeEntity } from './Helper/Classes/NodeEntity';
import {
    ChatStepTypes,
    QuestionType,
    undividedOwnershipType,
} from './Helper/Enums/ChatStepTypes';
export interface ChatbotInterface {
    stepID: string;
    person: NodeEntity;
    testator: NodeEntity;
    netWealth: number;
    successor_flag: string;
    parent_flag: string;
    temp_person: NodeEntity;
    temp_child: NodeEntity;
    temp_parent: NodeEntity;
    personsMap: Map<number, Person>;
    nodeMap: Map<number, NodeEntity>;
    id: number;
    undividedSpouseId: number;
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
        ownershipType: string;
    };
    tempMessages: any;
    successorProcessArray: Array<[number, number]>;
    isUndividedParent: boolean;
    yesNoClickedFlag: boolean;
}

export const ChatbotState: ChatbotInterface = {
    stepID: ChatStepTypes.initalStep,
    person: new NodeEntity(0, 0),
    testator: new NodeEntity(0, 0),
    netWealth: 0,
    successor_flag: QuestionType.initialQuestion,
    parent_flag: QuestionType.initialQuestion,
    temp_person: new NodeEntity(0, 0),
    temp_child: new NodeEntity(0, 0),
    temp_parent: new NodeEntity(0, 0),
    personsMap: new Map(),
    nodeMap: new Map(),
    id: 1,
    undividedSpouseId: 0,
    deceasedParentsArray: [],
    grandParent_flag: QuestionType.initialQuestion,
    rearChildrenResponse: false,
    undividedEstate: {
        undividedEstateChoice: false,
        undivided_flag: QuestionType.initialQuestion,
        totalEstateValue: 0,
        undividedEstateSeparateWealth: 0,
        temp_first: 0,
        temp_last: 0,
        ownershipType: undividedOwnershipType.none,
    },
    tempMessages: [],
    successorProcessArray: [],
    isUndividedParent: false,
    yesNoClickedFlag: false,
};

export const InitialChatbotState: any = {
    ...ChatbotState,
    messages: [],
};

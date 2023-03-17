import Person from '../ChatbotComponent/Helper/Classes/Person';
import { NodeEntity } from './Helper/Classes/NodeEntity';
import {
    ChatStepTypes,
    QuestionType,
    undividedOwnershipType,
} from './Helper/Enums/ChatStepTypes';
import _ from 'lodash';
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

const initChatbotState: ChatbotInterface = {
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

export const ChatbotState: ChatbotInterface = { ...initChatbotState };

export const InitialChatbotState: any = _.cloneDeep(initChatbotState);

export const cloneState = (curState: any, prevState: any) => {
    curState.messages = prevState.messages;
    curState.personMap = prevState.personMap;
    curState.nodeMap = prevState.nodeMap;
    curState.testator = prevState.testator;
    curState.stepID = prevState.stepID;
    curState.person = prevState.person;
    curState.netWealth = prevState.netWealth;
    curState.successor_flag = prevState.successor_flag;
    curState.parent_flag = prevState.parent_flag;
    curState.temp_person = prevState.temp_person;
    curState.temp_child = prevState.temp_child;
    curState.id = prevState.id;
    curState.undividedSpouseId = prevState.undividedSpouseId;
    curState.deceasedParentsArray = prevState.deceasedParentsArray;
    curState.deceasedParentsArray = prevState.deceasedParentsArray;
    curState.grandParent_flag = prevState.grandParent_flag;
    curState.rearChildrenResponse = prevState.rearChildrenResponse;
    curState.undividedEstate = prevState.undividedEstate;
    curState.tempMessages = prevState.tempMessages;
    curState.successorProcessArray = prevState.successorProcessArray;
    curState.isUndividedParent = prevState.isUndividedParent;
    curState.yesNoClickedFlag = prevState.yesNoClickedFlag;
    curState.testator = prevState.testator;
    curState.testator = prevState.testator;
    curState.testator = prevState.testator;
    return curState;
};
InitialChatbotState.messages = [];

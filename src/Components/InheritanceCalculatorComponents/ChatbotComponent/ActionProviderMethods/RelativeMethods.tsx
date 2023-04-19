import ActionProvider from '../ActionProvider';
import { NodeEntity } from '../Helper/Classes/NodeEntity';
import Person from '../Helper/Classes/Person';
import { ChatStepTypes, QuestionType } from '../Helper/Enums/ChatStepTypes';
import QuestionConstants from '../Helper/Methods/QuestionConstants';
import {
    add_child,
    // add_parent,
    getChildUnprocessedNode,
    getParentId,
    updateProcessChildNodePos,
} from './NodeEntityAlternativeMethods';
import {
    askFinalQuestion,
    createEmptyNode,
    createNewPerson,
    getNode,
    getParentChildrenIDStrings,
    getPerson,
    get_class_and_distance_closest_surviving_relative,
    handleClosingStep,
} from './OtherChatbotMethods';
import _ from 'lodash';

export const handleSuccessorCnt = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const successorCount = parseInt(res);
    state.temp_person._childCount = successorCount;
    if (successorCount === 0) {
        const parentID = getParentId(state); //state.temp_person.getParentId(state.nodeMap);
        if (parentID) {
            const parent = getNode(parentID, state.nodeMap);
            state = {
                ...state,
                temp_person: parent as NodeEntity,
            };
            // state.temp_person = parent;
            const successorProcessArray = state.successorProcessArray;
            state = handleNoSuccessorCase(
                state,
                successorProcessArray,
                actionProvider,
            );
        } else {
            state = handleClosingStep(state, actionProvider);
        }
        return state;
    }
    const questionType = state.temp_person._children.length === 0;
    let itr_id = state.id;
    for (let i = 0; i < state.temp_person._childCount; i++) {
        const child = createEmptyNode(state, itr_id++);
        // const temp_person: NodeEntity = state.temp_person;
        state = add_child(child, state);
        // state.temp_person.add_child(child, true);
        if (state.temp_person._partnerNode !== null) {
            const currentPartnerNode = getNode(
                state.temp_person._partnerNode,
                state.nodeMap,
            );
            // currentPartnerNode.add_child(child, true, true);
            state = add_child(child, currentPartnerNode, true, true);
            // updateProcessChildNodePos(currentPartnerNode);
            currentPartnerNode.updateProcessChildNodePos();
        }
    }
    state.id = itr_id;
    if (
        state.successorProcessArray.filter(
            (t: any) => t[0] === state.temp_person._level,
        ).length === 0
    ) {
        state.successorProcessArray.push([state.temp_person._level, 1]);
    }

    state.successor_flag = QuestionType.part1;
    const personName = getPerson(
        state.temp_person._id,
        state.personsMap,
    )._personName;
    if (questionType) {
        const newSuccessorQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addSuccessorQuestion1(personName),
        );
        state = actionProvider.addMessageToBotState(
            newSuccessorQuestion,
            state,
        );
    } else {
        const allChildrenID = getParentChildrenIDStrings(
            state.temp_person._children,
            state,
        );
        const newSuccessorQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addSuccessorQuestion2(personName, allChildrenID),
        );
        state = actionProvider.addMessageToBotState(
            newSuccessorQuestion,
            state,
        );
    }
    return state;
};

export const handleSuccessorInput = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const childID = getChildUnprocessedNode(state.temp_person);
    // const childID = state.temp_person.getChildUnprocessedNode();
    if (childID) {
        const child = getNode(childID, state.nodeMap);
        const childDetail = getPerson(childID, state.personsMap);
        childDetail._personName = res;
        state = {
            ...state,
            successor_flag: QuestionType.part2,
            temp_child: child as NodeEntity,
        };

        const personId: any = Person.getPerson(
            child._id,
            state.personsMap,
        )?._personName;
        const aliveQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.AliveQuestion(personId),
            QuestionConstants.YesNoWidgetOptions,
        );
        state = actionProvider.addMessageToBotState(aliveQuestion, state);
        // }
    } else {
        // error case
        console.log('Count of children exceeded');
    }
    return state;
};

const handleNoSuccessorCase = (
    state: any,
    successorProcessArray: Array<[number, number]>,
    actionProvider: ActionProvider,
) => {
    const childItrPos =
        successorProcessArray[successorProcessArray.length - 1][1];
    if (childItrPos) {
        if (state.temp_person._childCount > childItrPos) {
            successorProcessArray[successorProcessArray.length - 1][1] =
                childItrPos + 1;
            // ask childid question
            state = { ...state, successor_flag: QuestionType.part1 };
            // state.successor_flag = QuestionType.part1;
            const allChildrenID = getParentChildrenIDStrings(
                state.temp_person._children,
                state,
            );
            const newSuccessorQuestion = actionProvider.createChatBotMessage(
                QuestionConstants.addSuccessorQuestion2(
                    getPerson(state.temp_person._id, state.personsMap)
                        ._personName,
                    allChildrenID,
                ),
            );
            state = actionProvider.addMessageToBotState(
                newSuccessorQuestion,
                state,
            );
        } else if (state.temp_person._childCount === childItrPos) {
            let currentParentID = state.temp_person._id;
            let currentParent = NodeEntity.getNode(
                currentParentID,
                state.nodeMap,
            );

            let isCurrentParentID = true;
            while (
                successorProcessArray[successorProcessArray.length - 1][1] ===
                currentParent._childCount
            ) {
                successorProcessArray.pop();
                // current parent update
                const currentId = currentParent.getParentId(state.nodeMap);
                if (currentId) {
                    currentParentID = currentId;
                    currentParent = NodeEntity.getNode(
                        currentParentID,
                        state.nodeMap,
                    );
                } else {
                    isCurrentParentID = false;
                    break;
                }
            }

            if (!isCurrentParentID) {
                // exit case
                return handleClosingStep(state, actionProvider);
            } else {
                successorProcessArray[successorProcessArray.length - 1][1] =
                    successorProcessArray[successorProcessArray.length - 1][1] +
                    1;
                // ask childid question
                state.temp_person = currentParent;
                const currentParentDetail = getPerson(
                    currentParentID,
                    state.personsMap,
                );
                state.successor_flag = QuestionType.part1;
                const allChildrenID = getParentChildrenIDStrings(
                    currentParent._children,
                    state,
                );
                const newSuccessorQuestion =
                    actionProvider.createChatBotMessage(
                        QuestionConstants.addSuccessorQuestion2(
                            currentParentDetail._personName,
                            allChildrenID,
                        ),
                    );
                state = actionProvider.addMessageToBotState(
                    newSuccessorQuestion,
                    state,
                );
            }
        } else {
            throw new Error('state.temp_person._childCount < childItrPos case');
        }
    } else {
        throw new Error('childItrPos is null');
    }
    return state;
};

export const handleChildAliveOption = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    const child = state.temp_child;
    const childDetail = getPerson(child._id, state.personsMap);
    const successorProcessArray = state.successorProcessArray;
    if (res) {
        childDetail._deceased = false;
        state = handleNoSuccessorCase(
            state,
            successorProcessArray,
            actionProvider,
        );
    } else {
        // not alive
        childDetail._deceased = true;
        if (state.stepID === ChatStepTypes.grandParentStep) {
            const generationCount = child.getGenerationCount();
            if (generationCount === 2) {
                state = handleNoSuccessorCase(
                    state,
                    successorProcessArray,
                    actionProvider,
                );
                return state;
            }
        }
        state = {
            ...state,
            successor_flag: QuestionType.part3,
            temp_person: child as NodeEntity,
        };
        const newSuccessorQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addSuccessorCount(childDetail._personName),
        );
        state = actionProvider.addMessageToBotState(
            newSuccessorQuestion,
            state,
        );
    }
    return state;
};

export const handleSecondParentExists = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (res) {
        const temp_person = state.temp_person;
        state = {
            ...state,
            parent_flag: QuestionType.part1,
        };
        const allParentsID = getParentChildrenIDStrings(
            temp_person._parents,
            state,
        );
        const temp_person_detail = getPerson(temp_person._id, state.personsMap);
        const newParentQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addParentsQuestion2(
                temp_person_detail._personName,
                allParentsID,
            ),
        );
        state = actionProvider.addMessageToBotState(newParentQuestion, state);
    } else {
        state = handleClosingStep(state, actionProvider, false);
        // if (state.stepID !== ChatStepTypes.grandParentStep) {
        //   actionProvider.closestSurvivingRelativeParents(false);
        // } else {
        //   actionProvider.closestSurvivingRelativeGrandParents(false);
        // }
    }
    return state;
};

export const handleParentsInput = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const predecessor_id = res;
    const predecessor = createNewPerson(predecessor_id, state, actionProvider);

    state = {
        ...state,
        parent_flag: QuestionType.part2,
        temp_parent: predecessor,
    };
    // state = { ...state };
    const temp_person = state.temp_person;
    temp_person.add_parent(predecessor, true);
    // state = add_parent(predecessor, state, true);
    // state = { ...state };
    const aliveQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.AliveQuestion(
            Person.getPerson(predecessor._id, state.personsMap)._personName,
        ),
        QuestionConstants.YesNoWidgetOptions,
    );
    state = actionProvider.addMessageToBotState(aliveQuestion, state);

    return state;
};

export const handleParentAliveOption = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    const temp_parent = state.temp_parent;
    const temp_parent_detail = Person.getPerson(
        temp_parent._id,
        state.personsMap,
    );
    if (!res) {
        temp_parent_detail._deceased = true;
        state = {
            ...state,
            temp_person: temp_parent as NodeEntity,
            successor_flag: QuestionType.part3,
        };
        temp_parent._processChildNodePos += 1;
        const allChildrenID = getParentChildrenIDStrings(
            temp_parent._children,
            state,
        );
        const newSuccessorQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addSuccessorOfParentCount(
                temp_parent_detail._personName,
                allChildrenID,
            ),
        );
        state = actionProvider.addMessageToBotState(
            newSuccessorQuestion,
            state,
        );
        // return state;
    } else {
        temp_parent_detail._deceased = false;
        state = handleClosingStep(state, actionProvider);
        // if (state.stepID !== ChatStepTypes.grandParentStep) {
        //   actionProvider.closestSurvivingRelativeParents();
        // } else {
        //   actionProvider.closestSurvivingRelativeGrandParents();
        // }
    }
    return state;
};

export const handleGrandParentFirst = (
    state: any,
    actionProvider: ActionProvider,
) => {
    const testatorNode = NodeEntity.getNode(state.person._id, state.nodeMap);
    if (!state.deceasedParentsArray) state.deceasedParentsArray = [];

    for (const parent_id of testatorNode._parents) {
        if (Person.getPerson(parent_id, state.personsMap)._deceased) {
            const temp_class =
                get_class_and_distance_closest_surviving_relative(
                    NodeEntity.getNode(parent_id, state.nodeMap),
                    state,
                )[0];
            if (temp_class !== 1) {
                if (!state.deceasedParentsArray.includes(parent_id))
                    state.deceasedParentsArray.push(parent_id);
            }
        }
    }
    if (state.deceasedParentsArray.length !== 0) {
        const temp_person = getNode(
            state.deceasedParentsArray[0],
            state.nodeMap,
        );
        const temp_person_detail = getPerson(
            state.deceasedParentsArray[0],
            state.personsMap,
        );
        state = {
            ...state,
            stepID: ChatStepTypes.grandParentStep,
            parent_flag: QuestionType.part1,
            temp_person: temp_person as NodeEntity,
            successor_flag: QuestionType.initialQuestion,
        };
        const newParentQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addParentsQuestion1(
                temp_person_detail._personName,
            ),
        );
        state = actionProvider.addMessageToBotState(newParentQuestion, state);
    } else {
        console.log('check situation if it arrives here');
        state = askFinalQuestion(state, actionProvider);
    }
    return state;
};

export const handleAskForNextGrandParent = (
    state: any,
    actionProvider: ActionProvider,
) => {
    if (state.deceasedParentsArray.length !== 0) {
        const temp_person = getNode(
            state.deceasedParentsArray[0],
            state.nodeMap,
        );
        const temp_person_detail = getPerson(
            state.deceasedParentsArray[0],
            state.personsMap,
        );
        state = {
            ...state,
            stepID: ChatStepTypes.grandParentStep,
            parent_flag: QuestionType.part1,
            temp_person: temp_person as NodeEntity,
            successor_flag: QuestionType.initialQuestion,
        };
        const newParentQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addParentsQuestion1(
                temp_person_detail._personName,
            ),
        );
        state = actionProvider.addMessageToBotState(newParentQuestion, state);
    } else {
        state = askFinalQuestion(state, actionProvider);
    }
    return state;
};

export const handleMarriedParents = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (res) {
        actionProvider.set_spouse(
            state.person._parents[0],
            state.person._parents[1],
            true,
            state,
        );
        state = askFinalQuestion(state, actionProvider);
    } else {
        state = askFinalQuestion(state, actionProvider);
    }
    return state;
};

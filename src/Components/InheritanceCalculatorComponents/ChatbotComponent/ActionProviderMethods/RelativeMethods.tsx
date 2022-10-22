import ActionProvider from "../ActionProvider";
import { ChatbotInterface } from "../Generics";
import { NodeEntity } from "../Helper/Classes/NodeEntity";
import Person from "../Helper/Classes/Person";
import { ChatStepTypes, QuestionType } from "../Helper/Enums/ChatStepTypes";
import QuestionConstants from "../Helper/Methods/QuestionConstants";
import {
  createEmptyNode,
  createNewPerson,
  getNode,
  getPerson,
  get_class_and_distance_closest_surviving_relative,
  handleClosingStep,
} from "./OtherChatbotMethods";

export const handleSuccessorCount = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const successorCount = parseInt(res);
  state.temp_person._childCount = successorCount;
  if (successorCount === 0) {
    const parentID = state.temp_person.getParentId(state.nodeMap);
    if (parentID) {
      const parent = getNode(parentID, state.nodeMap);
      state.temp_person = parent;
      const successorProcessArray = state.successorProcessArray;
      handleNoSuccessorCase(state, successorProcessArray, actionProvider);
    } else {
      handleClosingStep(state, actionProvider);
    }
    return actionProvider.returnState(state);
  }

  const questionType = state.temp_person._children.length === 0;
  let itr_id = state.id;
  for (let i = 0; i < state.temp_person._childCount; i++) {
    const child = createEmptyNode(state, itr_id++);
    state.temp_person.add_child(child, true);
    if (state.temp_person._partnerNode !== null) {
      const currentPartnerNode = getNode(
        state.temp_person._partnerNode,
        state.nodeMap
      );
      currentPartnerNode.add_child(child, true, true);
    }
  }
  state.id = itr_id;
  if (
    state.successorProcessArray.filter((t) => t[0] === state.temp_person._level)
      .length === 0
  ) {
    state.successorProcessArray.push([state.temp_person._level, 1]);
  }

  state.successor_flag = QuestionType.part1;
  const personName = getPerson(
    state.temp_person._id,
    state.personsMap
  )._personName;
  if (questionType) {
    const newSuccessorQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addSuccessorQuestion1(personName)
    );
    actionProvider.addMessageToBotState(newSuccessorQuestion);
  } else {
    const allChildrenID = actionProvider.getParentChildrenIDStrings(
      state.temp_person._children,
      state
    );
    const newSuccessorQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addSuccessorQuestion2(personName, allChildrenID)
    );
    actionProvider.addMessageToBotState(newSuccessorQuestion);
  }
  return actionProvider.returnState(state);
};

export const handleSuccessorInput = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const childID = state.temp_person.getChildUnprocessedNode();
  if (childID) {
    const child = getNode(childID, state.nodeMap);
    const childDetail = getPerson(childID, state.personsMap);
    childDetail._personName = res;
    state = {
      ...state,
      successor_flag: QuestionType.part2,
      temp_child: child,
    };

    const personId: any = Person.getPerson(
      child._id,
      state.personsMap
    )?._personName;
    const aliveQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.AliveQuestion(personId),
      QuestionConstants.YesNoWidgetOptions
    );
    actionProvider.addMessageToBotState(aliveQuestion);
    // }
    return actionProvider.returnState(state);
  } else {
    // error case
    console.log("Count of children exceeded");
  }
};

const handleNoSuccessorCase = (
  state: ChatbotInterface,
  successorProcessArray: Array<[number, number]>,
  actionProvider: ActionProvider
) => {
  const childItrPos =
    successorProcessArray[successorProcessArray.length - 1][1];
  if (childItrPos) {
    if (state.temp_person._childCount > childItrPos) {
      successorProcessArray[successorProcessArray.length - 1][1] =
        childItrPos + 1;
      // ask childid question
      state.successor_flag = QuestionType.part1;
      const allChildrenID = actionProvider.getParentChildrenIDStrings(
        state.temp_person._children,
        state
      );
      const newSuccessorQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.addSuccessorQuestion2(
          getPerson(state.temp_person._id, state.personsMap)._personName,
          allChildrenID
        )
      );
      actionProvider.addMessageToBotState(newSuccessorQuestion);
      return actionProvider.returnState(state);
    } else if (state.temp_person._childCount === childItrPos) {
      let currentParentID = state.temp_person._id;
      let currentParent = NodeEntity.getNode(currentParentID, state.nodeMap);

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
          currentParent = NodeEntity.getNode(currentParentID, state.nodeMap);
        } else {
          isCurrentParentID = false;
          break;
        }
      }

      if (!isCurrentParentID) {
        // exit case
        handleClosingStep(state, actionProvider);
      } else {
        successorProcessArray[successorProcessArray.length - 1][1] =
          successorProcessArray[successorProcessArray.length - 1][1] + 1;
        // ask childid question
        state.temp_person = currentParent;
        const currentParentDetail = getPerson(
          currentParentID,
          state.personsMap
        );
        state.successor_flag = QuestionType.part1;
        const allChildrenID = actionProvider.getParentChildrenIDStrings(
          currentParent._children,
          state
        );
        const newSuccessorQuestion = actionProvider.createChatBotMessage(
          QuestionConstants.addSuccessorQuestion2(
            currentParentDetail._personName,
            allChildrenID
          )
        );
        actionProvider.addMessageToBotState(newSuccessorQuestion);
        return actionProvider.returnState(state);
      }
    } else {
      throw new Error("state.temp_person._childCount < childItrPos case");
    }
  } else {
    throw new Error("childItrPos is null");
  }
};

export const handleChildAliveOption = (
  res: boolean,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const child = state.temp_child;
  const childDetail = getPerson(child._id, state.personsMap);
  // const temp_person: NodeEntity = state.temp_person
  const successorProcessArray = state.successorProcessArray;
  if (res) {
    childDetail._deceased = false;
    handleNoSuccessorCase(state, successorProcessArray, actionProvider);
  } else {
    // not alive
    childDetail._deceased = true;
    if (state.stepID === ChatStepTypes.grandParentStep) {
      const generationCount = child.getGenerationCount();
      if (generationCount === 2) {
        handleNoSuccessorCase(state, successorProcessArray, actionProvider);
        return actionProvider.returnState(state);
      }
    }
    state = {
      ...state,
      successor_flag: QuestionType.part3,
      temp_person: child,
    };
    const newSuccessorQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addSuccessorCount(childDetail._personName)
    );
    actionProvider.addMessageToBotState(newSuccessorQuestion);
    return actionProvider.returnState(state);
  }
  return actionProvider.returnState(state);
};

export const handleSecondParentExists = (
  res: boolean,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  if (res) {
    const temp_person = state.temp_person;
    state = {
      ...state,
      parent_flag: QuestionType.part1,
    };
    const allParentsID = actionProvider.getParentChildrenIDStrings(
      temp_person._parents,
      state
    );
    const temp_person_detail = getPerson(temp_person._id, state.personsMap);
    const newParentQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addParentsQuestion2(
        temp_person_detail._personName,
        allParentsID
      )
    );
    actionProvider.addMessageToBotState(newParentQuestion);
  } else {
    handleClosingStep(state, actionProvider, false);
    // if (state.stepID !== ChatStepTypes.grandParentStep) {
    //   actionProvider.closestSurvivingRelativeParents(false);
    // } else {
    //   actionProvider.closestSurvivingRelativeGrandParents(false);
    // }
  }
  return actionProvider.returnState(state);
};

export const handleParentsInput = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const predecessor_id = res;
  const predecessor = createNewPerson(predecessor_id, state, actionProvider);
  state = {
    ...state,
    parent_flag: QuestionType.part2,
    temp_parent: predecessor,
  };

  state.temp_person.add_parent(predecessor, true);

  const aliveQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.AliveQuestion(
      Person.getPerson(predecessor._id, state.personsMap)._personName
    ),
    QuestionConstants.YesNoWidgetOptions
  );
  actionProvider.addMessageToBotState(aliveQuestion);

  return actionProvider.returnState(state);
};

export const handleParentAliveOption = (
  res: boolean,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const temp_parent = state.temp_parent;
  const temp_parent_detail = Person.getPerson(
    temp_parent._id,
    state.personsMap
  );
  if (!res) {
    temp_parent_detail._deceased = true;
    state = {
      ...state,
      temp_person: temp_parent,
      successor_flag: QuestionType.part3,
    };
    temp_parent._processChildNodePos += 1;
    const allChildrenID = actionProvider.getParentChildrenIDStrings(
      temp_parent._children,
      state
    );
    const newSuccessorQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addSuccessorOfParentCount(
        temp_parent_detail._personName,
        allChildrenID
      )
    );
    actionProvider.addMessageToBotState(newSuccessorQuestion);
    return actionProvider.returnState(state);
  } else {
    temp_parent_detail._deceased = false;
    handleClosingStep(state, actionProvider);
    // if (state.stepID !== ChatStepTypes.grandParentStep) {
    //   actionProvider.closestSurvivingRelativeParents();
    // } else {
    //   actionProvider.closestSurvivingRelativeGrandParents();
    // }
  }
  return actionProvider.returnState(state);
};

export const handleGrandParentFirst = (
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const testatorNode = NodeEntity.getNode(state.person._id, state.nodeMap);
  if (!state.deceasedParentsArray) state.deceasedParentsArray = [];

  for (const parent_id of testatorNode._parents) {
    if (Person.getPerson(parent_id, state.personsMap)._deceased) {
      const temp_class = get_class_and_distance_closest_surviving_relative(
        NodeEntity.getNode(parent_id, state.nodeMap),
        state
      )[0];
      if (temp_class !== 1) {
        if (!state.deceasedParentsArray.includes(parent_id))
          state.deceasedParentsArray.push(parent_id);
      }
    }
  }
  if (state.deceasedParentsArray.length !== 0) {
    const temp_person = getNode(state.deceasedParentsArray[0], state.nodeMap);
    const temp_person_detail = getPerson(
      state.deceasedParentsArray[0],
      state.personsMap
    );
    state = {
      ...state,
      stepID: ChatStepTypes.grandParentStep,
      parent_flag: QuestionType.part1,
      temp_person: temp_person,
      successor_flag: QuestionType.initialQuestion,
    };
    const newParentQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addParentsQuestion1(temp_person_detail._personName)
    );
    actionProvider.addMessageToBotState(newParentQuestion);
  } else {
    console.log("check situation if it arrives here");
    actionProvider.askFinalQuestion();
  }
  return actionProvider.returnState(state);
};

export const handleAskForNextGrandParent = (
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  if (state.deceasedParentsArray.length !== 0) {
    const temp_person = getNode(state.deceasedParentsArray[0], state.nodeMap);
    const temp_person_detail = getPerson(
      state.deceasedParentsArray[0],
      state.personsMap
    );
    state = {
      ...state,
      stepID: ChatStepTypes.grandParentStep,
      parent_flag: QuestionType.part1,
      temp_person: temp_person,
      successor_flag: QuestionType.initialQuestion,
    };
    const newParentQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.addParentsQuestion1(temp_person_detail._personName)
    );
    actionProvider.addMessageToBotState(newParentQuestion);
  } else {
    actionProvider.askFinalQuestion();
  }
  return actionProvider.returnState(state);
};

export const handleMarriedParents = (
  res: boolean,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  if (res) {
    actionProvider.set_spouse(
      state.person._parents[0],
      state.person._parents[1],
      true
    );
    actionProvider.askFinalQuestion();
  } else {
    actionProvider.grandParentFirst();
  }
  return actionProvider.returnState(state);
};
import ActionProvider from "../ActionProvider";
import InfoMessagesWidget from "../Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget";
import { ChatbotInterface } from "../Generics";
import Person from "../Helper/Classes/Person";
import {
  ChatStepTypes,
  QuestionType,
  undividedOwnershipType,
} from "../Helper/Enums/ChatStepTypes";
import { ParentChildSelector } from "../Helper/Enums/ParentChildSelector";
import {
  CurrencyOutput,
  ParseCurrencyStringForOutput,
} from "../Helper/Methods/HandleCurrency";
import QuestionConstants from "../Helper/Methods/QuestionConstants";

export const undividedEstateChoice = (
  undividedEstateChoiceResponse: boolean,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  if (undividedEstateChoiceResponse) {
    state = {
      ...state,
      stepID: ChatStepTypes.undividedEstateStep,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part1,
        undividedEstateChoice: undividedEstateChoiceResponse,
      },
    };
    const totalEstateNetValueQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.TotalEstateNetValueQuestion
    );
    actionProvider.addMessageToBotState(totalEstateNetValueQuestion);
  } else {
    state = {
      ...state,
      stepID: ChatStepTypes.netWealthStep,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: "none",
        undividedEstateChoice: undividedEstateChoiceResponse,
      },
    };
    const netWealthQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.NetWealthQuestion
    );
    actionProvider.addMessageToBotState(netWealthQuestion);
  }
  return actionProvider.returnState(state);
};

export const totalEstateValue = (
  totalEstateValueResponse: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const totalEstateValueQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.TotalEstateNetValueQuestion
  );
  const currencyIntResponse = CurrencyOutput(totalEstateValueResponse);
  const currencyStringResponse = ParseCurrencyStringForOutput(
    currencyIntResponse[1]
  );
  const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
  if (currencyIntResponse[0] === 5) {
    const ownershipTypeQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.OwnershipTypeQuestion,
      QuestionConstants.OwnershipQuestionWidgetOptions
    );
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part2,
        totalEstateValue: parseInt(currencyIntResponse[1]),
      },
    };
    const currencyCustom = actionProvider.createClientMessage(currencyJSX);
    actionProvider.addMessageToBotState(currencyCustom);
    actionProvider.addMessageToBotState(ownershipTypeQuestion);
  } else {
    const totalEstateWarning = actionProvider.createChatBotMessage(
      QuestionConstants.TotalEstateNetValueWarning
    );

    actionProvider.addMessageToBotState(totalEstateWarning);
    actionProvider.addMessageToBotState(totalEstateValueQuestion);
  }
  return actionProvider.returnState(state);
};

export const undividedOwnershipResponse = (
  ownershipResponse: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  if (ownershipResponse === undividedOwnershipType.felleseie) {
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part6,
        undividedEstateSeparateWealth:
          state.undividedEstate.totalEstateValue / 2,
        ownershipType: undividedOwnershipType.felleseie,
      },

      netWealth: state.undividedEstate.totalEstateValue / 2,
    };
    if (state.undividedEstate.undividedEstateSeparateWealth > 0) {
      const undividedEstateSpouseQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.UndividedEstateSpouseQuestion
      );
      actionProvider.addMessageToBotState(undividedEstateSpouseQuestion);
    } else {
      if (
        state.person !== state.testator &&
        state.person._undividedEstateSpouse
      ) {
        const temp_class_undivided_spouse =
          actionProvider.get_class_and_distance_closest_surviving_relative(
            actionProvider.getNode(
              state.person._undividedEstateSpouse,
              state.nodeMap
            ),
            state
          )[0];
        if (temp_class_undivided_spouse === undefined) {
          state.netWealth =
            state.netWealth +
            state.undividedEstate.undividedEstateSeparateWealth;
          state.undividedEstate.undividedEstateSeparateWealth = 0;
        }

        if (state.netWealth <= 0) {
          actionProvider.askFinalQuestion();
        } else {
          actionProvider.setState((state: ChatbotInterface) => {
            state.stepID = ChatStepTypes.underAgeStep;
          });
          const underAgeQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.UnderAgeQuestion,
            QuestionConstants.YesNoWidgetOptions
          );
          actionProvider.addMessageToBotState(underAgeQuestion);
          return actionProvider.returnState(state);
        }
      }
    }
  } else if (ownershipResponse === "DELVIS SÆREIE") {
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part3,
      },
    };
    const delvisFirstQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.DelvisFirstQuestion
    );
    actionProvider.addMessageToBotState(delvisFirstQuestion);
  } else if (ownershipResponse === "FULLT SÆREIE") {
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part5,
      },
    };
    const fulltSaereieQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.FulltSaereieQuestion
    );
    actionProvider.addMessageToBotState(fulltSaereieQuestion);
  } else {
    const ownershipTypeWarning = actionProvider.createChatBotMessage(
      QuestionConstants.OwnershipTypeWarning
    );
    const ownershipTypeQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.OwnershipTypeQuestion,
      QuestionConstants.OwnershipQuestionWidgetOptions
    );
    actionProvider.addMessageToBotState(ownershipTypeWarning);
    actionProvider.addMessageToBotState(ownershipTypeQuestion);
  }
  return actionProvider.returnState(state);
};

export const delvisFirstResponse = (
  response: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const currencyIntResponse = CurrencyOutput(response);
  const currencyStringResponse = ParseCurrencyStringForOutput(
    currencyIntResponse[1]
  );
  const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
  if (currencyIntResponse[0] === 5) {
    const currencyCustom = actionProvider.createClientMessage(currencyJSX);
    actionProvider.addMessageToBotState(currencyCustom);
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part4,
        temp_first: parseInt(currencyIntResponse[1]),
      },
    };
    const delvisSecondQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.DelvisSecondQuestion
    );
    actionProvider.addMessageToBotState(delvisSecondQuestion);
  } else {
    const netWealthWarning = actionProvider.createChatBotMessage(
      QuestionConstants.NetWealthWarning
    );
    const delvisFirstQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.DelvisFirstQuestion
    );
    actionProvider.addMessageToBotState(netWealthWarning);
    actionProvider.addMessageToBotState(delvisFirstQuestion);
  }
  return actionProvider.returnState(state);
};

export const delvisSecondResponse = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const currencyIntResponse = CurrencyOutput(res);
  const currencyStringResponse = ParseCurrencyStringForOutput(
    currencyIntResponse[1]
  );
  const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
  if (currencyIntResponse[0] === 5) {
    const currencyCustom = actionProvider.createClientMessage(currencyJSX);
    actionProvider.addMessageToBotState(currencyCustom);
    state.undividedEstate.temp_last = parseInt(currencyIntResponse[1]);
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part6,
        undividedEstateSeparateWealth:
          (state.undividedEstate.totalEstateValue -
            state.undividedEstate.temp_last -
            state.undividedEstate.temp_first) /
            2 +
          state.undividedEstate.temp_first,
      },
      netWealth:
        (state.undividedEstate.totalEstateValue -
          state.undividedEstate.temp_last -
          state.undividedEstate.temp_first) /
          2 +
        state.undividedEstate.temp_last,
    };
    const undividedEstateSpouseQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.UndividedEstateSpouseQuestion
    );
    actionProvider.addMessageToBotState(undividedEstateSpouseQuestion);
  } else {
    const netWealthWarning = actionProvider.createChatBotMessage(
      QuestionConstants.NetWealthWarning
    );
    const delvisSecondQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.DelvisSecondQuestion
    );
    actionProvider.addMessageToBotState(netWealthWarning);
    actionProvider.addMessageToBotState(delvisSecondQuestion);
  }
  return actionProvider.returnState(state);
};

export const delvisFulltResponse = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const currencyIntResponse = CurrencyOutput(res);
  const currencyStringResponse = ParseCurrencyStringForOutput(
    currencyIntResponse[1]
  );
  const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
  if (currencyIntResponse[0] === 5) {
    const currencyCustom = actionProvider.createClientMessage(currencyJSX);
    actionProvider.addMessageToBotState(currencyCustom);
    state = {
      ...state,
      undividedEstate: {
        ...state.undividedEstate,
        undivided_flag: QuestionType.part6,
        undividedEstateSeparateWealth:
          state.undividedEstate.totalEstateValue - parseInt(res),
      },
      netWealth: parseInt(res),
    };
    if (state.undividedEstate.undividedEstateSeparateWealth > 0) {
      const undividedEstateSpouseQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.UndividedEstateSpouseQuestion
      );
      actionProvider.addMessageToBotState(undividedEstateSpouseQuestion);
    }
  } else {
    const netWealthWarning = actionProvider.createChatBotMessage(
      QuestionConstants.NetWealthWarning
    );
    const fulltSaereieQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.FulltSaereieQuestion
    );
    actionProvider.addMessageToBotState(netWealthWarning);
    actionProvider.addMessageToBotState(fulltSaereieQuestion);
  }
  return actionProvider.returnState(state);
};

export const undividedEstateSpouse = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const undividedSpouseID = res;

  const newUndividedSpouse = actionProvider.createNewPerson(
    undividedSpouseID,
    state
  );

  state.person = newUndividedSpouse;
  state.testator._undividedEstateSpouse = newUndividedSpouse._id;
  state.testator.setPathforPartner(
    ParentChildSelector.undividedSpouse,
    newUndividedSpouse
  );
  const newUndividedSpouseDetail = Person.getPerson(
    newUndividedSpouse._id,
    state.personsMap
  );
  newUndividedSpouseDetail._deceased = true;
  const textBeforeSucsrUndvdSpouse = actionProvider.createChatBotMessage(
    QuestionConstants.TextBeforeSucsrUndvdSpouse
  );
  actionProvider.addMessageToBotState(textBeforeSucsrUndvdSpouse);
  state = {
    ...state,
    stepID: ChatStepTypes.undividedEstateStep,
    successor_flag: QuestionType.part3,
    temp_person: newUndividedSpouse,
    undividedSpouseId: newUndividedSpouse._id,
  };
  newUndividedSpouse._partnerNode = state.testator._id;
  const newSuccessorTogetherQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.undividedChildrenTogetherCount()
  );
  actionProvider.addMessageToBotState(newSuccessorTogetherQuestion);
  return actionProvider.returnState(state);
};
export const handleUndividedStep = (
  state: ChatbotInterface,
  actionProvider: ActionProvider,
  isTwoParent: boolean
) => {
  const testator = state.person;
  const testatorDetail = Person.getPerson(testator._id, state.personsMap);
  if (state.undividedEstate.undivided_flag === QuestionType.part6) {
    state.undividedEstate.undivided_flag = QuestionType.part7;
    state.person._partnerNode = null;
    state.successor_flag = QuestionType.part3;
    const newSuccessorUndvdSpouseQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.undvdSpouseOtherSuccessorQuestion()
    );
    actionProvider.addMessageToBotState(newSuccessorUndvdSpouseQuestion);
  } else if (state.undividedEstate.undivided_flag === QuestionType.part7) {
    const temp_class_undivided_spouse =
      actionProvider.get_class_and_distance_closest_surviving_relative(
        actionProvider.getNode(state.person._id, state.nodeMap),
        state
      )[0];
    if (temp_class_undivided_spouse !== 1) {
      // ask parent of und spouse question
      state.undividedEstate.undivided_flag = QuestionType.part8;
      state.parent_flag = QuestionType.part1;
      state.temp_person = state.person;
      const newParentQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.addParentsQuestion1(testatorDetail._personName)
      );
      actionProvider.addMessageToBotState(newParentQuestion);
    } else {
      askTestatorOtherChildrenQuestion(state, actionProvider);
    }
  } else {
    if (isTwoParent && state.temp_person._parents.length < 2) {
      state.successor_flag = QuestionType.initialQuestion;
      state.parent_flag = QuestionType.part3;
      const personName = actionProvider.getPerson(
        state.temp_person._id,
        state.personsMap
      )._personName;
      const secondParentChoiceQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.askSecondParentChoiceQuestion(`${personName}`),
        QuestionConstants.YesNoWidgetOptions
      );
      actionProvider.addMessageToBotState(secondParentChoiceQuestion);
      return actionProvider.returnState(state);
    }
    if (state.testator._undividedEstateSpouse) {
      const temp_class_undivided_spouse =
        actionProvider.get_class_and_distance_closest_surviving_relative(
          actionProvider.getNode(
            state.testator._undividedEstateSpouse,
            state.nodeMap
          ),
          state
        )[0];
      if (temp_class_undivided_spouse === undefined) {
        state.netWealth =
          state.netWealth + state.undividedEstate.undividedEstateSeparateWealth;
        state.undividedEstate.undividedEstateSeparateWealth = 0;
      }
      if (state.netWealth <= 0) {
        actionProvider.askFinalQuestion();
        return state;
      } else {
        askTestatorOtherChildrenQuestion(state, actionProvider);
      }
    }
  }
  return actionProvider.returnState(state);
};

const askTestatorOtherChildrenQuestion = (
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  state.stepID = ChatStepTypes.testatorOtherChildStep;
  state.successor_flag = QuestionType.part3;
  state.person = state.testator;
  state.temp_person = state.person;
  const testatorOtherSuccessorQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.testatorOtherSuccessorQuestion()
  );
  actionProvider.addMessageToBotState(testatorOtherSuccessorQuestion);
};

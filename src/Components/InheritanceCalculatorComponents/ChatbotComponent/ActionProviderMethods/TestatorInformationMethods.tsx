import ActionProvider from "../ActionProvider";
import InfoMessagesWidget from "../Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget";
import { ChatbotInterface } from "../Generics";
import { ChatStepTypes } from "../Helper/Enums/ChatStepTypes";
import {
  CurrencyOutput,
  ParseCurrencyStringForOutput,
} from "../Helper/Methods/HandleCurrency";
import QuestionConstants from "../Helper/Methods/QuestionConstants";
import { createTestator, getPerson } from "./OtherChatbotMethods";

export const handleTestator = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  /**
   *  * function for handling personID replies.
   *  * stepID is updated to 2 and then proceed to wealth question.
   *  * open reply, no conditions for now.
   */

  const undividedEstateQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.UndividedEstateQuestion,
    QuestionConstants.YesNoWidgetOptions
  );
  state = {
    ...state,
    stepID: ChatStepTypes.testatorStep,
    testator: createTestator(res, state, actionProvider),
  };
  state = {
    ...state,
  };

  actionProvider.addMessageToBotState(undividedEstateQuestion);
  return actionProvider.returnState(state);
};

export const handleNetWealth = (
  res: string,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  const netWealthQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.NetWealthQuestion
  );
  const currencyIntResponse = CurrencyOutput(res);
  const currencyStringResponse = ParseCurrencyStringForOutput(
    currencyIntResponse[1]
  );
  const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
  if (currencyIntResponse[0] === 5) {
    const underAgeQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.UnderAgeQuestion,
      QuestionConstants.YesNoWidgetOptions
    );
    const currencyCustom = actionProvider.createClientMessage(currencyJSX);
    actionProvider.addMessageToBotState(currencyCustom);

    state = {
      ...state,
      stepID: ChatStepTypes.underAgeStep,
      netWealth: parseInt(currencyIntResponse[1]),
    };
    if (state.netWealth <= 0) {
      actionProvider.askFinalQuestion();
    }
    actionProvider.addMessageToBotState(underAgeQuestion);
  } else {
    const netWealthWarning = actionProvider.createChatBotMessage(
      QuestionConstants.NetWealthWarning
    );

    actionProvider.addMessageToBotState(netWealthWarning);
    actionProvider.addMessageToBotState(netWealthQuestion);
  }

  return actionProvider.returnState(state);
};

export const handleUnderAge = (
  res: boolean,
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  state.person = state.testator;
  state.temp_person = state.testator;
  getPerson(state.person._id, state.personsMap)._underAge = res;
  if (res) {
    const cohabitantChoiceQuestion = actionProvider.createChatBotMessage(
      QuestionConstants.CohabitantChoiceQuestion,
      QuestionConstants.YesNoWidgetOptions
    );
    state = {
      ...state,
      stepID: ChatStepTypes.cohabitantChoice,
    };
    actionProvider.addMessageToBotState(cohabitantChoiceQuestion);

    return actionProvider.returnState(state);
  }

  const spouseChoiceQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.SpouseChoiceQuestion,
    QuestionConstants.YesNoWidgetOptions
  );
  state = {
    ...state,
    stepID: ChatStepTypes.spouseChoice,
  };
  actionProvider.addMessageToBotState(spouseChoiceQuestion);

  return actionProvider.returnState(state);
};

export const handleAskUnderAgeQuestion = (
  state: ChatbotInterface,
  actionProvider: ActionProvider
) => {
  state.stepID = ChatStepTypes.underAgeStep;
  const underAgeQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.UnderAgeQuestion,
    QuestionConstants.YesNoWidgetOptions
  );
  actionProvider.addMessageToBotState(underAgeQuestion);
  return actionProvider.returnState(state);
};

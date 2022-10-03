import ActionProvider from "../ActionProvider";
import { ChatbotInterface } from "../Generics";
import { ChatStepTypes } from "../Helper/Enums/ChatStepTypes";
import QuestionConstants from "../Helper/Methods/QuestionConstants";

export const handleTestator = (res: string, actionProvider: ActionProvider) => {
  /**
   *  * function for handling personID replies.
   *  * stepID is updated to 2 and then proceed to wealth question.
   *  * open reply, no conditions for now.
   */

  const undividedEstateQuestion = actionProvider.createChatBotMessage(
    QuestionConstants.UndividedEstateQuestion,
    QuestionConstants.YesNoWidgetOptions
  );
  actionProvider.setState((state: ChatbotInterface) => ({
    ...state,
    stepID: ChatStepTypes.testatorStep,
    testator: actionProvider.createTestator(res, state),
  }));
  actionProvider.setState((state: ChatbotInterface) => ({
    ...state,
  }));

  actionProvider.addMessageToBotState(undividedEstateQuestion);
};

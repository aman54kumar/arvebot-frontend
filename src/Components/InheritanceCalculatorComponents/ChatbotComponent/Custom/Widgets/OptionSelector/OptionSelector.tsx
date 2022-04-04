import "./OptionSelector.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";
import { ChatbotInterface } from "../../../Generics";
import { ChatStepTypes, QuestionType } from "../../../Helper/Enums/ChatStepTypes";
import { messageService } from "../../../services/ChatbotCommunicator";


const OptionSelector = (props: any): ReactElement => {
  const { actionProvider, setState } = props;
  const setOption = (option: boolean) => {
    handleOptions(option, actionProvider, setState);
  };

  const onClickHandler = (e: any): void => {
    // const thisButton = e.target as HTMLButtonElement
    // const nextButton = (thisButton).nextElementSibling as HTMLButtonElement
    // const prevButton = (thisButton).previousElementSibling as HTMLButtonElement
    // const otherButton = nextButton ? nextButton : prevButton
    // thisButton.style.pointerEvents = "none"
    // thisButton.style.background = "darkolivegreen";
    // thisButton.disabled = true;
    // otherButton.style.pointerEvents = "none"
    // otherButton.disabled = true;
  }
  return (
    <div>
      <div className="option-selector-button-container">
        <button
          className="option-selector-button"
          onClick={(e) => {
            onClickHandler(e);
            setOption(true)
          }}
        >
          <FormattedMessage id="Chatbot.Yes" />
        </button>
        <button
          className="option-selector-button"
          onClick={(e) => {
            onClickHandler(e);
            setOption(false)
          }}
        >
          <FormattedMessage id="Chatbot.No" />
        </button>
      </div>
    </div>
  );
};
const handleOptions = (option: boolean, actionProvider: any, setState: any) => {
  hideWarning();
  setState((state: ChatbotInterface) => {
    messageService.addPreviousState({ ...state })
    const curStep = state.stepID;
    state.yesNoClickedFlag = true;
    switch (curStep) {
      case ChatStepTypes.testatorStep: {
        actionProvider.handleUndividedEstateChoice(option);
        break;
      }
      case ChatStepTypes.undividedEstateStep: {
        if (state.successor_flag === QuestionType.part2) {
          actionProvider.handleChildAliveOption(option);
          break;
        }
        else if (state.parent_flag === QuestionType.part2) {
          actionProvider.handleParentAliveOption(option);
          break;
        }
        else if (state.parent_flag === QuestionType.part3) {
          actionProvider.handleSecondParentExists(option);
          break;
        }
        break;
      }
      case ChatStepTypes.underAgeStep: {
        actionProvider.handleUnderAge(option);
        break;
      }
      case ChatStepTypes.spouseChoice: {
        actionProvider.handleSpouseChoice(option);
        break;
      }
      case ChatStepTypes.cohabitantChoice: {
        actionProvider.handleCohabitantChoice(option);
        break;
      }
      case ChatStepTypes.successorStep: {
        state.successor_flag = QuestionType.part2
        actionProvider.handleChildAliveOption(option);
        break;
      }
      case ChatStepTypes.parentsStep: {
        if (state.successor_flag === QuestionType.part2) {
          actionProvider.handleChildAliveOption(option);
          break;
        }
        else if (state.parent_flag === QuestionType.part2) {
          actionProvider.handleParentAliveOption(option);
          break;
        }
        else if (state.parent_flag === QuestionType.part3) {
          actionProvider.handleSecondParentExists(option);
          break;
        }
        break;
      }
      case ChatStepTypes.marriedParentsStep: {
        actionProvider.handleMarriedParents(option);
        break;
      }
      case ChatStepTypes.grandParentStep: {
        if (state.successor_flag === QuestionType.part2) {
          actionProvider.handleChildAliveOption(option);
          break;
        }
        else if (state.parent_flag === QuestionType.part2) {
          actionProvider.handleParentAliveOption(option);
          break;
        }
        else if (state.parent_flag === QuestionType.part3) {
          actionProvider.handleSecondParentExists(option);
          break;
        }
        break;
      }
      case ChatStepTypes.finalStep: {
        actionProvider.handleFinalQuestion(option)
        break;
      }
      default: {
        console.log("fix this. state: ", state);
      }
    }
    return state;
  });
}
const hideWarning = () => {
  const warningDiv = document.getElementById("chatbot-warning-div");
  if (warningDiv) {
    warningDiv.style.display = "none";
    return;
  }
}
export default OptionSelector;
// function toggleInputField() {
//   const chatInputField = document.querySelectorAll(
//     ".react-chatbot-kit-chat-input"
//   ) as NodeListOf<HTMLElement>;
//   if (chatInputField)
//     chatInputField[0]. = !chatInputField.disabled;
// }


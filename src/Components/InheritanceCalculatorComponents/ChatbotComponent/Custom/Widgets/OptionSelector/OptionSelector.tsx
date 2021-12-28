import "./OptionSelector.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";
import { ChatbotInterface } from "../../../Generics";
import { ChatStepTypes, QuestionType } from "../../../Helper/Enums/ChatStepTypes";


const OptionSelector = (props: any): ReactElement => {
  const { actionProvider, setState } = props;
  // toggleInputField();
  const setOption = (option: boolean) => {
    setState((state: ChatbotInterface) => {
      const curStep = state.stepID;
      // toggleInputField();
      switch (curStep) {
        case ChatStepTypes.testatorStep: {
          actionProvider.handleUndividedEstateChoice(option);
          break;
        }
        case ChatStepTypes.undividedEstateStep: {
          actionProvider.handleChildAliveOption(option);
          break;
        }
        case ChatStepTypes.underAgeStep: {
          actionProvider.handleUnderAge(option);
          break;
        }
        case ChatStepTypes.successorStep: {
          state.successor_flag = QuestionType.part2
          actionProvider.handleChildAliveOption(option);
          break;
        }
        case ChatStepTypes.parentsStep: {
          state.parent_flag = QuestionType.part2;
          actionProvider.handleParentAliveOption(option);
          break;
        }
        case ChatStepTypes.rearChildrenStep: {
          actionProvider.handleRearChildrenResult(option);
          break;
        }
        case ChatStepTypes.marriedParentsStep: {
          actionProvider.handleMarriedParents(option);
          break;
        }
        case ChatStepTypes.grandParentStep: {
          state.grandParent_flag = QuestionType.part2
          actionProvider.handleGrandParentAliveOption(option)
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
  };
  const onClickHandler = (e: any): void => {
    const thisButton = e.target as HTMLButtonElement
    const nextButton = (thisButton).nextElementSibling as HTMLButtonElement
    const prevButton = (thisButton).previousElementSibling as HTMLButtonElement
    const otherButton = nextButton ? nextButton : prevButton
    thisButton.style.pointerEvents = "none"
    thisButton.disabled = true;
    otherButton.style.pointerEvents = "none"
    otherButton.disabled = true;
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

export default OptionSelector;
// function toggleInputField() {
//   const chatInputField = document.querySelectorAll(
//     ".react-chatbot-kit-chat-input"
//   ) as NodeListOf<HTMLElement>;
//   if (chatInputField)
//     chatInputField[0]. = !chatInputField.disabled;
// }


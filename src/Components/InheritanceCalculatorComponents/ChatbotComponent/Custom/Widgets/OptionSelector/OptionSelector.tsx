import "./OptionSelector.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";
import { ChatbotInterface } from "../../../Generics";


const OptionSelector = (props: any): ReactElement => {
  const { actionProvider, setState } = props;

  const setOption = (option: boolean) => {
    setState((state: ChatbotInterface) => {
      const curStep = state.stepID;
      switch (curStep) {
        case 2: {
          actionProvider.handleUndividedEstateChoice(option);
          break;
        }
        case 4: {
          actionProvider.handleUnderAge(option);
          break;
        }
        case 7: {
          state.successor_flag = "part2"
          actionProvider.handleChildAliveOption(option);
          break;
        }
        case 8: {
          state.parent_flag = "part2";
          actionProvider.handleParentAliveOption(option);
          break;
        }
        case 10: {
          actionProvider.handleRearChildrenResult(option);
          break;
        }
        case 11: {
          actionProvider.handleMarriedParents(option);
          break;
        }
        case 14: {
          state.grandParent_flag = "part2"
          actionProvider.handleGrandParentAliveOption(option)
          break;
        }
        case -1: {
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

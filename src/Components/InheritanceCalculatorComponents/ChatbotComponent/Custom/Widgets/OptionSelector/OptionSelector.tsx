import "./OptionSelector.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";


const OptionSelector = (props: any): ReactElement => {
  const { actionProvider, setState } = props;

  const setOption = (option: any) => {
    setState((state: any) => {
      const curStep = state.stepID;
      switch (curStep) {
        case 2: {
          actionProvider.handleUndividedEstate(option);
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
  return (
    <div>
      <div className="option-selector-button-container">
        <button
          className="option-selector-button"
          onClick={(e) => {
            const thisButton = e.target as HTMLButtonElement
            const nextButton = (thisButton).nextElementSibling as HTMLButtonElement
            thisButton.style.pointerEvents = "none"
            thisButton.disabled = true;
            nextButton.style.pointerEvents = "none"
            nextButton.disabled = true;
            setOption(true)
          }}
        >
          <FormattedMessage id="Chatbot.Yes" />
        </button>
        <button
          className="option-selector-button"
          onClick={(e) => {
            const thisButton = e.target as HTMLButtonElement
            const prevButton = (thisButton).previousElementSibling as HTMLButtonElement
            thisButton.style.pointerEvents = "none"
            thisButton.disabled = true;
            prevButton.style.pointerEvents = "none"
            prevButton.disabled = true;
            (setOption(false))
          }}
        >
          <FormattedMessage id="Chatbot.No" />
        </button>
      </div>
    </div>
  );
};

export default OptionSelector;

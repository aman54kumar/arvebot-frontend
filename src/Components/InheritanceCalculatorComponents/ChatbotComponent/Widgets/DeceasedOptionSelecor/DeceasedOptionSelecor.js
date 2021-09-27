import { FormattedMessage } from "react-intl";
import "./DeceasedOptionSelector.scss";

const deceasedOptionSelector = (props) => {
  const { setState, actionProvider } = props;

  const setOption = async (option) => {
    setState((state) => ({
      ...state,
      stepID: 5,
      deceased: option,
    }));

    actionProvider.handleDeceasedOptionWidget(option);
  };
  return (
    <div>
      hahahah
      <p className="deceased-option-selector-header">
        <FormattedMessage id="Chatbot.ChooseAppropriate" />{" "}
      </p>
      <div className="deceased-option-selector-button-container">
        <button
          className="deceased-option-selector-button"
          onClick={() => setOption(true)}
        >
          <FormattedMessage id="Chatbot.Yes" />
        </button>
        <button
          className="deceased-option-selector-button"
          onClick={() => setOption(false)}
        >
          <FormattedMessage id="Chatbot.No" />
        </button>
      </div>
    </div>
  );
};

export default deceasedOptionSelector;

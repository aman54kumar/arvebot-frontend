import React from "react";
import { FormattedMessage } from "react-intl";
import "./DeceasedOptionSelector.css";

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
      <p className="deceased-option-selector-header">
        <FormattedMessage id="Chatbot.ChooseAppropriate" />{" "}
      </p>
      <div className="deceased-ption-selector-button-container">
        <button
          className="deceased-option-selector-button"
          onClick={() => setOption(true)}
        >
          <FormattedMessage id="Chatbot.Married" />
        </button>
        <button
          className="deceased-option-selector-button"
          onClick={() => setOption(false)}
        >
          <FormattedMessage id="Chatbot.Unmarried" />
        </button>
      </div>
    </div>
  );
};

export default deceasedOptionSelector;

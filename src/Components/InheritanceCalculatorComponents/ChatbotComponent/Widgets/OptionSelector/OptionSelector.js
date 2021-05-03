import React from "react";
import "./OptionSelector.css";
import { FormattedMessage } from "react-intl";

const OptionSelector = (props) => {
  const { setState, actionProvider } = props;

  const setOption = (option) => {
    setState((state) => ({
      ...state,
      stepID: 4,
      underAge: option,
    }));

    actionProvider.handleUnderAgeWidget(option);
  };
  return (
    <div>
      <p className="option-selector-header">
        <FormattedMessage id="Chatbot.ChooseAppropriate" />{" "}
      </p>
      <div className="option-selector-button-container">
        <button
          className="option-selector-button"
          onClick={() => setOption(true)}
        >
          <FormattedMessage id="Chatbot.Yes" />
        </button>
        <button
          className="option-selector-button"
          onClick={() => setOption(false)}
        >
          <FormattedMessage id="Chatbot.No" />
        </button>
      </div>
    </div>
  );
};

export default OptionSelector;

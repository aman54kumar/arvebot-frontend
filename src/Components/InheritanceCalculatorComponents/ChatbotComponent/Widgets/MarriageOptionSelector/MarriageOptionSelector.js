import React from "react";
import { FormattedMessage } from "react-intl";
import "./MarriageOptionSelector.css";

const MarriageOptionSelector = (props) => {
  const { setState, actionProvider } = props;

  const setOption = async (option) => {
    setState((state) => ({
      ...state,
      stepID: 5,
      marriage: option,
    }));

    actionProvider.handleMarriageOptionWidget(option);
  };
  return (
    <div>
      <p className="marriage-option-selector-header">
        <FormattedMessage id="Chatbot.ChooseAppropriate" />{" "}
      </p>
      <div className="marriage-ption-selector-button-container">
        <button
          className="marriage-option-selector-button"
          onClick={() => setOption(true)}
        >
          Married
        </button>
        <button
          className="marriage-option-selector-button"
          onClick={() => setOption(false)}
        >
          Unmarried
        </button>
      </div>
    </div>
  );
};

export default MarriageOptionSelector;

import React from "react";
import { FormattedMessage } from "react-intl";
import "./MarriageOptionSelector.css";

const MarriageOptionSelector = (props) => {
  const { setState, actionProvider } = props;

  const setOption = async (option) => {
    var boolMarried = true;
    switch (option) {
      case 1: {
        boolMarried = true;
        break;
      }
      case 2: {
        boolMarried = true;
        break;
      }
      case 3: {
        boolMarried = false;
        break;
      }
      default: {
        console.log("error in MarriageOptionSelector");
        break;
      }
    }

    setState((state) => ({
      ...state,
      stepID: 5,
      marriage: boolMarried,
    }));

    actionProvider.handleMarriageOptionWidget(option);
  };
  return (
    <div>
      <p className="marriage-option-selector-header">
        <FormattedMessage id="Chatbot.ChooseAppropriate" />{" "}
      </p>
      <div className="marriage-option-selector-button-container">
        <button
          className="marriage-option-selector-button"
          onClick={() => setOption(1)}
        >
          <FormattedMessage id="Chatbot.MarriedAndAlive" />
        </button>
        <button
          className="marriage-option-selector-button"
          onClick={() => setOption(2)}
        >
          <FormattedMessage id="Chatbot.MarriedAndDead" />
        </button>
        <button
          className="marriage-option-selector-button"
          onClick={() => setOption(3)}
        >
          <FormattedMessage id="Chatbot.Unmarried" />
        </button>
      </div>
    </div>
  );
};

export default MarriageOptionSelector;

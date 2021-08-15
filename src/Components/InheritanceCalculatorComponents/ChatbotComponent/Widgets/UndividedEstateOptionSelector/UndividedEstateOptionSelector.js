import React from "react";
import "./UndividedEstateOptionSelector.scss";
import { FormattedMessage } from "react-intl";

const UndividedEstateOptionSelector = (props) => {
  const { setState, actionProvider } = props;

  const setOption = (option) => {
    setState((state) => ({
      ...state,
      stepID: 3,
      undividedEstate: option,
    }));

    actionProvider.handleUndividedEstate(option);
  };
  return (
    <div>
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

export default UndividedEstateOptionSelector;

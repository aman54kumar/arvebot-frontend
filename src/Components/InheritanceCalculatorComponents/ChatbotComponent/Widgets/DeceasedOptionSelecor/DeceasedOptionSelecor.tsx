import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import "./DeceasedOptionSelector.scss";

const DeceasedOptionSelector = (props: any): ReactElement => {
  const { setState, actionProvider } = props;

  const setOption =  (option: boolean) => {
    setState((state: any) => ({
      ...state,
    }));

    actionProvider.handleAliveOption(option);
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
    // <div>
    //   <p className="deceased-option-selector-header">
    //     <FormattedMessage id="Chatbot.ChooseAppropriate" />{" "}
    //   </p>
    //   <div className="deceased-option-selector-button-container">
    //     <button
    //       className="deceased-option-selector-button"
    //       onClick={() => setOption(true)}
    //     >
    //       <FormattedMessage id="Chatbot.Yes" />
    //     </button>
    //     <button
    //       className="deceased-option-selector-button"
    //       onClick={() => setOption(false)}
    //     >
    //       <FormattedMessage id="Chatbot.No" />
    //     </button>
    //   </div>
    // </div>
  );
};

export default DeceasedOptionSelector;

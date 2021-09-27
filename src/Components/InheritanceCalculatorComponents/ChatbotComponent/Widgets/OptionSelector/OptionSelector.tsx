import "./OptionSelector.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";

const OptionSelector = (props: any): ReactElement => {
  const { setState, actionProvider } = props;

  const setOption = (option: any) => {
    setState((state: any) => ({
      ...state,
      stepID: 5,
      undividedEstate: option,
    }));

    actionProvider.handleUnderAge(option);
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

export default OptionSelector;

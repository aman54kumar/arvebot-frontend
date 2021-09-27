import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import "./RearChildrenOptionSelector.scss";

const RearChildrenOptionSelector = (props: any): ReactElement => {
  const { setState, actionProvider } = props;

  const setOption = async (option: any) => {
    setState((state: any) => ({
      ...state,
      // stepID: 5,
      rearChildren: option,
    }));

    actionProvider.handleRearChildrenOptionWidget(option);
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

export default RearChildrenOptionSelector;

import "./UndividedEstateWidget.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";


const UndividedEstateWidget = (props: any): ReactElement => {
  const { actionProvider } = props;

  const setOption = (option: string) => {
    actionProvider.handleOwnershipResponse(option);
  };

  const onClickHandler = (e: any): void => {
    const thisButton = e.target as HTMLButtonElement;
    const currentParent = thisButton.parentElement;
    if (currentParent?.hasChildNodes) {
      const allCurrentButtons = Object.values(currentParent.childNodes) as HTMLButtonElement[];
      for (const childEl of allCurrentButtons) {
        childEl.style.pointerEvents = "none";
        childEl.disabled = true;
      }
      thisButton.style.background = "darkolivegreen";
    }
  }
  return (
    <div>
      <div className="option-selector-button-container">
        <button
          className="option-selector-button"
          onClick={(e) => {
            onClickHandler(e);
            setOption("FELLESEIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE1" />
        </button>
        <button
          className="option-selector-button"
          onClick={(e) => {
            onClickHandler(e);
            setOption("DELVIS SÆREIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE2" />
        </button>
        <button
          className="option-selector-button"
          onClick={(e) => {
            onClickHandler(e);
            setOption("FULLT SÆREIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE3" />
        </button>
      </div>
    </div>
  );
};

export default UndividedEstateWidget;

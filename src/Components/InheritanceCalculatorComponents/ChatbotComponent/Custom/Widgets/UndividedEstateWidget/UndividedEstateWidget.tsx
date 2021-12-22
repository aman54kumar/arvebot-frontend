import "./UndividedEstateWidget.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";


const UndividedEstateWidget = (props: any): ReactElement => {
  const { actionProvider } = props;

  const setOption = (option: string) => {
    actionProvider.handleOwnershipResponse(option);
  };

  // const onClickHandler = (e: any): void => {
  //   const thisButton = e.target as HTMLButtonElement
  //   const nextButton = (thisButton).nextElementSibling as HTMLButtonElement
  //   const prevButton = (thisButton).previousElementSibling as HTMLButtonElement
  //   const otherButton = nextButton ? nextButton : prevButton
  //   thisButton.style.pointerEvents = "none"
  //   thisButton.disabled = true;
  //   otherButton.style.pointerEvents = "none"
  //   otherButton.disabled = true;
  // }
  return (
    <div>
      <div className="option-selector-button-container">
        <button
          className="option-selector-button"
          onClick={() => {

            setOption("FELLESEIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE1" />
        </button>
        <button
          className="option-selector-button"
          onClick={() => {

            setOption("DELVIS SÆREIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE2" />
        </button>
        <button
          className="option-selector-button"
          onClick={() => {

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

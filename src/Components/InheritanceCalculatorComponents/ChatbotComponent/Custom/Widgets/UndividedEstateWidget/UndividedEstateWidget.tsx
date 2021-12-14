import "./UndividedEstateWidget.scss";
import { FormattedMessage } from "react-intl";
import { ReactElement } from "react";
import { ChatbotInterface } from "../../../Generics";


const UndividedEstateWidget = (props: any): ReactElement => {
  const { actionProvider, setState } = props;

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
          onClick={(e) => {

            setOption("FELLESEIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE1" />
        </button>
        <button
          className="option-selector-button"
          onClick={(e) => {

            setOption("DELVIS SÆREIE")
          }}
        >
          <FormattedMessage id="Chatbot.OWNERSHIP_TYPE2" />
        </button>
        <button
          className="option-selector-button"
          onClick={(e) => {

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

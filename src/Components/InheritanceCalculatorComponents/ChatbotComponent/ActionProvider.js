import { FormattedMessage } from "react-intl";
import { NorwegianId } from "norwegian-national-id-validator";
import * as HelperMethods from "./HelperMethods";
import ShowInfoWidget from "./Widgets/ShowInfoWidget/ShowInfoWidget";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleCaseName = (caseNameResponse) => {
    /**
     *  * function for handling caseName replies. open reply currently.
     *  * the stepID is updated to 1. and then proceed to testator question.
     */

    const testatorQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.TESTATOR_QUESTION" />
    );

    this.addMessageToBotState(testatorQuestion);
  };

  handlePersonID = (personIdResponse) => {
    /**
     *  * function for handling personID replies.
     *  * stepID is updated to 2 and then proceed to wealth question.
     *  * open reply, no conditions for now.
     */

    const netWealthQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.NET_WEALTH_QUESTION" />
    );

    this.updateStateProperty({ stepID: 2, id: personIdResponse });
    this.addMessageToBotState(netWealthQuestion);
  };

  handleNetWealth(currencyResponse) {
    const netWealthQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.NET_WEALTH_QUESTION" />
    );
    const currencyOutputResponse = HelperMethods.currencyDisplayValue(
      currencyResponse
    );

    const underAgeQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.UNDER_AGE_QUESTION" />,
      {
        widget: "optionSelectorWidget",
        withAvatar: true,
        loading: true,
        terminateLoading: true,
      }
    );
    if (HelperMethods.validateCurrency(currencyResponse)) {
      this.updateStateProperty({
        stepID: 3,
        netWealth: currencyOutputResponse,
      });

      this.setState((state) => {
        console.log(state);
        return state;
      });

      this.addMessageToBotState(underAgeQuestion);
    } else {
      const netWealthWarning = this.createChatBotMessage(
        <FormattedMessage id="Chatbot.NET_WEALTH_WARNING" />
      );

      this.addMessageToBotState(netWealthWarning);
      this.addMessageToBotState(netWealthQuestion);
    }
  }

  handleUnderAgeWidget = (selectedOption) => {
    if (!selectedOption) {
      // person not underage
      selectedOption = <FormattedMessage id="Chatbot.UnderAge" />;
      const underAgeResponse = this.createClientMessage(selectedOption);
      this.addMessageToBotState(underAgeResponse);

      const spouseExistQuestion = this.createChatBotMessage(
        <FormattedMessage id="Chatbot.SPOUSE_EXIST_QUESTION" />,
        {
          widget: "marriageOptionSelectorWidget",
          withAvatar: true,
          loading: true,
          terminateLoading: true,
        }
      );

      this.addMessageToBotState(spouseExistQuestion);
    } else {
      selectedOption = <FormattedMessage id="Chatbot.NotUnderAge" />;
      // TODO
      // person underage
      //  skip spouse and cohabitant question and ask next.
    }
  };

  handleMarriageOptionWidget = (selectedOption) => {
    switch (selectedOption) {
      case 1: {
        // TODO
        // Spouse children rearing
        break;
      }
      case 2: {
        // TODO
        // ask cohabitant question
        break;
      }
      case 3: {
        // TODO
        // ask cohabitant question
        break;
      }
      default: {
        console.log("error in handleMarriageOptionWidget");
        break;
      }
    }
    // if (selectedOption) {
    //   selectedOption = <FormattedMessage id="Chatbot.Married" />;
    //   const spouseExistResponse = this.createClientMessage(selectedOption);
    //   this.addMessageToBotState(spouseExistResponse);
    //   const spouseIDQuestion = this.createChatBotMessage(
    //     <FormattedMessage id="Chatbot.SPOUSE_QUESTION" />
    //   );
    //   this.addMessageToBotState(spouseIDQuestion);
    // } else {
    //   selectedOption = <FormattedMessage id="Chatbot.unmarried" />;
    //   const spouseExistResponse = this.createClientMessage(selectedOption);
    //   this.addMessageToBotState(spouseExistResponse);
    // }
  };

  handleSpouseID = (data) => {
    if (NorwegianId(data).isValid) {
      const updatedSpouseIdData = { id: data, spouse: true };
      this.createChatBotMessage("correct id");
      this.setState((state) => ({
        ...state,
        stepID: state.stepID + 1,
        partner: [...state.partner, updatedSpouseIdData],
      }));
    } else {
      this.createChatBotMessage("incorrect id");
    }
    this.setState((state) => {
      console.log(state);
      return state;
    });
  };

  // Generic functions
  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };

  updateStateProperty = (obj) => {
    this.setState((state) => ({
      ...state,
      stepID: obj.stepID ? obj.stepID : state.stepID,
      id: obj.id ? obj.id : state.id,
      caseName: obj.caseName ? obj.caseName : state.caseName,
      netWealth: obj.netWealth ? obj.netWealth : state.netWealth,
    }));
  };

  handleDefault = () => {
    const message = this.createChatBotMessage("How can I help?", {
      withAvatar: true,
    });

    this.addMessageToBotState(message);
  };
}

export default ActionProvider;

/**
 * * this code is for processing currency numbers to format: kr 123.456
 * ? const finalCurrency = new Intl.NumberFormat("nb-NB", {
 * ? style: "currency",
 * ? currency: "NOK",
 * ? currencyDisplay: "narrowSymbol",
 * ? }).format(outputCurrency);*/

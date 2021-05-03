import { FormattedMessage } from "react-intl";
import { NorwegianId } from "norwegian-national-id-validator";
import * as HelperMethods from "./HelperMethods";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleCaseName = (caseNameResponse) => {
    /**
     *  * function for handling casename replies. both correct and incorrect replies are covered.
     *  * the stepID is updated to 1 if the reply is correct. and then proceed to testator question.
     */
    const caseNameQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.CASE_NAME_QUESTION" />
    );

    const personIDQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.TESTATOR_QUESTION" />
    );

    if (!HelperMethods.isAlphaNumeric(caseNameResponse)) {
      const caseNameWarning = this.createChatBotMessage(
        <FormattedMessage id="Chatbot.CASE_NAME_WARNING" />
      );
      this.addMessageToBotState(caseNameWarning);
      this.addMessageToBotState(caseNameQuestion);
    } else {
      this.addMessageToBotState(personIDQuestion);
      this.updateStateProperty({ stepID: 1, caseName: caseNameResponse });
    }
  };

  handlePersonID = (personIDresponse) => {
    /**
     *  * function for handling personID replies for correct and incorrect values.
     *  * stepID is updated to 2 if the reply is correct and then proceed to wealth question.
     */

    const personIDQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.TESTATOR_QUESTION" />
    );

    const netWealthQuestion = this.createChatBotMessage(
      <FormattedMessage id="Chatbot.NET_WEALTH_QUESTION" />
    );

    if (NorwegianId(personIDresponse).isValid()) {
      this.updateStateProperty({ stepID: 2, id: personIDresponse });
      this.addMessageToBotState(netWealthQuestion);
    } else {
      const personIDWarning = this.createChatBotMessage(
        <FormattedMessage id="Chatbot.TESTATOR_WARNING" />
      );
      this.addMessageToBotState(personIDWarning);
      this.addMessageToBotState(personIDQuestion);
    }
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
    console.log(HelperMethods.validateCurrency(currencyResponse));
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
    if (selectedOption) {
      selectedOption = <FormattedMessage id="Chatbot.UnderAge" />;
    } else {
      selectedOption = <FormattedMessage id="Chatbot.NotUnderAge" />;
    }
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
  };

  handleMarriageOptionWidget = (selectedOption) => {
    if (selectedOption) {
      selectedOption = <FormattedMessage id="Chatbot.Married" />;
      const spouseExistResponse = this.createClientMessage(selectedOption);
      this.addMessageToBotState(spouseExistResponse);
      const spouseIDQuestion = this.createChatBotMessage(
        <FormattedMessage id="Chatbot.SPOUSE_QUESTION" />
      );
      this.addMessageToBotState(spouseIDQuestion);
    } else {
      selectedOption = <FormattedMessage id="Chatbot.unmarried" />;
      const spouseExistResponse = this.createClientMessage(selectedOption);
      this.addMessageToBotState(spouseExistResponse);
    }
  };

  handleSpouseID = (data) => {
    if (NorwegianId(data).isValid) {
      const updatedSpouseIDdata = { id: data, spouse: true };
      this.createChatBotMessage("correct id");
      this.setState((state) => ({
        ...state,
        stepID: state.stepID + 1,
        partner: [...state.partner, updatedSpouseIDdata],
      }));
    } else {
      this.createChatBotMessage("incorrect id");
    }
    this.setState((state) => {
      console.log(state);
      return state;
    });
  };
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

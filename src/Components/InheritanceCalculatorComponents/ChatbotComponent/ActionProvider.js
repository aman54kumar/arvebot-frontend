// import { FormattedMessage } from "react-intl";
import * as HelperMethods from "./HelperMethods";
import QuestionConsts from "./QuestionConstants";
import InheritanceConstants from "./InheritanceConstants";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.QuestionConsts = new QuestionConsts();
    this.InheritanceConstants = new InheritanceConstants();
  }

  handleCaseName = (caseNameResponse) => {
    /**
     *  * function for handling caseName replies. open reply currently.
     *  * the stepID is updated to 1. and then proceed to testator question.
     */

    const testatorQuestion = this.createChatBotMessage(
      this.QuestionConsts.TestatorQuestion
    );

    this.setState((state) => ({
      ...state,
      stepID: 1,
      caseName: caseNameResponse,
    }));
    // this.updateStateProperty({ stepID: 1, caseName: caseNameResponse });
    this.addMessageToBotState(testatorQuestion);
  };

  handleTestator = (testatorResponse) => {
    /**
     *  * function for handling personID replies.
     *  * stepID is updated to 2 and then proceed to wealth question.
     *  * open reply, no conditions for now.
     */

    const undividedEstateQuestion = this.createChatBotMessage(
      this.QuestionConsts.UndividedEstateQuestion,
      this.QuestionConsts.UndividedEstateWidgetOptions
    );

    this.setState((state) => ({
      ...state,
      stepID: 2,
      testator: testatorResponse,
    }));
    // this.updateStateProperty({ stepID: 2, testator: testatorResponse });
    this.addMessageToBotState(undividedEstateQuestion);
  };

  handleUndividedEstate = (undividedEstateResponse) => {
    // TODO: implement Yes/No conditions for undivided states.

    let selectedOption = this.QuestionConsts.UndividedEstateResultText(
      undividedEstateResponse
    );
    const undividedEstateClientMessage =
      this.createClientMessage(selectedOption);
    this.addMessageToBotState(undividedEstateClientMessage);

    const netWealthQuestion = this.createChatBotMessage(
      this.QuestionConsts.NetWealthQuestion
    );
    this.addMessageToBotState(netWealthQuestion);
  };

  handleNetWealth(currencyResponse) {
    /**
     *  * function for handling wealth replies.
     *  * stepID is updated to 3 and then proceed to underage question.
     *  * conditions for reply in currencyDisplayValue function.
     */
    const netWealthQuestion = this.createChatBotMessage(
      this.QuestionConsts.NetWealthQuestion
    );
    const currencyOutputResponse =
      HelperMethods.currencyDisplayValue(currencyResponse);

    const underAgeQuestion = this.createChatBotMessage(
      this.QuestionConsts.UnderAgeQuestion,
      this.QuestionConsts.UnderAgeWidgetOptions
    );

    if (HelperMethods.validateCurrency(currencyResponse)) {
      this.setState((state) => ({
        ...state,
        stepID: 4,
        netWealth: {
          ...state.netWealth,
          intValue: currencyResponse,
          strValue: currencyOutputResponse,
        },
      }));

      this.addMessageToBotState(underAgeQuestion);
    } else {
      const netWealthWarning = this.createChatBotMessage(
        this.QuestionConsts.NetWealthWarning
      );

      this.addMessageToBotState(netWealthWarning);
      this.addMessageToBotState(netWealthQuestion);
    }
  }

  handleUnderAge = (selectedOption) => {
    selectedOption = this.QuestionConsts.UnderAgeResultText(selectedOption);
    const underAgeResponse = this.createClientMessage(selectedOption);
    this.addMessageToBotState(underAgeResponse);

    const spouseQuestion = this.createChatBotMessage(
      this.QuestionConsts.SpouseQuestion
    );
    this.addMessageToBotState(spouseQuestion);
  };

  handleSpouseInput = (spouseResponse) => {
    /**
     *  * function for handling spouseID replies.
     *  * stepID is updated to 6 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    let spouseID = spouseResponse;
    this.setState((state) => {
      if (spouseID !== "") {
        if (
          state.netWealth.intValue <=
          this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
        ) {
          const rearChildrenQuestion = this.createChatBotMessage(
            this.QuestionConsts.RearChildrenQuestion,
            this.QuestionConsts.RearChildrenWidgetOptions
          );
          this.addMessageToBotState(rearChildrenQuestion);
        }
        state = { ...state, stepID: 7, spouse: spouseID };
      } else {
        this.setState((state) => ({
          ...state,
          stepID: 6,
          spouse: spouseID,
        }));
        const cohabitantQuestion = this.createChatBotMessage(
          this.QuestionConsts.CohabitantQuestion
        );
        this.addMessageToBotState(cohabitantQuestion);
      }
      return state;
    });
  };

  handleCohabitantInput = (cohabitantResponse) => {
    /**
     *  * function for handling cohabitant replies.
     *  * stepID is updated to 7 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    let cohabitantID = cohabitantResponse;
    this.setState((state) => {
      if (cohabitantID !== "") {
        if (
          state.netWealth.intValue <=
          this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN
        ) {
          const rearChildrenQuestion = this.createChatBotMessage(
            this.QuestionConsts.RearChildrenQuestion,
            this.QuestionConsts.RearChildrenWidgetOptions
          );
          this.addMessageToBotState(rearChildrenQuestion);
        }
        state = { ...state, stepID: 7, cohabitant: cohabitantID };
      }
      return state;
    });
  };

  handleRearChildrenOptionWidget = (rearChildrenResponse) => {
    console.log(rearChildrenResponse);
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

  // updateStateProperty = (obj) => {
  //   this.setState((state) => ({
  //     ...state,
  //     stepID: obj.stepID ? obj.stepID : state.stepID,
  //     testator: obj.testator ? obj.testator : state.testator,
  //     caseName: obj.caseName ? obj.caseName : state.caseName,
  //     netWealth: obj.netWealth ? obj.netWealth : state.netWealth,
  //     undividedEstate: obj.undividedEstate
  //       ? obj.undividedEstate
  //       : state.undividedEstate,
  //   }));
  // };

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
//  * ? const finalCurrency = new Intl.NumberFormat("nb-NB", {
 * ? style: "currency",
 * ? currency: "NOK",
 * ? currencyDisplay: "narrowSymbol",
 * ? }).format(outputCurrency);*/

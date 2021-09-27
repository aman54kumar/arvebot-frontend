import * as HelperMethods from "./Helper/Methods/HelperMethods";
import QuestionConsts from "./Helper/Methods/QuestionConstants";
import InheritanceConstants from "./Helper/Methods/InheritanceConstants";
import Person from "./Helper/Classes/Person";
import Family from "./Helper/Classes/Family";
import { ChatbotInterface } from "./Generics";
import { ReactElement } from "react";

class ActionProvider {
  createChatBotMessage: (
    questionElement: ReactElement,
    widget?: Record<string, unknown>
  ) => ReactElement;
  setState: (state: any) => any;
  createClientMessage: (messageElement: ReactElement) => any;
  QuestionConsts: QuestionConsts;
  InheritanceConstants: InheritanceConstants;
  family: Family;
  constructor(
    createChatBotMessage: (
      questionElement: ReactElement,
      widget?: Record<string, unknown>
    ) => ReactElement,
    setStateFunc: (state: any) => any,
    createClientMessage: (messageElement: ReactElement) => any
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.QuestionConsts = new QuestionConsts();
    this.InheritanceConstants = new InheritanceConstants();
    this.family = new Family();
  }

  handleCaseName = (caseNameResponse: string): void => {
    /**
     *  * function for handling caseName replies. open reply currently.
     *  * the stepID is updated to 1. and then proceed to testator question.
     */

    const testatorQuestion = this.createChatBotMessage(
      this.QuestionConsts.TestatorQuestion
    );

    this.setState((state: ChatbotInterface<Person>) => ({
      ...state,
      stepID: 1,
      caseName: caseNameResponse,
    }));

    // this.updateStateProperty({ stepID: 1, caseName: caseNameResponse });
    this.addMessageToBotState(testatorQuestion);
  };

  handleTestator = (testatorResponse: string): void => {
    /**
     *  * function for handling personID replies.
     *  * stepID is updated to 2 and then proceed to wealth question.
     *  * open reply, no conditions for now.
     */

    const undividedEstateQuestion = this.createChatBotMessage(
      this.QuestionConsts.UndividedEstateQuestion,
      this.QuestionConsts.UndividedEstateWidgetOptions
    );

    this.setState((state: ChatbotInterface<Person>) => ({
      ...state,
      stepID: 2,
      person: { ...state.person, _personID: testatorResponse },
    }));
    this.addMessageToBotState(undividedEstateQuestion);
  };

  handleUndividedEstate = (undividedEstateResponse: string): void => {
    // TODO: implement Yes/No conditions for undivided states.
    // TODO: need to fix the values in object and correctly implement the whole algorithm
    // TODO: check for correct text for the questions. (last step, the format of questions already available)

    const selectedOption = this.QuestionConsts.UndividedEstateResultText(
      undividedEstateResponse
    );
    const undividedEstateClientMessage =
      this.createClientMessage(selectedOption);
    this.addMessageToBotState(selectedOption);

    this.setState((state: ChatbotInterface<Person>) => ({
      ...state,
      stepID: 3,
      undividedEstate: undividedEstateResponse,
    }));
    const netWealthQuestion = this.createChatBotMessage(
      this.QuestionConsts.NetWealthQuestion
    );
    this.addMessageToBotState(netWealthQuestion);
  };

  handleNetWealth(currencyResponse: string): void {
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
      this.setState((state: ChatbotInterface<Person>) => ({
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

  handleUnderAge = (selectedOption: string): void => {
    this.setState((state: any) => {
      console.log(state);
      return state;
    });

    this.setState((state: ChatbotInterface<Person>) => ({
      ...state,
      stepID: 5,
      person: {
        ...state.person,
        _underAge: selectedOption,
      },
    }));
    this.setState((state: ChatbotInterface<Person>) => {
      console.log(state);
      return state;
    });

    const selectedOptionModified =
      this.QuestionConsts.UnderAgeResultText(selectedOption);
    const underAgeResponse = this.createClientMessage(selectedOptionModified);
    this.addMessageToBotState(underAgeResponse);
    const spouseQuestion = this.createChatBotMessage(
      this.QuestionConsts.SpouseQuestion
    );
    this.addMessageToBotState(spouseQuestion);
  };

  handleSpouseInput = (spouseResponse: string): void => {
    /**
     *  * function for handling spouseID replies.
     *  * stepID is updated to 6 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    const spouseID = spouseResponse;
    this.setState((state: any) => {
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

        state = {
          ...state,
          stepID: 7,
          person: { ...state.person, _spouse: new Person(spouseID) },
          max_depth: null,
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorquestion1(state.person._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
      } else {
        this.setState((state: any) => ({
          ...state,
          stepID: 6,
        }));
        const cohabitantQuestion = this.createChatBotMessage(
          this.QuestionConsts.CohabitantQuestion
        );
        this.addMessageToBotState(cohabitantQuestion);
      }
      return state;
    });
  };

  handleCohabitantInput = (cohabitantResponse: string): void => {
    /**
     *  * function for handling cohabitant replies.
     *  * stepID is updated to 7 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    const cohabitantID = cohabitantResponse;
    this.setState((state: any) => {
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
        state = {
          ...state,
          stepID: 7,
          person: { ...state.person, _cohabitant: new Person(cohabitantID) },
        };
      }
      return state;
    });
    // this.setState((state) => {
    //   console.log(state);
    //   return state;
    // });
  };

  handleSuccessorInput = (successorResponse: string): void => {
    const child_id = successorResponse;
    this.setState((state: any) => {
      if (state.person != undefined) {
        if (child_id === "") {
          console.log(state.person);
          state = {
            ...state,
            stepID: 8,
          };
          return;
        }
        const child = this.family.get_or_create_person(child_id);
        console.log(state);

        state.person.add_child(child, true);
        let allChildrenID = "";
        for (const child of state.person._children) {
          allChildrenID += child._personID + ", ";
        }
        allChildrenID =
          "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
        console.log(allChildrenID);
        // TODO
        // const aliveQuestion = this.createChatBotMessage(
        //   this.QuestionConsts.AliveQuestionText(),
        //   this.QuestionConsts.AliveWidgetOptions
        // );
        // this.addMessageToBotState(aliveQuestion);
        // state = {
        //   ...state,
        //   stepID: 9,
        //   temp: allChildrenID,
        // };
        // const newSuccessorQuestion = this.createChatBotMessage(
        //   this.QuestionConsts.addSuccessorquestion2(
        //     state.person._personID,
        //     allChildrenID
        //   )
        // );

        // this.addMessageToBotState(newSuccessorQuestion);
        return state;
      }
    });
  };

  handleDeceasedOption = (selectedOption: string): void => {
    this.setState((state: any) => {
      if (!selectedOption) {
        state = {
          ...state,
          stepID: 10,
          person: { ...state.person, _deceased: true },
        };
        if (state.max_depth === null) {
          // todo
          //  fix this implementation
        }
      }
    });
  };

  handleRearChildrenOptionWidget = (rearChildrenResponse: string): void => {
    console.log(rearChildrenResponse);
  };

  // Generic functions
  addMessageToBotState = (messages: ReactElement<any, any>): void => {
    if (Array.isArray(messages)) {
      this.setState((state: any) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state: any) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };

  handleDefault = (): void => {
    const message = this.createChatBotMessage(this.QuestionConsts.DefaultText, {
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

// import * as HelperMethods from "./Helper/Methods/HelperMethods";
import QuestionConsts from "./Helper/Methods/QuestionConstants";
import InheritanceConstants from "./Helper/Methods/InheritanceConstants";
import Person from "./Helper/Classes/Person";
import Family from "./Helper/Classes/Family";
import { ChatbotInterface } from "./Generics";
import { ReactElement } from "react";
import { CurrencyOutput, ParseCurrencyStringForOutput, validateCurrency } from "./Helper/Methods/HandleCurrency";
// import axios from 'axios'

class ActionProvider {
  createChatBotMessage: (
    questionElement: ReactElement,
    widget?: Record<string, unknown>
  ) => ReactElement;
  setState: (state: unknown) => ChatbotInterface<Person>;
  createClientMessage: (messageElement: ReactElement) => ReactElement<any, any>;
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
      temp_family: this.family,
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

    // const selectedOption = this.QuestionConsts.UndividedEstateResultText(
    //   undividedEstateResponse
    // );
    this.setState((state: ChatbotInterface<Person>) => ({
      ...state,
      stepID: 3,
      undividedEstate: undividedEstateResponse,
    }));

    const undividedEstateResponseModifiedResult =
      this.QuestionConsts.UndividedEstateResultText(undividedEstateResponse);

    const undividedEstateClientMessage = this.createClientMessage(
      undividedEstateResponseModifiedResult
    );
    this.addMessageToBotState(undividedEstateClientMessage);

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


    const currencyIntResponse = CurrencyOutput(currencyResponse)
    console.log(currencyIntResponse);

    const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
    console.log(currencyStringResponse);

    const currencyJSX = <div>Amount Entered: {currencyStringResponse}</div>
    const currencyBotMessage = this.createChatBotMessage(currencyJSX)
    this.addMessageToBotState(currencyBotMessage)
    if (currencyIntResponse[0] === 5) {

      const underAgeQuestion = this.createChatBotMessage(
        this.QuestionConsts.UnderAgeQuestion,
        this.QuestionConsts.UnderAgeWidgetOptions
      );


      this.setState((state: ChatbotInterface<Person>) => {
        state = {
          ...state,
          stepID: 4,
          netWealth: {
            ...state.netWealth,
            intValue: parseInt(currencyIntResponse[1]),
            strValue: currencyStringResponse,
          },
        }

        return state
      });
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
    this.setState((state: ChatbotInterface<Person>) => ({
      ...state,
      stepID: 5,
      person: {
        ...state.person,
        _underAge: selectedOption,
      },
    }));

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
    this.setState((state: ChatbotInterface<any>) => {
      if (spouseID !== "") {
        state = {
          ...state,
          stepID: 7,
          person: { ...state.person, _spouse: new Person(spouseID) },
          max_depth: null,
          successor_flag: "part1",
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(state.person._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
      }


      else if (!state.person._underAge && state.person.spouse === undefined) {
        state = {
          ...state,
          stepID: 6,
        };
        const cohabitantQuestion = this.createChatBotMessage(
          this.QuestionConsts.CohabitantQuestion
        );
        this.addMessageToBotState(cohabitantQuestion);
      }

      if (state.netWealth.intValue <=
        this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN) {
        const rearChildrenQuestion = this.createChatBotMessage(
          this.QuestionConsts.RearChildrenQuestion,
          this.QuestionConsts.RearChildrenWidgetOptions
        );
        this.addMessageToBotState(rearChildrenQuestion);
      }
      return state;
    });

  }

  handleCohabitantInput = (cohabitantResponse: string): void => {
    /**
     *  * function for handling cohabitant replies.
     *  * stepID is updated to 7 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    const cohabitantID = cohabitantResponse;
    this.setState((state: ChatbotInterface<any>) => {
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

    this.setState((state: ChatbotInterface<Person>) => {

      if (child_id === "") {

        state = {
          ...state,
          stepID: 10
        };
        this.closestSurvivingRelativeChildren();

      } else {
        // const child = state.temp_family.get_or_create_person(child_id);
        const child = new Person(child_id);

        // child._parents.push(new Person(state.person._personID))
        state = {
          ...state,
          successor_flag: "part2",
          temp_child: child,
        };

        const aliveQuestion = this.createChatBotMessage(
          this.QuestionConsts.AliveQuestion(child._personID),
          this.QuestionConsts.AliveWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);

      }
      return state;
    });
  };

  handleAliveOption = (alive: string): void => {
    this.setState((state: ChatbotInterface<Person>) => {
      const child = state.temp_child;

      if (!alive) {
        const child = state.temp_child;
        child._deceased = true;
        if (state.max_depth === null) {
          state = {
            ...state,
            temp_person: child,
            temp_family: this.family,
          };
        } else if (state.max_depth > 0) {
          state = {
            ...state,
            max_depth: state.max_depth - 1,
            temp_person: child,
            temp_family: this.family,
            successor_flag: "part1",
          };
        }
      } else {
        child._deceased = false;
        state = {
          ...state,
          temp_person: child,
          temp_family: this.family,
        };
      }
      let allChildrenID = "";
      for (const child of state.person._children) {
        allChildrenID += child._personID + ", ";
      }
      allChildrenID =
        "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
      const newSuccessorQuestion = this.createChatBotMessage(
        this.QuestionConsts.addSuccessorQuestion2(
          state.person._personID,
          allChildrenID
        )
      );
      state.person.add_child(child, true);
      state = {
        ...state,
        successor_flag: "part1",
        temp_person: state.person,
        temp_family: this.family,
      };
      this.addMessageToBotState(newSuccessorQuestion);
      this.setState((state: ChatbotInterface<Person>) => {
        return state;
      });
      console.log(state);

      return state;
    });
  };

  handleParentsInput = (parentResponse: string): void => {
    const parent_id = parentResponse;
    this.setState((state: ChatbotInterface<Person>) => {
      if (parent_id === "") {
        state = {
          ...state,
          stepID: 9,
        };
        console.log("handle parent input empty case");

      } else {
        // const child = state.temp_family.get_or_create_person(child_id);
        const parent = new Person(parent_id);

        // child._parents.push(new Person(state.person._personID))
        state = {
          ...state,
          stepID: 8,
          parent_flag: "part2",
          temp_parent: parent,
        };



        const aliveQuestion = this.createChatBotMessage(
          this.QuestionConsts.AliveQuestion(parent._personID),
          this.QuestionConsts.AliveWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);

      }
      return state;
    });
  }

  handleAliveParentOption = (alive: string): void => {
    const selectedOptionModified =
      this.QuestionConsts.AliveResultText(alive);
    const AliveResponse = this.createClientMessage(selectedOptionModified);
    this.addMessageToBotState(AliveResponse);
    this.setState((state: ChatbotInterface<Person>) => {
      const parent = state.temp_parent;

      if (!alive) {
        const parent = state.temp_parent;
        parent._deceased = true;
        if (state.max_depth === null) {
          state = {
            ...state,
            temp_person: parent,
            temp_family: this.family,
          };
        } else if (state.max_depth > 0) {
          state = {
            ...state,
            max_depth: state.max_depth - 1,
            temp_person: parent,
            temp_family: this.family,
          };
        }
      } else {
        parent._deceased = false;
        state = {
          ...state,
          temp_person: parent,
          temp_family: this.family,
        };
      }
      let allParentsID = "";
      for (const parent of state.person._parents) {
        allParentsID += parent._personID + ", ";
      }
      allParentsID =
        "{ " + allParentsID.slice(0, allParentsID.length - 2) + " }";
      const newSuccessorQuestion = this.createChatBotMessage(
        this.QuestionConsts.addSuccessorQuestion2(
          state.person._personID,
          allParentsID
        )
      );
      state.person.add_parent(parent, true);
      state = {
        ...state,
        parent_flag: "part1",
        temp_person: state.person,
        temp_family: this.family,
      };
      this.addMessageToBotState(newSuccessorQuestion);
      this.setState((state: ChatbotInterface<Person>) => {
        return state;
      });
      return state;
    });
  };


  handleFinalQuestion = (finalOption: string): void => {
    this.setState((state: ChatbotInterface<Person>) => {
      console.log(finalOption);

      console.log(state);


      return state
    })
  }

  handleRearChildrenResult = (rearChildrenResponse: boolean): void => {
    this.setState((state: ChatbotInterface<Person>) => {
      state = {
        ...state,
        stepID: 11,
      }
      const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
      this.addMessageToBotState(finalQuestion)
      return state
    })

  };

  closestSurvivingRelativeChildren = () => {
    let result = true;
    this.setState((state: ChatbotInterface<Person>) => {
      const [temp_class, temp_distance] = [
        ...state.person.get_class_and_distance_closest_surviving_relative(),
      ];

      if (temp_class === 1) {
        state = {
          ...state,
          stepID: 10,
        }
        const possiblyChildrenRearing = this.createChatBotMessage(this.QuestionConsts.RearChildrenQuestion, this.QuestionConsts.RearChildrenWidgetOptions)
        this.addMessageToBotState(possiblyChildrenRearing)
      }
      else if (
        state.person.spouse !== undefined &&
        parseInt(state.netWealth.strValue) <=
        this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
      ) {
        state = {
          ...state,
          stepID: 11,
        }
        result = true;
        const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
        this.addMessageToBotState(finalQuestion)
      }
      else if (
        state.person.cohabitant !== undefined &&
        parseInt(state.netWealth.strValue) <=
        this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN
      ) {
        state = {
          ...state,
          stepID: 11,
        }
        return;
      }

      else {
        state = {
          ...state,
          stepID: 8,
          parent_flag: "part1"
        };
        const newParentQuestion = this.createChatBotMessage(
          this.QuestionConsts.addParentsQuestion1(state.person._personID)
        );
        this.addMessageToBotState(newParentQuestion);
      }
      return state;
    });
    return result;
  };

  closestSurvivingRelativeParents = () => {
    // let result = true;
    // this.setState((state: ChatbotInterface<Person>) => {
    //   const [temp_class, temp_distance] = [
    //     ...state.person.get_class_and_distance_closest_surviving_relative(),
    //   ];

    //   if (temp_class === 1) {
    //     state = {
    //       ...state,
    //       stepID: 10,
    //     }
    //     const possiblyChildrenRearing = this.createChatBotMessage(this.QuestionConsts.RearChildrenQuestion, this.QuestionConsts.RearChildrenWidgetOptions)
    //     this.addMessageToBotState(possiblyChildrenRearing)
    //   }
    //   else if (
    //     state.person.spouse !== undefined &&
    //     parseInt(state.netWealth.strValue) <=
    //     this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
    //   ) {
    //     state = {
    //       ...state,
    //       stepID: 11,
    //     }
    //     result = true;
    //     const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
    //     this.addMessageToBotState(finalQuestion)
    //   }
    //   else if (
    //     state.person.cohabitant !== undefined &&
    //     parseInt(state.netWealth.strValue) <=
    //     this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN
    //   ) {
    //     state = {
    //       ...state,
    //       stepID: 11,
    //     }
    //     return;
    //   }

    //   else {
    //     state = {
    //       ...state,
    //       stepID: 8,
    //       parent_flag: "part1"
    //     };
    //     const newParentQuestion = this.createChatBotMessage(
    //       this.QuestionConsts.addParentsQuestion1(state.person._personID)
    //     );
    //     this.addMessageToBotState(newParentQuestion);
    //   }
    //   return state;
    // });
    // return result;
  };


  // Generic functions
  addMessageToBotState = (messages: any): void => {
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
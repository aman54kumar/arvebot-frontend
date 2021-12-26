import QuestionConsts from "./Helper/Methods/QuestionConstants";
import InheritanceConstants from "./Helper/Methods/InheritanceConstants";
import Person from "./Helper/Classes/Person";
import Family from "./Helper/Classes/Family";
import { ParentChildSelector } from "./Helper/Enums/ParentChildSelector";
import { ChatbotInterface } from "./Generics";
import { QuestionType } from "./Helper/Enums/SuccessorParentType";
import { ReactElement } from "react";
import { CurrencyOutput, ParseCurrencyStringForOutput } from "./Helper/Methods/HandleCurrency";
import InfoMessagesWidget from "./Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget"
import { NodeEntity } from "./Helper/Classes/NodeEntity";
import chartSelector from "../../../store/chartSelector";

class ActionProvider {

  createChatBotMessage: (
    questionElement: ReactElement,
    widget?: Record<string, unknown>
  ) => ReactElement;
  setState: (state: unknown) => ChatbotInterface;
  createClientMessage: (messageElement: ReactElement) => ReactElement<any, any>;
  QuestionConsts: QuestionConsts;
  InheritanceConstants: InheritanceConstants;
  family: Family;
  stateRef: any;
  checkstate: any = null
  isStarted = true;
  glb_state: any = null;
  GRANDCHILDREN_PATH_LIMIT = 4
  constructor(
    createChatBotMessage: (
      questionElement: ReactElement,
      widget?: Record<string, unknown>
    ) => ReactElement,
    setStateFunc: (state: any) => any,
    createClientMessage: (messageElement: ReactElement) => any,
    stateRef: any,
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.QuestionConsts = new QuestionConsts();
    this.InheritanceConstants = new InheritanceConstants();
    this.family = new Family();
    this.stateRef = stateRef;
  }

  check = () => {
    const self = this
    if (this.isStarted) {
      this.checkstate = setInterval(() => {
        if (self.glb_state !== null) {
          self.isStarted = false;
          const customEvent = new CustomEvent("build", { detail: self.glb_state })
          // const messagesEvent = new CustomEvent("getMessages", { detail: self.glb_state.messages })
          document.dispatchEvent(customEvent)
          // document.dispatchEvent(messagesEvent)
          // close the interval
          self.glb_state = null;
          clearInterval(this.checkstate)
        }
      }, 0)
    }
  }

  handleCaseName = (caseNameResponse: string): void => {
    /**
     *  * function for handling caseName replies. open reply currently.
     *  * the stepID is updated to 1. and then proceed to testator question.
     */

    const testatorQuestion = this.createChatBotMessage(
      this.QuestionConsts.TestatorQuestion
    );
    this.setState((state: ChatbotInterface) => ({
      ...state,
      stepID: 1,
      caseName: caseNameResponse,
      temp_family: this.family,
    }));
    this.setState((state: ChatbotInterface) => {
      return this.returnState(state);
    });


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
    this.setState((state: ChatbotInterface) => ({
      ...state,
      stepID: 2,
      testator: this.createTestator(testatorResponse, state),
    }));
    this.setState((state: ChatbotInterface) => ({
      ...state,
    }));
    this.addMessageToBotState(undividedEstateQuestion);
  };

  handleUndividedEstateChoice = (undividedEstateChoiceResponse: boolean): void => {
    // TODO: implement Yes/No conditions for undivided states.
    // TODO: need to fix the values in object and correctly implement the whole algorithm
    // TODO: check for correct text for the questions. (last step, the format of questions already available)
    this.setState((state: ChatbotInterface) => {
      const undividedEstateResponseModifiedResult =
        this.QuestionConsts.UndividedEstateResultText(`${undividedEstateChoiceResponse}`);

      const undividedEstateClientMessage = this.createClientMessage(
        undividedEstateResponseModifiedResult
      );
      this.addMessageToBotState(undividedEstateClientMessage);

      if (undividedEstateChoiceResponse) {
        state = {
          ...state,
          stepID: 3,
          undividedEstate: { ...state.undividedEstate, undivided_flag: "part1", undividedEstateChoice: undividedEstateChoiceResponse }

        }

        const totalEstateNetValueQuestion = this.createChatBotMessage(
          this.QuestionConsts.TotalEstateNetValueQuestion
        )
        this.addMessageToBotState(totalEstateNetValueQuestion)
        return this.returnState(state)
      }

      else {
        state = {
          ...state,
          stepID: 3,
          undividedEstate: { ...state.undividedEstate, undivided_flag: "none", undividedEstateChoice: undividedEstateChoiceResponse }
        }
        const netWealthQuestion = this.createChatBotMessage(
          this.QuestionConsts.NetWealthQuestion
        );
        this.addMessageToBotState(netWealthQuestion);
        return this.returnState(state)
      }
    })
  };

  handleTotalEstateValueResponse = (totalEstateValueResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      const totalEstateValueQuestion = this.createChatBotMessage(this.QuestionConsts.TotalEstateNetValueQuestion)
      const currencyIntResponse = CurrencyOutput(totalEstateValueResponse)
      const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
      const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />
      if (currencyIntResponse[0] === 5) {
        const ownershipTypeQuestion = this.createChatBotMessage(this.QuestionConsts.OwnershipTypeQuestion, this.QuestionConsts.OwnershipQuestionWidgetOptions)
        state = {
          ...state,
          undividedEstate: { ...state.undividedEstate, undivided_flag: "part2", totalEstateValue: parseInt(currencyIntResponse[1]) }

        }
        const currencyCustom = this.createClientMessage(currencyJSX)
        this.addMessageToBotState(currencyCustom)
        this.addMessageToBotState(ownershipTypeQuestion)
      }
      else {
        const totalEstateWarning = this.createChatBotMessage(
          this.QuestionConsts.TotalEstateNetValueWarning
        );

        this.addMessageToBotState(totalEstateWarning);
        this.addMessageToBotState(totalEstateValueQuestion);
      }

      return this.returnState(state)
    })
  }

  handleOwnershipResponse = (ownershipResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      if (ownershipResponse === "FELLESEIE") {
        state = {
          ...state,
          undividedEstate: {
            ...state.undividedEstate,
            undivided_flag: "part6",
            undividedEstateSeparateWealth: state.undividedEstate.totalEstateValue / 2,
          },

          netWealth: state.undividedEstate.totalEstateValue / 2
        }
        if (state.undividedEstate.undividedEstateSeparateWealth > 0) {
          const undividedEstateSpouseQuestion = this.createChatBotMessage(this.QuestionConsts.UndividedEstateSpouseQuestion)
          this.addMessageToBotState(undividedEstateSpouseQuestion)
        }
        else {
          if (state.person !== state.testator && state.person._undividedEstateSpouse) {
            const temp_class_undivided_spouse = this.get_class_and_distance_closest_surviving_relative(this.getNode(state.person._undividedEstateSpouse, state.nodeMap), state)[0]
            if (temp_class_undivided_spouse === undefined) {
              state.netWealth = state.netWealth + state.undividedEstate.undividedEstateSeparateWealth
              state.undividedEstate.undividedEstateSeparateWealth = 0
            }

            if (state.netWealth <= 0) {
              this.askFinalQuestion()
            }
            else {
              this.setState((state: ChatbotInterface) => {
                state.stepID = 4;
              });
              const underAgeQuestion = this.createChatBotMessage(
                this.QuestionConsts.UnderAgeQuestion,
                this.QuestionConsts.UnderAgeWidgetOptions
              );
              this.addMessageToBotState(underAgeQuestion);
              return this.returnState(state)
            }
          }
        }
      }
      else if (ownershipResponse === "DELVIS SÆREIE") {
        state = {
          ...state,
          undividedEstate: { ...state.undividedEstate, undivided_flag: "part3" }
        }
        const delvisFirstQuestion = this.createChatBotMessage(this.QuestionConsts.DelvisFirstQuestion);
        this.addMessageToBotState(delvisFirstQuestion)
      }
      else if (ownershipResponse === "FULLT SÆREIE") {
        state = {
          ...state,
          undividedEstate: { ...state.undividedEstate, undivided_flag: "part5" }
        }
        const fulltSaereieQuestion = this.createChatBotMessage(this.QuestionConsts.FulltSaereieQuestion);
        this.addMessageToBotState(fulltSaereieQuestion)
      }
      else {
        const ownershipTypeWarning = this.createChatBotMessage(this.QuestionConsts.OwnershipTypeWarning);
        const ownershipTypeQuestion = this.createChatBotMessage(this.QuestionConsts.OwnershipTypeQuestion, this.QuestionConsts.OwnershipQuestionWidgetOptions)
        this.addMessageToBotState(ownershipTypeWarning)
        this.addMessageToBotState(ownershipTypeQuestion)
      }
      return this.returnState(state)
    });
  }

  handleDelvisFirstResponse = (delvisFirstResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      const currencyIntResponse = CurrencyOutput(delvisFirstResponse)
      const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
      const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />
      if (currencyIntResponse[0] === 5) {
        const currencyCustom = this.createClientMessage(currencyJSX)
        this.addMessageToBotState(currencyCustom)
        state = {
          ...state,
          undividedEstate: { ...state.undividedEstate, undivided_flag: "part4", temp_first: parseInt(currencyIntResponse[1]) }
        }
        const delvisSecondQuestion = this.createChatBotMessage(this.QuestionConsts.DelvisSecondQuestion)
        this.addMessageToBotState(delvisSecondQuestion)
      }
      else {
        const netWealthWarning = this.createChatBotMessage(
          this.QuestionConsts.NetWealthWarning
        );
        const delvisFirstQuestion = this.createChatBotMessage(this.QuestionConsts.DelvisFirstQuestion);
        this.addMessageToBotState(netWealthWarning);
        this.addMessageToBotState(delvisFirstQuestion);
      }
      return this.returnState(state)
    })
  }

  handleDelvisSecondResponse = (delvisSecondResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      const currencyIntResponse = CurrencyOutput(delvisSecondResponse)
      const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
      const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />
      if (currencyIntResponse[0] === 5) {
        const currencyCustom = this.createClientMessage(currencyJSX)
        this.addMessageToBotState(currencyCustom)
        state.undividedEstate.temp_last = parseInt(currencyIntResponse[1])
        state = {
          ...state,
          undividedEstate: {
            ...state.undividedEstate,
            undivided_flag: "part6",
            undividedEstateSeparateWealth: (state.undividedEstate.totalEstateValue - state.undividedEstate.temp_last - state.undividedEstate.temp_first) / 2 + state.undividedEstate.temp_first
          },
          netWealth: (state.undividedEstate.totalEstateValue - state.undividedEstate.temp_last - state.undividedEstate.temp_first) / 2 + state.undividedEstate.temp_last,
        }
        const undividedEstateSpouseQuestion = this.createChatBotMessage(this.QuestionConsts.UndividedEstateSpouseQuestion)
        this.addMessageToBotState(undividedEstateSpouseQuestion)
      }
      else {
        const netWealthWarning = this.createChatBotMessage(
          this.QuestionConsts.NetWealthWarning
        );
        const delvisSecondQuestion = this.createChatBotMessage(this.QuestionConsts.DelvisSecondQuestion);
        this.addMessageToBotState(netWealthWarning);
        this.addMessageToBotState(delvisSecondQuestion);
      }
      return this.returnState(state)
    })
  }

  handleFulltSaereieResponse = (fulltSaereieResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      const currencyIntResponse = CurrencyOutput(fulltSaereieResponse)
      const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
      const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />
      if (currencyIntResponse[0] === 5) {
        const currencyCustom = this.createClientMessage(currencyJSX)
        this.addMessageToBotState(currencyCustom)
        state = {
          ...state,
          undividedEstate: {
            ...state.undividedEstate,
            undivided_flag: "part6",
            undividedEstateSeparateWealth: state.undividedEstate.totalEstateValue - parseInt(fulltSaereieResponse)
          },
          netWealth: parseInt(fulltSaereieResponse),
        }
        if (state.undividedEstate.undividedEstateSeparateWealth > 0) {
          const undividedEstateSpouseQuestion = this.createChatBotMessage(this.QuestionConsts.UndividedEstateSpouseQuestion)
          this.addMessageToBotState(undividedEstateSpouseQuestion)
        }
      }
      else {
        const netWealthWarning = this.createChatBotMessage(
          this.QuestionConsts.NetWealthWarning
        );
        const fulltSaereieQuestion = this.createChatBotMessage(this.QuestionConsts.FulltSaereieQuestion);
        this.addMessageToBotState(netWealthWarning);
        this.addMessageToBotState(fulltSaereieQuestion)
      }
      return this.returnState(state)
    })
  }

  handleUndividedEstateSpouse = (undividedEstateSpouseResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      const undividedSpouseID = undividedEstateSpouseResponse
      if (undividedEstateSpouseResponse !== "") {
        const newUndividedSpouse = this.createNewPerson(undividedSpouseID, state)
        state.person = newUndividedSpouse;
        state.testator._undividedEstateSpouse = newUndividedSpouse._id
        state.testator.setPathforPartner(ParentChildSelector.undividedSpouse, newUndividedSpouse)
        const newUndividedSpouseDetail = Person.getPerson(newUndividedSpouse._id, state.personsMap)
        newUndividedSpouseDetail._deceased = true;
        const textBeforeSucsrUndvdSpouse = this.createChatBotMessage(this.QuestionConsts.TextBeforeSucsrUndvdSpouse)
        this.addMessageToBotState(textBeforeSucsrUndvdSpouse)
        state = {
          ...state,
          stepID: 3,
          successor_flag: "part1",
          temp_person: newUndividedSpouse,
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(newUndividedSpouseDetail._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
      }
      else {
        state = {
          ...state,
          stepID: 4
        }
      }
      return this.returnState(state)
    })
  }


  handleNetWealth(currencyResponse: string): void {
    /**
     *  * function for handling wealth replies.
     *  * stepID is updated to 3 and then proceed to underage question.
     *  * conditions for reply in currencyDisplayValue function.
     */
    this.setState((state: ChatbotInterface) => {
      const netWealthQuestion = this.createChatBotMessage(
        this.QuestionConsts.NetWealthQuestion
      );
      const currencyIntResponse = CurrencyOutput(currencyResponse)
      const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
      const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />
      if (currencyIntResponse[0] === 5) {
        const underAgeQuestion = this.createChatBotMessage(
          this.QuestionConsts.UnderAgeQuestion,
          this.QuestionConsts.UnderAgeWidgetOptions
        );
        const currencyCustom = this.createClientMessage(currencyJSX)
        this.addMessageToBotState(currencyCustom)

        state = {
          ...state,
          stepID: 4,
          netWealth: parseInt(currencyIntResponse[1]),
        }
        if (state.netWealth <= 0) {
          this.askFinalQuestion()
        }
        this.addMessageToBotState(underAgeQuestion);
      } else {
        const netWealthWarning = this.createChatBotMessage(
          this.QuestionConsts.NetWealthWarning
        );

        this.addMessageToBotState(netWealthWarning);
        this.addMessageToBotState(netWealthQuestion);
      }


      return this.returnState(state)
    })

  }

  handleUnderAge = (selectedOption: string): void => {
    this.setState((state: ChatbotInterface) => {
      state = {
        ...state,
        stepID: 5,
      }
      state.person = state.testator;
      state.temp_person = state.testator
      this.getPerson(state.person._id, state.personsMap)._underAge = selectedOption == 'true' ? true : false;


      const selectedOptionModified =
        this.QuestionConsts.UnderAgeResultText(selectedOption);
      const underAgeResponse = this.createClientMessage(selectedOptionModified);
      this.addMessageToBotState(underAgeResponse);
      const spouseQuestion = this.createChatBotMessage(
        this.QuestionConsts.SpouseQuestion
      );
      this.addMessageToBotState(spouseQuestion);
      return this.returnState(state)
    });
  };

  handleSpouseInput = (spouseResponse: string): void => {
    /**
     *  * function for handling spouseID replies.
     *  * stepID is updated to 6 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    const spouseID = spouseResponse;
    this.setState((state: ChatbotInterface) => {
      const testator = Person.getPerson(state.person._id, state.personsMap)
      if (spouseID !== "") {
        const newSpouse = this.createNewPerson(spouseID, state)
        state.person._spouse = newSpouse._id
        state.person.setPathforPartner(ParentChildSelector.spouse, newSpouse)
        if (state.netWealth <=
          this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN) {
          state = {
            ...state,
            stepID: 10
          }
          const rearChildrenQuestion = this.createChatBotMessage(
            this.QuestionConsts.RearChildrenQuestion,
            this.QuestionConsts.RearChildrenWidgetOptions
          );
          this.addMessageToBotState(rearChildrenQuestion);
          return this.returnState(state);
        }

        state = {
          ...state,
          stepID: 7,
          successor_flag: "part3",
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorCount(testator._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      }

      else if (!testator._underAge && testator.spouse === undefined) {
        state = {
          ...state,
          stepID: 6,
        };
        const cohabitantQuestion = this.createChatBotMessage(
          this.QuestionConsts.CohabitantQuestion
        );
        this.addMessageToBotState(cohabitantQuestion);
        return this.returnState(state);
      }

      else {
        state = {
          ...state,
          stepID: 7,
          successor_flag: "part1",
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(testator._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      }


      // return this.returnState(state);
    });

  }

  handleCohabitantInput = (cohabitantResponse: string): void => {
    /**
     *  * function for handling cohabitant replies.
     *  * stepID is updated to 7 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    // NodeEntity.setPathforPartner(ParentChildSelector.cohabitant, state.person._cohabitant)
    const cohabitantID = cohabitantResponse;
    this.setState((state: ChatbotInterface) => {
      const testator = Person.getPerson(state.person._id, state.personsMap)

      if (cohabitantID !== "") {

        const newCohabitant = this.createNewPerson(cohabitantID, state)
        state.person._cohabitant = newCohabitant._id
        state.person.setPathforPartner(ParentChildSelector.cohabitant, newCohabitant)

        if (state.netWealth <=
          this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN) {
          state = {
            ...state,
            stepID: 10
          }
          const rearChildrenQuestion = this.createChatBotMessage(
            this.QuestionConsts.RearChildrenQuestion,
            this.QuestionConsts.RearChildrenWidgetOptions
          );
          this.addMessageToBotState(rearChildrenQuestion);
          return this.returnState(state);
        }

        state = {
          ...state,
          stepID: 7,
          successor_flag: "part1",
        };


        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(testator._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      }

      else {
        state = {
          ...state,
          stepID: 7,
          successor_flag: "part1",
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(testator._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      }

    });
  };
  handleSuccessorCount(message: string): void {
    const successorCount = parseInt(message);
    this.setState((state: ChatbotInterface) => {
      state.temp_person._childCount = successorCount;
      if (successorCount === 0) {
        // TODO
        console.log("TODO successor count = 0 ");

      }
      if (state.successorProcessArray.filter(t => t[0] === state.temp_person._level).length === 0) {
        state.successorProcessArray.push([state.temp_person._level, 1]);
      }

      state.successor_flag = QuestionType.part1;
      const newSuccessorQuestion = this.createChatBotMessage(
        this.QuestionConsts.addSuccessorQuestion1(this.getPerson(state.temp_person._id, state.personsMap)._personID)
      );
      this.addMessageToBotState(newSuccessorQuestion);
      return this.returnState(state);
    });
  }
  handleSuccessorInput = (successorResponse: string): void => {
    const child_id = successorResponse;
    this.setState((state: ChatbotInterface) => {
      // if (child_id === "") {
      //   const currentParentID = state.temp_person.getParentId();
      //   if (currentParentID && state.temp_person.getLatestPathKey() !== ParentChildSelector.undividedSpouse) {
      //     const currentParent = NodeEntity.getNode(currentParentID, state.nodeMap)
      //     state = {
      //       ...state,
      //       temp_person: currentParent,
      //       successor_flag: "part1",
      //     }
      //     const allChildrenID = this.getParentChildrenIDStrings(currentParent._children, state)

      //     const newSuccessorQuestion = this.createChatBotMessage(
      //       this.QuestionConsts.addSuccessorQuestion2(
      //         Person.getPerson(currentParent._id, state.personsMap)._personID,
      //         allChildrenID
      //       )
      //     );
      //     this.addMessageToBotState(newSuccessorQuestion);
      //   } else {
      //     this.closestSurvivingRelativeChildren()
      //   }

      // } else {
      const child = this.createNewPerson(child_id, state);

      state = {
        ...state,
        successor_flag: QuestionType.part2,
        temp_child: child,
      };
      state.temp_person.add_child(child, true);
      const personId: any = Person.getPerson(child._id, state.personsMap)?._personID
      const aliveQuestion = this.createChatBotMessage(
        this.QuestionConsts.AliveQuestion(personId),
        this.QuestionConsts.AliveWidgetOptions
      );
      this.addMessageToBotState(aliveQuestion);
      // }
      return this.returnState(state);
    });
  };

  handleChildAliveOption = (alive: string): void => {
    this.setState((state: ChatbotInterface) => {
      const child = state.temp_child;
      const childDetail = this.getPerson(child._id, state.personsMap);
      // const temp_person: NodeEntity = state.temp_person
      let successorProcessArray = state.successorProcessArray
      if (alive) {
        const childItrPos = successorProcessArray[successorProcessArray.length - 1][1]
        if (childItrPos) {
          if (state.temp_person._childCount > childItrPos) {
            successorProcessArray[successorProcessArray.length - 1][1] = childItrPos + 1;
            // ask childid question
            state.successor_flag = QuestionType.part1;
            const allChildrenID = this.getParentChildrenIDStrings(state.temp_person._children, state)
            const newSuccessorQuestion = this.createChatBotMessage(
              this.QuestionConsts.addSuccessorQuestion2(this.getPerson(state.temp_person._id, state.personsMap)._personID, allChildrenID)
            );
            this.addMessageToBotState(newSuccessorQuestion);
            return this.returnState(state);
          } else if (state.temp_person._childCount === childItrPos) {
            if (state.temp_person._id === state.person._id) {
              // exit case
              console.log("Exit Case");
            } else {
              let currentParentID = state.temp_person._id;
              let currentParent = NodeEntity.getNode(currentParentID, state.nodeMap)

              let isCurrentParentID = true;
              while (successorProcessArray[successorProcessArray.length - 1][1] === currentParent._childCount) {
                successorProcessArray = successorProcessArray.slice(0, -1)
                // current parent update
                const currentId = currentParent.getParentId();
                if (currentId) {
                  currentParentID = currentId;
                  currentParent = NodeEntity.getNode(currentParentID, state.nodeMap);
                } else {
                  isCurrentParentID = false
                  break;
                }
              }
              if (!isCurrentParentID) {
                // exit case
                console.log("Exit Case");

              } else {
                successorProcessArray[successorProcessArray.length - 1][1] = childItrPos + 1;
                // ask childid question
                state.temp_person = currentParent
                const currentParentDetail = this.getPerson(currentParentID, state.personsMap)
                state.successor_flag = QuestionType.part1;
                const allChildrenID = this.getParentChildrenIDStrings(currentParent._children, state)
                const newSuccessorQuestion = this.createChatBotMessage(
                  this.QuestionConsts.addSuccessorQuestion2(currentParentDetail._personID, allChildrenID)
                );
                this.addMessageToBotState(newSuccessorQuestion);
                return this.returnState(state);
              }
              console.log("Here");

            }
          } else {
            throw new Error("state.temp_person._childCount < childItrPos case")
          }
        } else {
          throw new Error("childItrPos is null")
        }
      } else {
        // not alive
        state = {
          ...state,
          successor_flag: QuestionType.part3,
          temp_person: child
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorCount(childDetail._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      }
      return this.returnState(state);
    });
  };
  // temp_person.add_child(child, true);
  // if (!alive) {

  //   childDetail.deceased = true;
  //   state = {
  //     ...state,
  //     temp_person: child,
  //     successor_flag: "part1"
  //   }
  //   const newSuccessorQuestion = this.createChatBotMessage(
  //     this.QuestionConsts.addSuccessorQuestion1(
  //       childDetail._personID,
  //     )
  //   );
  //   this.addMessageToBotState(newSuccessorQuestion);
  //   return this.returnState(state);
  // }
  // else {
  //   childDetail._deceased = false;
  //   state = {
  //     ...state,
  //     successor_flag: "part1"
  //   }
  //   const allChildrenID = this.getParentChildrenIDStrings(temp_person._children, state)
  //   const newSuccessorQuestion = this.createChatBotMessage(
  //     this.QuestionConsts.addSuccessorQuestion2(
  //       Person.getPerson(temp_person._id, state.personsMap)._personID,
  //       allChildrenID
  //     )
  //   );
  //   this.addMessageToBotState(newSuccessorQuestion);
  //   return this.returnState(state);
  // }


  handleParentsInput = (parentResponse: string): void => {
    const predecessor_id = parentResponse;
    this.setState((state: ChatbotInterface) => {
      if (predecessor_id === "") {
        const currentParentID = state.temp_person.getParentId();
        if (currentParentID) {
          const currentParent = NodeEntity.getNode(currentParentID, state.nodeMap)
          if (currentParentID !== state.person._id) {
            // ask child question
            state = {
              ...state,
              temp_person: currentParent,
              parent_flag: "part1",
            }
            const allChildrenID = this.getParentChildrenIDStrings(currentParent._children, state)

            const newSuccessorQuestion = this.createChatBotMessage(
              this.QuestionConsts.addSuccessorQuestion2(
                Person.getPerson(currentParent._id, state.personsMap)._personID,
                allChildrenID
              )
            );
            this.addMessageToBotState(newSuccessorQuestion);

          } else {
            // add parent, here  currentParent = testator
            if (currentParent._parents.length < 2) {
              state = {
                ...state,
                parent_flag: "part1",
                temp_person: currentParent,

              }
              const allParentsID = this.getParentChildrenIDStrings(currentParent._parents, state)
              const newParentQuestion = this.createChatBotMessage(
                this.QuestionConsts.addParentsQuestion2(
                  Person.getPerson(currentParentID, state.personsMap)._personID,
                  allParentsID
                )
              );
              this.addMessageToBotState(newParentQuestion);
            } else {
              this.closestSurvivingRelativeParents();
            }
          }
        } else {
          if (NodeEntity.getNode(state.person._id, state.nodeMap)._parents.length === 0) {
            this.askFinalQuestion()
          }
          else {
            this.closestSurvivingRelativeParents();
          }
        }

      }
      else {
        const predecessor = this.createNewPerson(predecessor_id, state);
        if (state.temp_person.getLatestPathKey() !== ParentChildSelector.testator) {
          state = {
            ...state,
            parent_flag: "part2",
            temp_child: predecessor,
          };
        } else {
          state = {
            ...state,
            parent_flag: "part2",
            temp_parent: predecessor,
          };
        }
        const aliveQuestion = this.createChatBotMessage(
          this.QuestionConsts.AliveQuestion(Person.getPerson(predecessor._id, state.personsMap)._personID),
          this.QuestionConsts.AliveWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);
      }
      return this.returnState(state);
    })
  }

  handleParentAliveOption = (alive: string): void => {
    this.setState((state: ChatbotInterface) => {
      const temp_person = state.temp_person;
      const temp_person_detail = Person.getPerson(temp_person._id, state.personsMap)
      if (temp_person.getLatestPathKey() !== ParentChildSelector.testator) {
        // if temp_person is not testator, ask child question
        const temp_child = state.temp_child
        temp_person.add_child(temp_child, true);
        const temp_child_detail = Person.getPerson(temp_child._id, state.personsMap)

        if (!alive) {
          state = {
            ...state,
            temp_person: temp_child,
            parent_flag: "part1",
          }
          temp_child_detail._deceased = true;

          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion1(
              temp_child_detail._personID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);

        }
        else {
          state = {
            ...state,
            parent_flag: "part1"
          }

          const allChildrenID = this.getParentChildrenIDStrings(temp_person._children, state)

          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion2(
              temp_person_detail._personID,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);
        }
      } else {
        // if temp_person is testator, ask parent question
        const temp_parent = state.temp_parent;
        temp_person.add_parent(temp_parent, true);
        const temp_parent_detail = Person.getPerson(temp_parent._id, state.personsMap)
        if (!alive) {
          state = {
            ...state,
            temp_person: temp_parent,
            parent_flag: "part1",
          }

          temp_parent_detail._deceased = true;
          const allChildrenID = this.getParentChildrenIDStrings(temp_parent._children, state)

          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion2(
              temp_parent_detail._personID,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);
          return this.returnState(state)
        }
        else {

          temp_parent_detail._deceased = false;

          if (temp_person._parents.length < 2) {
            state = {
              ...state,
              parent_flag: "part1",

            }
            const allParentsID = this.getParentChildrenIDStrings(temp_person._parents, state)
            // const temp_person_detail
            const newParentQuestion = this.createChatBotMessage(
              this.QuestionConsts.addParentsQuestion2(
                temp_person_detail._personID,
                allParentsID
              )
            );
            this.addMessageToBotState(newParentQuestion);
          } else {
            // TODO next question after parents
            this.closestSurvivingRelativeParents();
          }


        }
      }
      return this.returnState(state)
    })
  }

  handleGrandParentResponse = (grandParentResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      if (grandParentResponse === "") {
        const currentParentID = state.temp_person.getParentId();
        if (currentParentID) {
          const currentGrandParent = NodeEntity.getNode(currentParentID, state.nodeMap)
          if (currentGrandParent.getLatestPathKey() !== ParentChildSelector.parent) {
            if (currentGrandParent.getLatestPathKey() === ParentChildSelector.testator) {
              // ask grandparent question for next parent
              this.askForNextGrandParent()

            } else {
              // ask child question
              state = {
                ...state,
                temp_person: currentGrandParent,
                grandParent_flag: "part1",
              }
              const allChildrenID = this.getParentChildrenIDStrings(currentGrandParent._children, state)
              const newSuccessorQuestion = this.createChatBotMessage(
                this.QuestionConsts.addSuccessorQuestion2(
                  Person.getPerson(currentGrandParent._id, state.personsMap)._personID,
                  allChildrenID
                )
              );
              this.addMessageToBotState(newSuccessorQuestion);
            }


          } else {
            // add parent, here  currentParent = testator
            if (currentGrandParent._parents.length < 2) {
              state = {
                ...state,
                grandParent_flag: "part1",
                temp_person: currentGrandParent,
              }
              const allParentsID = this.getParentChildrenIDStrings(currentGrandParent._parents, state)

              const newParentQuestion = this.createChatBotMessage(
                this.QuestionConsts.addGrandParentsQuestion2(
                  Person.getPerson(currentParentID, state.personsMap)._personID,
                  allParentsID
                )
              );
              this.addMessageToBotState(newParentQuestion);
            } else {
              // TODO next question after parents
              this.askForNextGrandParent()
            }
          }
        } else {
          // TODO: validation part
          if (NodeEntity.getNode(state.person._id, state.nodeMap)._parents.length === 0) {
            state = {
              ...state,
              stepID: 14,
              grandParent_flag: "part1"
            };
            const newParentQuestion = this.createChatBotMessage(
              this.QuestionConsts.addParentsQuestion1(Person.getPerson(state.person._id, state.personsMap)._personID)
            );
            const newParentWarning = this.createChatBotMessage(<p>Empty value not allowed</p>)
            this.addMessageToBotState(newParentWarning)
            this.addMessageToBotState(newParentQuestion);
          }
          else {
            this.closestSurvivingRelativeParents();
          }
        }
      }
      else {
        const predecessor = this.createNewPerson(grandParentResponse, state);
        if (state.temp_person.getLatestPathKey() !== ParentChildSelector.parent) {
          state = {
            ...state,
            grandParent_flag: "part2",
            temp_child: predecessor,
          };
        } else {
          state = {
            ...state,
            grandParent_flag: "part2",
            temp_parent: predecessor,
          };
        }
        const aliveQuestion = this.createChatBotMessage(
          this.QuestionConsts.AliveQuestion(Person.getPerson(predecessor._id, state.personsMap)._personID),
          this.QuestionConsts.AliveWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);
      }
      return this.returnState(state)
    });

  }

  handleGrandParentAliveOption = (alive: string): void => {

    this.setState((state: ChatbotInterface) => {
      const temp_person = state.temp_person;

      if (temp_person.getLatestPathKey() !== ParentChildSelector.parent) {
        // if temp_person is not testator, ask child question
        const temp_child = state.temp_child
        temp_person.add_child(temp_child, true);
        const temp_child_detail = Person.getPerson(temp_child._id, state.personsMap)
        const temp_person_detail = Person.getPerson(temp_person._id, state.personsMap)
        if (!alive) {
          if (temp_child._path.length <= this.GRANDCHILDREN_PATH_LIMIT) {
            // if depth of grandparent's kids is less than 2 (PATH_LEVEL<=5)
            state = {
              ...state,
              temp_person: temp_child,
              grandParent_flag: "part1",
            }
            temp_child_detail._deceased = true;

            const newSuccessorQuestion = this.createChatBotMessage(
              this.QuestionConsts.addSuccessorQuestion1(
                temp_child_detail._personID
              )
            );
            this.addMessageToBotState(newSuccessorQuestion);
          }
          else {
            // if depth of grandparent's kids is more than 2 (PATH_LEVEL > 5)
            state = {
              ...state,
              grandParent_flag: "part1"
            }

            const allChildrenID = this.getParentChildrenIDStrings(temp_person._children, state)
            const newSuccessorQuestion = this.createChatBotMessage(
              this.QuestionConsts.addSuccessorQuestion2(
                temp_person_detail._personID,
                allChildrenID
              )
            );
            this.addMessageToBotState(newSuccessorQuestion);
          }
        }
        else {
          state = {
            ...state,
            grandParent_flag: "part1"
          }

          const allChildrenID = this.getParentChildrenIDStrings(temp_person._children, state)
          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion2(
              temp_person_detail._personID,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);
        }
      } else {
        // if temp_person is parent, ask next grandparent question
        const temp_parent = state.temp_parent;
        temp_person.add_parent(temp_parent, true, true);
        const temp_parent_detail = Person.getPerson(temp_parent._id, state.personsMap)
        if (!alive) {
          state = {
            ...state,
            temp_person: temp_parent,
            grandParent_flag: "part1",
          }

          temp_parent_detail._deceased = true;
          const allChildrenID = this.getParentChildrenIDStrings(temp_parent._children, state)
          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion2(
              temp_parent_detail._personID,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);

        }
        else {

          temp_parent_detail._deceased = false;

          if (temp_person._parents.length < 2) {
            state = {
              ...state,
              grandParent_flag: "part1",
            }
            const allGrandParentsID = this.getParentChildrenIDStrings(temp_person._parents, state)
            const newGrandParentQuestion = this.createChatBotMessage(
              this.QuestionConsts.addGrandParentsQuestion2(
                temp_parent_detail._personID,
                allGrandParentsID
              )
            );
            this.addMessageToBotState(newGrandParentQuestion);
          } else {
            // TODO next question after parents
            this.askForNextGrandParent()

          }
        }
      }
      return this.returnState(state)
    })
  }

  askForNextGrandParent = () => {
    this.setState((state: ChatbotInterface) => {
      if (state.deceasedParentsArray.length !== 0) {
        const grandParentQuestion1 = this.createChatBotMessage(this.QuestionConsts.addGrandParentsQuestion1(Person.getPerson(state.deceasedParentsArray[0], state.personsMap)._personID))
        state = {
          ...state,
          stepID: 14,
          grandParent_flag: "part1",
          temp_person: NodeEntity.getNode(state.deceasedParentsArray[0], state.nodeMap),
          deceasedParentsArray: state.deceasedParentsArray.filter(item => item !== state.deceasedParentsArray[0])
        }
        this.addMessageToBotState(grandParentQuestion1)
      }
      else {
        this.askFinalQuestion()
      }
      return this.returnState(state)
    })
  }

  // TODO check options
  handleMarriedParents = (marriedParentsResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      if (marriedParentsResponse) {
        this.set_spouse(state.person._parents[0], state.person._parents[1], true)
        this.askFinalQuestion()
      }
      else {
        this.grandParentFirst()
      }
      return this.returnState(state)
    })
  }
  // eslint-disable-next-line
  handleFinalQuestion = (finalOption: string): void => {
    this.setState((state: ChatbotInterface) => {
      console.log(state);
      return this.returnState(state)
    })
  }

  handleRearChildrenResult = (rearChildrenResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      state = {
        ...state,
        rearChildrenResponse: rearChildrenResponse
      }
      this.askFinalQuestion()
      return this.returnState(state)
    })

  };

  closestSurvivingRelativeChildren = () => {
    this.setState((state: ChatbotInterface) => {
      const testator = state.person
      const testatorDetail = Person.getPerson(testator._id, state.personsMap);
      const temp_class_testator = this.get_class_and_distance_closest_surviving_relative(state.testator, state)[0]

      if (state.person !== state.testator && state.testator._undividedEstateSpouse) {
        const temp_class_undivided_spouse = this.get_class_and_distance_closest_surviving_relative(this.getNode(state.testator._undividedEstateSpouse, state.nodeMap), state)[0]
        if (temp_class_testator && temp_class_testator !== 1) {
          state = {
            ...state,
            stepID: 8,
            parent_flag: "part1"
          };
          const newParentQuestion = this.createChatBotMessage(
            this.QuestionConsts.addParentsQuestion1(testatorDetail._personID)
          );
          this.addMessageToBotState(newParentQuestion);
          return this.returnState(state)
        }
        if (temp_class_undivided_spouse === undefined) {
          state.netWealth = state.netWealth + state.undividedEstate.undividedEstateSeparateWealth
          state.undividedEstate.undividedEstateSeparateWealth = 0
        }

        if (state.netWealth <= 0) {
          this.askFinalQuestion()
        }
        else {
          state.stepID = 4;
          const underAgeQuestion = this.createChatBotMessage(
            this.QuestionConsts.UnderAgeQuestion,
            this.QuestionConsts.UnderAgeWidgetOptions
          );
          this.addMessageToBotState(underAgeQuestion);
          return this.returnState(state)
        }
      }

      if (temp_class_testator === 1) {
        state = {
          ...state,
          stepID: 10,
        }
        const possiblyChildrenRearing = this.createChatBotMessage(this.QuestionConsts.RearChildrenQuestion, this.QuestionConsts.RearChildrenWidgetOptions)
        this.addMessageToBotState(possiblyChildrenRearing)
        return this.returnState(state)
      }

      if (testator._spouse !== null && state.netWealth <= this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS) {
        this.askFinalQuestion();
        return this.returnState(state)
      }

      if (testator._cohabitant !== null && state.netWealth <= this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS) {
        this.askFinalQuestion();
        return this.returnState(state)
      }
      state = {
        ...state,
        stepID: 8,
        parent_flag: "part1"
      };
      const newParentQuestion = this.createChatBotMessage(
        this.QuestionConsts.addParentsQuestion1(testatorDetail._personID)
      );
      this.addMessageToBotState(newParentQuestion);
      return this.returnState(state)
    });
  };

  getParentChildrenIDStrings = (collection: Array<number>, state: ChatbotInterface): ReactElement => {
    return <strong>{`{{ ${collection.map((child_id) => Person.getPerson(child_id, state.personsMap)._personID).join(', ')}}}`}</strong>
  }

  askFinalQuestion = (): void => {
    this.setState((state: ChatbotInterface) => {
      state = {
        ...state,
        stepID: -1,
      }
      const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
      this.addMessageToBotState(finalQuestion);
      return this.returnState(state)
    })

  }

  closestSurvivingRelativeParents = () => {
    this.setState((state: ChatbotInterface) => {
      if (state.person._spouse !== null) {
        this.askFinalQuestion()
        return this.returnState(state)
      }
      const temp_class = this.get_class_and_distance_closest_surviving_relative(state.person, state)[0]
      const eitherParentsDeceased = state.person._parents.filter(p_id => { return Person.getPerson(p_id, state.personsMap)._deceased }).length !== 0;
      const personDetail = Person.getPerson(state.person._id, state.personsMap)

      if (state.person !== state.testator && state.person._undividedEstateSpouse) {
        const temp_class_undivided_spouse = this.get_class_and_distance_closest_surviving_relative(this.getNode(state.person._undividedEstateSpouse, state.nodeMap), state)[0]
        if (temp_class_undivided_spouse === undefined) {
          state.netWealth = state.netWealth + state.undividedEstate.undividedEstateSeparateWealth
          state.undividedEstate.undividedEstateSeparateWealth = 0
        }

        if (state.netWealth <= 0) {
          this.askFinalQuestion()
        }
        else {
          this.setState((state: ChatbotInterface) => {
            state.stepID = 4;
          });
          const underAgeQuestion = this.createChatBotMessage(
            this.QuestionConsts.UnderAgeQuestion,
            this.QuestionConsts.UnderAgeWidgetOptions
          );
          this.addMessageToBotState(underAgeQuestion);
          return this.returnState(state)
        }
      }
      if (state.person._parents.length === 2 && eitherParentsDeceased && temp_class === 2) {
        const parent1Detail = Person.getPerson(state.person._parents[0], state.personsMap)
        const parent2Detail = Person.getPerson(state.person._parents[1], state.personsMap)
        if (!personDetail._underAge) {
          this.askFinalQuestion()
          return this.returnState(state)
        }
        if (state.person._parents.length !== 2) {
          this.askFinalQuestion()
          return this.returnState(state)
        }

        if (parent1Detail._deceased) {
          state = {
            ...state,
            stepID: 12
          }
          const marriedParentsQn = this.createChatBotMessage(this.QuestionConsts.MarriedParents1(parent1Detail._personID, parent2Detail._personID))
          this.addMessageToBotState(marriedParentsQn)
          return this.returnState(state)
        }
        else {
          state = {
            ...state,
            stepID: 12
          }
          const marriedParentsQn = this.createChatBotMessage(this.QuestionConsts.MarriedParents2(parent1Detail._personID, parent2Detail._personID))
          this.addMessageToBotState(marriedParentsQn)
          return this.returnState(state)
        }
      }
      else {
        this.grandParentFirst()
        return this.returnState(state)
      }
    });
  };

  grandParentFirst = () => {
    this.setState((state: ChatbotInterface) => {

      const testatorNode = NodeEntity.getNode(state.person._id, state.nodeMap);
      if (!state.deceasedParentsArray) state.deceasedParentsArray = []

      for (const parent_id of testatorNode._parents) {
        if (Person.getPerson(parent_id, state.personsMap)._deceased) {
          const temp_class = this.get_class_and_distance_closest_surviving_relative(NodeEntity.getNode(parent_id, state.nodeMap), state)[0]
          if (temp_class !== 1) {
            if (!state.deceasedParentsArray.includes(parent_id))
              state.deceasedParentsArray.push(parent_id)
          }
        }
      }
      if (state.deceasedParentsArray.length !== 0) {

        const grandParentQuestion1 = this.createChatBotMessage(this.QuestionConsts.addGrandParentsQuestion1(Person.getPerson(state.deceasedParentsArray[0], state.personsMap)._personID))
        state = {
          ...state,
          stepID: 14,
          grandParent_flag: "part1",
          temp_person: NodeEntity.getNode(state.deceasedParentsArray[0], state.nodeMap),
          deceasedParentsArray: state.deceasedParentsArray.filter(item => item !== state.deceasedParentsArray[0])
        }
        this.addMessageToBotState(grandParentQuestion1)
      }
      else {
        console.log("check situation if it arrives here");
        this.askFinalQuestion()
      }
      return this.returnState(state)
    })
  }


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
    this.setState((state: any) => ({
      ...state,
      tempMessages: state.messages
    }))
  };

  handleDefault = (): void => {
    const message = this.createChatBotMessage(this.QuestionConsts.DefaultText, {
      withAvatar: true,
    });

    this.addMessageToBotState(message);
  };

  createNewPerson = (personID: string, state: any) => {
    const newPerson = new Person(personID, this.generateNextID(state.id))
    state.personsMap.set(newPerson._id, newPerson)
    const newNode = new NodeEntity(newPerson._id, 0);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  }

  createTestator = (personID: string, state: any) => {
    const newPerson = new Person(personID, this.generateNextID(state.id))
    newPerson._deceased = true;
    state.personsMap.set(newPerson._id, newPerson)
    const newNode = new NodeEntity(newPerson._id, 0);
    newNode._path.push([ParentChildSelector.testator, newPerson._id]);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  }

  getPerson = (id: number, personMap: Map<number, Person>) => {
    const person: Person | undefined = personMap.get(id);
    if (person == undefined) {
      throw new Error("Person not found with given id:" + id);
    }
    return person;
  };

  getNode = (id: number, nodeMap: Map<number, NodeEntity>) => {
    const node: NodeEntity | undefined = nodeMap.get(id);
    if (node == undefined) {
      throw new Error("Node not found with given id:" + id);
    }
    return node;
  };

  generateNextID = (id: number) => {
    this.setState((state: any) => {
      state.id = state.id + 1
      return this.returnState(state)
    })
    return id;
  }

  set_spouse = (firstSpouse_id: number, secondSpouse_id: number, add_for_both: boolean): void => {
    this.setState((state: any) => {
      NodeEntity.getNode(firstSpouse_id, state.nodeMap)._spouse = secondSpouse_id
      if (add_for_both) {
        NodeEntity.getNode(secondSpouse_id, state.nodeMap)._spouse = firstSpouse_id
      }
      return this.returnState(state)
    })


  }

  surviving_successor_distance = (node: NodeEntity, state: any): number | undefined => {
    const nodeDetail: Person = Person.getPerson(node._id, state.personsMap)


    if (nodeDetail._deceased === false) return 0;
    else if (node._children.length === 0) return undefined;
    else {
      const possible_distances: Array<number> = [];
      for (const child_id of node._children) {
        const temp = this.surviving_successor_distance(NodeEntity.getNode(child_id, state.nodeMap), state);
        if (temp != undefined) {
          possible_distances.push(1 + temp);
        }
      }
      if (possible_distances.length === 0) return undefined;
      else return Math.min(...possible_distances);
    }
  };

  get_class_and_distance_closest_surviving_relative = (testatorNode: NodeEntity, state: any): [
    number | undefined,
    number | undefined
  ] => {
    const distance = this.surviving_successor_distance(testatorNode, state);
    if (distance !== undefined) return [1, distance];
    else if (testatorNode._parents.length == 0) return [undefined, undefined];
    else {
      const alternatives: Array<Array<number | undefined>> = [];
      for (const parent_id of testatorNode._parents) {
        alternatives.push(
          this.get_class_and_distance_closest_surviving_relative(NodeEntity.getNode(parent_id, state.nodeMap), state)
        );
      }

      alternatives.sort((a, b) => {
        if (a[0] != undefined && b[0] != undefined) return a[0] - b[0];
        if (a[0] == undefined && b[0] != undefined) return 1;
        return -1;
      });
      const [closest_alternative_class, closest_alternative_distance] =
        alternatives[0];

      if (closest_alternative_class == undefined) {
        return [undefined, undefined];
      }
      return [closest_alternative_class + 1, closest_alternative_distance];
    }
  };

  returnState = (state: any) => {
    this.check();
    this.glb_state = chartSelector(state);
    return state;
  }
  handleValidation = () => {
    this.setState((state: any) => {
      state.messages = state.tempMessages;
      return state;
    })
  }
  resetChatbot = () => {
    this.setState((state: any) => {
      state = {
        stepID: 0,
        person: new NodeEntity(0, 0),
        caseName: "",
        netWealth: 0,
        successor_flag: QuestionType.initialQuestion,
        parent_flag: QuestionType.initialQuestion,
        temp_person: new NodeEntity(0, 0),
        temp_child: new NodeEntity(0, 0),
        temp_parent: new NodeEntity(0, 0),
        personsMap: new Map(),
        nodeMap: new Map(),
        id: 1,
        deceasedParentsArray: [],
        grandParent_flag: QuestionType.initialQuestion,
        rearChildrenResponse: false,
        undividedEstate: {
          undividedEstateChoice: false,
          undivided_flag: QuestionType.initialQuestion,
          totalEstateValue: 0,
          undividedEstateSeparateWealth: 0,
          temp_first: 0,
          temp_last: 0,
        },
        messages: []
      }

      return this.returnState(state)
    });

    const initialQuestion = this.createChatBotMessage(this.QuestionConsts.CaseNameQuestion);
    this.addMessageToBotState(initialQuestion)


  }
}

export default ActionProvider;
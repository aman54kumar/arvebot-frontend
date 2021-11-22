// import * as HelperMethods from "./Helper/Methods/HelperMethods";
import QuestionConsts from "./Helper/Methods/QuestionConstants";
import InheritanceConstants from "./Helper/Methods/InheritanceConstants";
import Person, { ParentChildSelector } from "./Helper/Classes/Person";
import Family from "./Helper/Classes/Family";
import { ChatbotInterface, successor_parent_flag } from "./Generics";
import { ReactElement } from "react";
import { CurrencyOutput, ParseCurrencyStringForOutput } from "./Helper/Methods/HandleCurrency";
import InfoMessagesWidget from "./Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget"
import dtree from 'react-d3-tree'
import { NodeEntity } from "./Helper/Classes/NodeEntity";
// import axios from 'axios'

class ActionProvider {
  createChatBotMessage: (
    questionElement: ReactElement,
    widget?: Record<string, unknown>
  ) => ReactElement;
  setState: (state: unknown) => ChatbotInterface<NodeEntity>;
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
    createClientMessage: (messageElement: ReactElement) => any,
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

    this.setState((state: ChatbotInterface<NodeEntity>) => ({
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
    this.setState((state: ChatbotInterface<NodeEntity>) => ({
      ...state,
      stepID: 2,
      person: this.createTestator(testatorResponse, state),
    }));

    this.setState((state: ChatbotInterface<NodeEntity>) => ({

      ...state,
      temp_person: state.person,

      // state.person._path = [[ParentChildSelector.testator, state.person._id]]
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
    this.setState((state: ChatbotInterface<NodeEntity>) => ({
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
    const currencyStringResponse = ParseCurrencyStringForOutput(currencyIntResponse[1])
    const currencyJSX = <div>Amount Entered: <InfoMessagesWidget label={currencyStringResponse} /></div>

    if (currencyIntResponse[0] === 5) {

      const underAgeQuestion = this.createChatBotMessage(
        this.QuestionConsts.UnderAgeQuestion,
        this.QuestionConsts.UnderAgeWidgetOptions
      );
      const currencyCustom = this.createClientMessage(currencyJSX)
      this.addMessageToBotState(currencyCustom)

      this.setState((state: ChatbotInterface<NodeEntity>) => {
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
    this.setState((state: ChatbotInterface<NodeEntity>) => ({
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
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      const testator = this.getPerson(state.person._id, state.personsMap)
      if (spouseID !== "") {
        state = {
          ...state,
          stepID: 7,
          max_depth: null,
          successor_flag: "part1",
        };
        state.person._spouse = this.createNewPerson(spouseID, state)._id

        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(testator._personID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
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
    this.setState((state: ChatbotInterface<NodeEntity>) => {
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
        // state = {
        //   ...state,
        //   stepID: 7,
        //   person: { ...state.person, _cohabitant: this.createNewPerson(cohabitantID, state), },
        // };
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
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      if (child_id === "") {
        const currentParentID = state.temp_person.getParentId();
        if (currentParentID) {
          const currentParent = this.getNode(currentParentID, state.nodeMap)
          state = {
            ...state,
            temp_person: currentParent,
            successor_flag: "part1",
          }
          let allChildrenID = "";
          for (const child_id of currentParent._children) {
            allChildrenID += this.getPerson(child_id, state.personsMap)._personID + ", ";
          }
          allChildrenID =
            "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion2(
              this.getPerson(currentParent._id, state.personsMap)._personID,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);
        } else {
          this.closestSurvivingRelativeChildren()
        }

      } else {
        const child = this.createNewPerson(child_id, state);

        state = {
          ...state,
          successor_flag: "part2",
          temp_child: child,
        };
        const personId: any = this.getPerson(child._id, state.personsMap)?._personID
        const aliveQuestion = this.createChatBotMessage(
          this.QuestionConsts.AliveQuestion(personId),
          this.QuestionConsts.AliveWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);
      }
      return state;
    });
  };

  handleChildAliveOption = (alive: string): void => {
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      const child = state.temp_child;
      const temp_person: NodeEntity = state.temp_person

      temp_person.add_child(child, true);
      const childDetail = this.getPerson(child._id, state.personsMap)
      if (!alive) {

        childDetail.deceased = true;
        // child._deceased = true;

        state = {
          ...state,
          temp_person: child,
          successor_flag: "part1"
        }
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion1(
            childDetail._personID,
          )
        );
        this.addMessageToBotState(newSuccessorQuestion);
      }
      else {
        childDetail._deceased = false;
        state = {
          ...state,
          successor_flag: "part1"
        }
        let allChildrenID = "";
        for (const child_id of temp_person._children) {
          allChildrenID += this.getPerson(child_id, state.personsMap)._personID + ", ";
        }
        allChildrenID =
          "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
        const newSuccessorQuestion = this.createChatBotMessage(
          this.QuestionConsts.addSuccessorQuestion2(
            this.getPerson(temp_person._id, state.personsMap)._personID,
            allChildrenID
          )
        );
        this.addMessageToBotState(newSuccessorQuestion);
      }
      console.log(state);
      return state;
    });
  };


  handleParentsInput = (parentResponse: string): void => {
    const predecessor_id = parentResponse;
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      if (predecessor_id === "") {
        const currentParentID = state.temp_person.getParentId();
        if (currentParentID === state.person._id) {
          state.isChild = false;
        }
        if (state.isChild) {

          if (currentParentID) {
            const currentParent = this.getNode(currentParentID, state.nodeMap)
            state = {
              ...state,
              temp_person: currentParent,
              successor_flag: "part1",
            }
            let allChildrenID = "";
            for (const child_id of currentParent._children) {
              allChildrenID += this.getPerson(child_id, state.personsMap)._personID + ", ";
            }
            allChildrenID =
              "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
            const newSuccessorQuestion = this.createChatBotMessage(
              this.QuestionConsts.addSuccessorQuestion2(
                this.getPerson(currentParent._id, state.personsMap)._personID,
                allChildrenID
              )
            );
            this.addMessageToBotState(newSuccessorQuestion);
          } else {
            this.closestSurvivingRelativeChildren()
          }
        }
        else {

          if (currentParentID == null) {
            throw new Error('invalid case');
            // state = {
            //   ...state,
            //   temp_person: currentParent,
            //   parent_flag: "part1",
            // }
            // if (currentParent._id === state.person._id) {

            //   let allParentsID = "";
            //   for (const child of state.temp_person._children) {
            //     allParentsID += child._personID + ", ";
            //   }
            //   allParentsID =
            //     "{ " + allParentsID.slice(0, allParentsID.length - 2) + " }";
            //   const newParentsQuestion = this.createChatBotMessage(
            //     this.QuestionConsts.addParentsQuestion2(
            //       state.temp_person._personID,
            //       allParentsID
            //     )
            //   );
            //   this.addMessageToBotState(newParentsQuestion);
            // }
            // else {
            //   let allChildrenID = "";
            //   for (const child of state.temp_person._children) {
            //     allChildrenID += child._personID + ", ";
            //   }
            //   allChildrenID =
            //     "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
            //   const newSuccessorQuestion = this.createChatBotMessage(
            //     this.QuestionConsts.addSuccessorQuestion2(
            //       state.temp_person._personID,
            //       allChildrenID
            //     )
            //   );
            //   this.addMessageToBotState(newSuccessorQuestion);
            // }
          } else {
            this.closestSurvivingRelativeParents();
          }
        }


      }
      else {
        const predecessor = this.createNewPerson(predecessor_id, state);
        if (state.isChild) {
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
          this.QuestionConsts.AliveQuestion(this.getPerson(predecessor._id, state.personsMap)._personID),
          this.QuestionConsts.AliveWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);
      }
      return state;
    })
  }


  handleParentAliveOption = (alive: string): void => {
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      const temp_person = state.temp_person;
      if (state.isChild) {
        const temp_child = state.temp_child
        temp_person.add_child(temp_child, true);
        const temp_child_detail = this.getPerson(temp_child._id, state.personsMap)
        const temp_person_detail = this.getPerson(temp_person._id, state.personsMap)
        if (!alive) {
          state = {
            ...state,
            temp_person: temp_child,
            parent_flag: "part1",
            isChild: true
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
          let allChildrenID = "";
          for (const child_id of temp_person._children) {
            allChildrenID += this.getPerson(child_id, state.personsMap)._personID + ", ";
          }
          allChildrenID =
            "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";
          const newSuccessorQuestion = this.createChatBotMessage(
            this.QuestionConsts.addSuccessorQuestion2(
              temp_person_detail._personID,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);
        }
      } else {
        // when parent is alive
        const temp_parent = state.temp_parent;
        temp_person.add_parent(temp_parent, true);
        const temp_parent_detail = this.getPerson(temp_parent._id, state.personsMap)
        if (!alive) {
          state = {
            ...state,
            temp_person: temp_parent,
            parent_flag: "part1",
            isChild: true
          }

          temp_parent_detail._deceased = true;

          let allChildrenID = "";
          for (const child_id of temp_parent._children) {
            allChildrenID += this.getPerson(child_id, state.personsMap)._personID + ", ";
          }
          allChildrenID =
            "{ " + allChildrenID.slice(0, allChildrenID.length - 2) + " }";

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
              parent_flag: "part1",
              isChild: false

            }
            let allParentsID = "";
            for (const parent_id of temp_person._parents) {
              allParentsID += this.getPerson(parent_id, state.personsMap)._personID + ", ";
            }
            allParentsID =
              "{ " + allParentsID.slice(0, allParentsID.length - 2) + " }";
            const newParentQuestion = this.createChatBotMessage(
              this.QuestionConsts.addParentsQuestion2(
                temp_parent_detail._personID,
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
      console.log(state);

      return state
    })
  }


  handleMarriedParents = (marriedParentsResponse: boolean): void => {
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      if (marriedParentsResponse) {
        this.set_spouse(state.person._parents[0], state.person._parents[1], true)

        state = {
          ...state,
          stepID: 13
        }
        const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
        this.addMessageToBotState(finalQuestion)
      }
      else {
        // grandparentqn
      }
      return state
    })
  }

  handleFinalQuestion = (finalOption: string): void => {
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      console.log(finalOption);

      console.log(state);


      return state
    })
  }

  handleRearChildrenResult = (rearChildrenResponse: boolean): void => {
    this.setState((state: ChatbotInterface<NodeEntity>) => {

      state = {
        ...state,
        stepID: 13,
      }
      const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)

    })

  };

  closestSurvivingRelativeChildren = () => {
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      const testator = state.person
      const testatorDetail = this.getPerson(testator._id, state.personsMap);
      if (testatorDetail._deceased === true) {
        if (testator._children.length === 0) {
          // TODO: uncomment this
          // if (
          //   state.person.spouse !== undefined &&
          //   parseInt(state.netWealth.strValue) <=
          //   this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
          // ) {
          //   state = {
          //     ...state,
          //     stepID: 13,
          //   }
          // const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
          // this.addMessageToBotState(finalQuestion)
          // return state
          // }
          // else if (state.person.cohabitant !== undefined &&
          //   parseInt(state.netWealth.strValue) <=
          //   this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN) {
          //   state = {
          //     ...state,
          //     stepID: 13,
          //   }
          //   const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
          //   this.addMessageToBotState(finalQuestion)
          // return state
          // } else {
          state = {
            ...state,
            stepID: 8,
            parent_flag: "part1"
          };
          const newParentQuestion = this.createChatBotMessage(
            this.QuestionConsts.addParentsQuestion1(testatorDetail._personID)
          );
          this.addMessageToBotState(newParentQuestion);
          return state
          // }
        } else {
          state = {
            ...state,
            stepID: 10,
          }
          const possiblyChildrenRearing = this.createChatBotMessage(this.QuestionConsts.RearChildrenQuestion, this.QuestionConsts.RearChildrenWidgetOptions)
          this.addMessageToBotState(possiblyChildrenRearing)
        }
      }
      return state;
    });
  };
  closestSurvivingRelativeParents = () => {
    console.log('Parents completed')
    // let result = true;
    this.setState((state: ChatbotInterface<NodeEntity>) => {
      state = {
        ...state,
        stepID: 13
      }
      const finalQuestion = this.createChatBotMessage(this.QuestionConsts.FinalQuestion, this.QuestionConsts.FinalQuestionWidgetOptions)
      if (state.person._spouse !== null) {
        this.addMessageToBotState(finalQuestion)
        return state
      }

      const temp_class = this.get_class_and_distance_closest_surviving_relative(state.person, state)[0]
      const eitherParentsDeceased = state.person._parents.filter(p_id => { return this.getPerson(p_id, state.personsMap)._deceased }).length !== 0;
      const personDetail = this.getPerson(state.person._id, state.personsMap)
      const parent1Detail = this.getPerson(state.person._parents[0], state.personsMap)
      const parent2Detail = this.getPerson(state.person._parents[1], state.personsMap)
      if (state.person._parents.length === 2 && eitherParentsDeceased && temp_class === 2) {
        if (!personDetail._underAge) {
          state = {
            ...state,
            stepID: 13
          }
          this.addMessageToBotState(finalQuestion);
          return state
        }
        if (state.person._parents, length !== 2) {
          state = {
            ...state,
            stepID: 13
          }
          this.addMessageToBotState(finalQuestion);
          return state
        }

        if (parent1Detail._deceased) {
          state = {
            ...state,
            stepID: 12
          }
          const marriedParentsQn = this.createChatBotMessage(this.QuestionConsts.MarriedParents1(parent1Detail._personID, parent2Detail._personID))
          this.addMessageToBotState(marriedParentsQn)
          return
        }
        if (parent2Detail._deceased) {
          state = {
            ...state,
            stepID: 12
          }
          const marriedParentsQn = this.createChatBotMessage(this.QuestionConsts.MarriedParents2(parent1Detail._personID, parent2Detail._personID))
          this.addMessageToBotState(marriedParentsQn)
          return
        }
      }

        // grandParent
     
      return state;
    });
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

  createNewPerson = (personID: string, state: any) => {
    const newPerson = new Person(personID, this.generateNextID(state.id))
    state.personsMap.set(newPerson._id, newPerson)
    const newNode = new NodeEntity(newPerson._id, state.level);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  }
  createTestator = (personID: string, state: any) => {
    const newPerson = new Person(personID, this.generateNextID(state.id))
    newPerson._deceased = true;
    state.personsMap.set(newPerson._id, newPerson)
    const newNode = new NodeEntity(newPerson._id, state.level);
    newNode._path.push([ParentChildSelector.testator, state.person._id]);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  }

  generateNextID = (id: number) => {
    this.setState((state: any) => {
      state.id = state.id + 1
      return state
    })
    return id;
  }
  getPerson = (id: number, personMap: Map<number, Person>) => {
    const person: Person | undefined = personMap.get(id);
    if (person == undefined) {
      throw new Error('Person not found with given id:' + id);
    }
    return person;
  }
  getNode = (id: number, nodeMap: Map<number, NodeEntity>) => {
    const node: NodeEntity | undefined = nodeMap.get(id);
    if (node == undefined) {
      throw new Error('Node not found with given id:' + id);
    }
    return node;
  }

  set_spouse = (firstSpouse_id: number, secondSpouse_id: number, add_for_both: boolean): void => {
    this.setState((state: any) => {
      this.getNode(firstSpouse_id, state.nodeMap)._spouse = secondSpouse_id
      if (add_for_both) {
        this.getNode(secondSpouse_id, state.nodeMap)._spouse = firstSpouse_id
      }
      return state
    })


  }
  surviving_successor_distance = (node: NodeEntity, state: any): number | undefined => {
    const nodeDetail: Person = this.getPerson(node._id, state.personsMap)
    if (nodeDetail._deceased === false) return 0;
    else if (node._children.length === 0) return undefined;
    else {
      const possible_distances: Array<number> = [];
      for (const child_id of node._children) {
        const temp = this.surviving_successor_distance(this.getNode(child_id, state.personsMap), state);
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
          this.get_class_and_distance_closest_surviving_relative(this.getNode(parent_id, state.nodeMap), state)
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

  resetChatbot = () => {
    this.setState((state: any) => {
      state = {
        stepID: 0,
        person: new Person(""),
        caseName: "",
        netWealth: { intValue: 0, strValue: "" },
        undividedEstate: false,
        max_depth: null,
        successor_flag: successor_parent_flag.none,
        parent_flag: successor_parent_flag.none,
        temp_person: new NodeEntity(0, 0),
        temp_child: new NodeEntity(0, 0),
        temp_parent: new NodeEntity(0, 0),
        isChild: false,
        personsMap: new Map(),
        level: 0,
        nodeMap: new Map(),
        id: 1,
        messages: []
      }
      return state
    });

    const initialQuestion = this.createChatBotMessage(this.QuestionConsts.CaseNameQuestion);
    this.addMessageToBotState(initialQuestion)


  }
}

export default ActionProvider;

/**
 * * this code is for processing currency numbers to format: kr 123.456
//  * ? const finalCurrency = new Intl.NumberFormat("nb-NB", {
 * ? style: "currency",
 * ? currency: "NOK",
 * ? currencyDisplay: "narrowSymbol",
 * ? }).format(outputCurrency);*/
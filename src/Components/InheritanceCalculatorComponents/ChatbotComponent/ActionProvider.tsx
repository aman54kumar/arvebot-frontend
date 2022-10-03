import Person from "./Helper/Classes/Person";
import { ParentChildSelector } from "./Helper/Enums/ParentChildSelector";
import { ChatbotInterface, InitialChatbotState } from "./Generics";
import {
  ChatStepTypes,
  QuestionType,
  undividedOwnershipType,
} from "./Helper/Enums/ChatStepTypes";
import { ReactElement } from "react";
import {
  CurrencyOutput,
  ParseCurrencyStringForOutput,
} from "./Helper/Methods/HandleCurrency";
import InfoMessagesWidget from "./Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget";
import { NodeEntity } from "./Helper/Classes/NodeEntity";
import chartSelector from "../../../store/chartSelector";
import { messageService } from "./services/ChatbotCommunicator";
import { InheritanceCalculation } from "../Reports/InheritanceCalculation";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import ReactPDF from '@react-pdf/renderer';
import FinalDocument from "../Reports/PDF/FinalDocument";
import { PliktdelsarvCalculation } from "../Reports/PliktdelsarvCalculation";
import { PDFViewer } from "@react-pdf/renderer";
import {
  delvisFirstResponse,
  delvisFulltResponse,
  delvisSecondResponse,
  handleUndividedStep,
  totalEstateValue,
  undividedEstateChoice,
  undividedEstateSpouse,
  undividedOwnershipResponse,
} from "./ActionProviderMethods/HandleUndividedEstate";
import QuestionConstants from "./Helper/Methods/QuestionConstants";
import InheritanceConstants from "./Helper/Methods/InheritanceConstants";

class ActionProvider {
  createChatBotMessage: (
    questionElement: ReactElement,
    widget?: Record<string, unknown>
  ) => ReactElement;
  setState: (state: unknown) => ChatbotInterface;
  createClientMessage: (messageElement: ReactElement) => ReactElement<any, any>;
  stateRef: any;
  checkstate: any = null;
  isStarted = true;
  glb_state: any = null;
  GRANDCHILDREN_PATH_LIMIT = 4;
  constructor(
    createChatBotMessage: (
      questionElement: ReactElement,
      widget?: Record<string, unknown>
    ) => ReactElement,
    setStateFunc: (state: any) => any,
    createClientMessage: (messageElement: ReactElement) => any,
    stateRef: any
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    // this.setRevertListeners()
  }

  setRevertListeners() {
    messageService.clearAllInternalSubscription();
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const subscription = messageService
      .getMessageInChatbot()
      .subscribe((message) => {
        this.revertState();
      });
    messageService.addInternalSubscription(subscription);
  }
  revertState = () => {
    const revertCount = localStorage.getItem("revertCount");
    let lastState: any;
    if (revertCount) {
      lastState = messageService.getPreviousState(parseInt(revertCount));
    } else {
      lastState = messageService.getPreviousState(0);
    }

    if (lastState) {
      if (revertCount) {
        localStorage.setItem(
          "revertCount",
          (parseInt(revertCount) + 1).toString()
        );
      } else {
        localStorage.setItem("revertCount", "1");
      }
      this.setState((state: any) => {
        state = lastState;
        return this.returnState(state);
      });
    }
  };
  // setPreviousStateData = (currentState: any, lastState: any) => {
  //
  // }

  handleTestator = (testatorResponse: string): void => {
    /**
     *  * function for handling personID replies.
     *  * stepID is updated to 2 and then proceed to wealth question.
     *  * open reply, no conditions for now.
     */

    const undividedEstateQuestion = this.createChatBotMessage(
      QuestionConstants.UndividedEstateQuestion,
      QuestionConstants.YesNoWidgetOptions
    );
    this.setState((state: ChatbotInterface) => ({
      ...state,
      stepID: ChatStepTypes.testatorStep,
      testator: this.createTestator(testatorResponse, state),
    }));
    this.setState((state: ChatbotInterface) => ({
      ...state,
    }));

    this.addMessageToBotState(undividedEstateQuestion);
  };

  handleUndividedEstateChoice = (
    undividedEstateChoiceResponse: boolean
  ): void => {
    // TODO: implement Yes/No conditions for undivided states.
    // TODO: need to fix the values in object and correctly implement the whole algorithm
    // TODO: check for correct text for the questions. (last step, the format of questions already available)
    this.setState((state: ChatbotInterface) => {
      return undividedEstateChoice(undividedEstateChoiceResponse, state, this);
    });
  };

  handleTotalEstateValueResponse = (totalEstateValueResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      return totalEstateValue(totalEstateValueResponse, state, this);
    });
  };

  handleOwnershipResponse = (ownershipResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      return undividedOwnershipResponse(ownershipResponse, state, this);
    });
  };

  handleDelvisFirstResponse = (res: string): void => {
    this.setState((state: ChatbotInterface) => {
      return delvisFirstResponse(res, state, this);
    });
  };

  handleDelvisSecondResponse = (res: string): void => {
    this.setState((state: ChatbotInterface) => {
      return delvisSecondResponse(res, state, this);
    });
  };

  handleFulltSaereieResponse = (res: string): void => {
    this.setState((state: ChatbotInterface) => {
      return delvisFulltResponse(res, state, this);
    });
  };

  handleUndividedEstateSpouse = (res: string): void => {
    this.setState((state: ChatbotInterface) => {
      return undividedEstateSpouse(res, state, this);
    });
  };

  handleNetWealth(currencyResponse: string): void {
    /**
     *  * function for handling wealth replies.
     *  * stepID is updated to 3 and then proceed to underage question.
     *  * conditions for reply in currencyDisplayValue function.
     */
    this.setState((state: ChatbotInterface) => {
      const netWealthQuestion = this.createChatBotMessage(
        QuestionConstants.NetWealthQuestion
      );
      const currencyIntResponse = CurrencyOutput(currencyResponse);
      const currencyStringResponse = ParseCurrencyStringForOutput(
        currencyIntResponse[1]
      );
      const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
      if (currencyIntResponse[0] === 5) {
        const underAgeQuestion = this.createChatBotMessage(
          QuestionConstants.UnderAgeQuestion,
          QuestionConstants.YesNoWidgetOptions
        );
        const currencyCustom = this.createClientMessage(currencyJSX);
        this.addMessageToBotState(currencyCustom);

        state = {
          ...state,
          stepID: ChatStepTypes.underAgeStep,
          netWealth: parseInt(currencyIntResponse[1]),
        };
        if (state.netWealth <= 0) {
          this.askFinalQuestion();
        }
        this.addMessageToBotState(underAgeQuestion);
      } else {
        const netWealthWarning = this.createChatBotMessage(
          QuestionConstants.NetWealthWarning
        );

        this.addMessageToBotState(netWealthWarning);
        this.addMessageToBotState(netWealthQuestion);
      }

      return this.returnState(state);
    });
  }

  handleUnderAge = (selectedOption: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      state.person = state.testator;
      state.temp_person = state.testator;
      this.getPerson(state.person._id, state.personsMap)._underAge =
        selectedOption;
      if (selectedOption) {
        const cohabitantChoiceQuestion = this.createChatBotMessage(
          QuestionConstants.CohabitantChoiceQuestion,
          QuestionConstants.YesNoWidgetOptions
        );
        state = {
          ...state,
          stepID: ChatStepTypes.cohabitantChoice,
        };
        this.addMessageToBotState(cohabitantChoiceQuestion);

        return this.returnState(state);
      }

      const spouseChoiceQuestion = this.createChatBotMessage(
        QuestionConstants.SpouseChoiceQuestion,
        QuestionConstants.YesNoWidgetOptions
      );
      state = {
        ...state,
        stepID: ChatStepTypes.spouseChoice,
      };
      this.addMessageToBotState(spouseChoiceQuestion);

      return this.returnState(state);
    });
  };

  handleSpouseChoice = (spouseChoice: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      // Spouse present
      if (spouseChoice) {
        state.stepID = ChatStepTypes.spouseStep;

        const spouseQuestion = this.createChatBotMessage(
          QuestionConstants.SpouseQuestion
        );
        this.addMessageToBotState(spouseQuestion);
      }
      // No spouse
      else {
        const testator = Person.getPerson(state.person._id, state.personsMap);
        // is Adult, then ask for cohabitant
        if (!testator._underAge && testator.spouse === undefined) {
          state = {
            ...state,
            stepID: ChatStepTypes.cohabitantChoice,
          };
          const cohabitantChoiceQuestion = this.createChatBotMessage(
            QuestionConstants.CohabitantChoiceQuestion,
            QuestionConstants.YesNoWidgetOptions
          );
          this.addMessageToBotState(cohabitantChoiceQuestion);
        } else {
          state = {
            ...state,
            stepID: ChatStepTypes.successorStep,
            successor_flag: QuestionType.part3,
          };
          const newSuccessorQuestion = this.createChatBotMessage(
            QuestionConstants.addSuccessorCount(testator._personName)
          );
          this.addMessageToBotState(newSuccessorQuestion);
        }
      }
      return this.returnState(state);
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
      const testator = Person.getPerson(state.person._id, state.personsMap);
      const newSpouse = this.createNewPerson(spouseID, state);
      state.person._spouse = newSpouse._id;
      state.person.setPathforPartner(ParentChildSelector.spouse, newSpouse);
      if (
        state.netWealth <=
        InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
      ) {
        state = {
          ...state,
          stepID: ChatStepTypes.rearChildrenStep,
        };
        this.askFinalQuestion();
        return this.returnState(state);
      }

      state = {
        ...state,
        stepID: ChatStepTypes.successorStep,
        successor_flag: QuestionType.part3,
      };
      state.testator._partnerNode = newSpouse._id;
      const newSuccessorQuestion = this.createChatBotMessage(
        QuestionConstants.addSuccessorCount(testator._personName)
      );
      this.addMessageToBotState(newSuccessorQuestion);
      return this.returnState(state);
    });
  };

  handleCohabitantChoice = (cohabitantChoiceResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      // if cohabitant choice is yes
      if (cohabitantChoiceResponse) {
        state = {
          ...state,
          stepID: ChatStepTypes.cohabitantStep,
        };
        const cohabitantQuestion = this.createChatBotMessage(
          QuestionConstants.CohabitantQuestion
        );
        this.addMessageToBotState(cohabitantQuestion);
      }
      // if cohabitant choice is no
      else {
        state = {
          ...state,
          stepID: ChatStepTypes.successorStep,
          successor_flag: QuestionType.part3,
        };
        const testator = Person.getPerson(state.person._id, state.personsMap);
        const newSuccessorQuestion = this.createChatBotMessage(
          QuestionConstants.addSuccessorCount(testator._personName)
        );
        this.addMessageToBotState(newSuccessorQuestion);
      }
      return this.returnState(state);
    });
  };

  handleCohabitantInput = (cohabitantResponse: string): void => {
    /**
     *  * function for handling cohabitant replies.
     *  * stepID is updated to 7 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    // NodeEntity.setPathforPartner(ParentChildSelector.cohabitant, state.person._cohabitant)
    const cohabitantID = cohabitantResponse;
    this.setState((state: ChatbotInterface) => {
      const testator = Person.getPerson(state.person._id, state.personsMap);
      const newCohabitant = this.createNewPerson(cohabitantID, state);
      state.person._cohabitant = newCohabitant._id;
      state.person.setPathforPartner(
        ParentChildSelector.cohabitant,
        newCohabitant
      );

      if (
        state.netWealth <=
        InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
      ) {
        state = {
          ...state,
          stepID: ChatStepTypes.rearChildrenStep,
        };
        this.askFinalQuestion();
        return this.returnState(state);
      }
      state = {
        ...state,
        stepID: ChatStepTypes.successorStep,
        successor_flag: QuestionType.part3,
      };
      const newSuccessorQuestion = this.createChatBotMessage(
        QuestionConstants.addSuccessorCount(testator._personName)
      );
      this.addMessageToBotState(newSuccessorQuestion);
      return this.returnState(state);
    });
  };

  handleSuccessorCount(message: string): void {
    const successorCount = parseInt(message);
    this.setState((state: ChatbotInterface) => {
      state.temp_person._childCount = successorCount;
      if (successorCount === 0) {
        const parentID = state.temp_person.getParentId(state.nodeMap);
        if (parentID) {
          const parent = this.getNode(parentID, state.nodeMap);
          state.temp_person = parent;
          const successorProcessArray = state.successorProcessArray;
          this.handleNoSuccessorCase(state, successorProcessArray);
        } else {
          this.handleClosingStep(state);
        }
        return this.returnState(state);
      }

      const questionType = state.temp_person._children.length === 0;
      let itr_id = state.id;
      for (let i = 0; i < state.temp_person._childCount; i++) {
        const child = this.createEmptyNode(state, itr_id++);
        state.temp_person.add_child(child, true);
        if (state.temp_person._partnerNode !== null) {
          const currentPartnerNode = this.getNode(
            state.temp_person._partnerNode,
            state.nodeMap
          );
          currentPartnerNode.add_child(child, true, true);
        }
      }
      state.id = itr_id;
      if (
        state.successorProcessArray.filter(
          (t) => t[0] === state.temp_person._level
        ).length === 0
      ) {
        state.successorProcessArray.push([state.temp_person._level, 1]);
      }

      state.successor_flag = QuestionType.part1;
      const personName = this.getPerson(
        state.temp_person._id,
        state.personsMap
      )._personName;
      if (questionType) {
        const newSuccessorQuestion = this.createChatBotMessage(
          QuestionConstants.addSuccessorQuestion1(personName)
        );
        this.addMessageToBotState(newSuccessorQuestion);
      } else {
        const allChildrenID = this.getParentChildrenIDStrings(
          state.temp_person._children,
          state
        );
        const newSuccessorQuestion = this.createChatBotMessage(
          QuestionConstants.addSuccessorQuestion2(personName, allChildrenID)
        );
        this.addMessageToBotState(newSuccessorQuestion);
      }
      return this.returnState(state);
    });
  }
  handleSuccessorInput = (successorResponse: string): void => {
    const child_name = successorResponse;
    this.setState((state: ChatbotInterface) => {
      const childID = state.temp_person.getChildUnprocessedNode();
      if (childID) {
        const child = this.getNode(childID, state.nodeMap);
        const childDetail = this.getPerson(childID, state.personsMap);
        childDetail._personName = child_name;
        state = {
          ...state,
          successor_flag: QuestionType.part2,
          temp_child: child,
        };

        const personId: any = Person.getPerson(
          child._id,
          state.personsMap
        )?._personName;
        const aliveQuestion = this.createChatBotMessage(
          QuestionConstants.AliveQuestion(personId),
          QuestionConstants.YesNoWidgetOptions
        );
        this.addMessageToBotState(aliveQuestion);
        // }
        return this.returnState(state);
      } else {
        // error case
        console.log("Count of children exceeded");
      }
    });
  };

  handleChildAliveOption = (alive: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      const child = state.temp_child;
      const childDetail = this.getPerson(child._id, state.personsMap);
      // const temp_person: NodeEntity = state.temp_person
      const successorProcessArray = state.successorProcessArray;
      if (alive) {
        childDetail._deceased = false;
        this.handleNoSuccessorCase(state, successorProcessArray);
      } else {
        // not alive
        childDetail._deceased = true;
        if (state.stepID === ChatStepTypes.grandParentStep) {
          const generationCount = child.getGenerationCount();
          if (generationCount === 2) {
            this.handleNoSuccessorCase(state, successorProcessArray);
            return this.returnState(state);
          }
        }
        state = {
          ...state,
          successor_flag: QuestionType.part3,
          temp_person: child,
        };
        const newSuccessorQuestion = this.createChatBotMessage(
          QuestionConstants.addSuccessorCount(childDetail._personName)
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      }
      return this.returnState(state);
    });
  };

  handleNoSuccessorCase = (
    state: ChatbotInterface,
    successorProcessArray: Array<[number, number]>
  ) => {
    const childItrPos =
      successorProcessArray[successorProcessArray.length - 1][1];
    if (childItrPos) {
      if (state.temp_person._childCount > childItrPos) {
        successorProcessArray[successorProcessArray.length - 1][1] =
          childItrPos + 1;
        // ask childid question
        state.successor_flag = QuestionType.part1;
        const allChildrenID = this.getParentChildrenIDStrings(
          state.temp_person._children,
          state
        );
        const newSuccessorQuestion = this.createChatBotMessage(
          QuestionConstants.addSuccessorQuestion2(
            this.getPerson(state.temp_person._id, state.personsMap)._personName,
            allChildrenID
          )
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      } else if (state.temp_person._childCount === childItrPos) {
        let currentParentID = state.temp_person._id;
        let currentParent = NodeEntity.getNode(currentParentID, state.nodeMap);

        let isCurrentParentID = true;
        while (
          successorProcessArray[successorProcessArray.length - 1][1] ===
          currentParent._childCount
        ) {
          successorProcessArray.pop();
          // current parent update
          const currentId = currentParent.getParentId(state.nodeMap);
          if (currentId) {
            currentParentID = currentId;
            currentParent = NodeEntity.getNode(currentParentID, state.nodeMap);
          } else {
            isCurrentParentID = false;
            break;
          }
        }

        if (!isCurrentParentID) {
          // exit case
          this.handleClosingStep(state);
        } else {
          successorProcessArray[successorProcessArray.length - 1][1] =
            successorProcessArray[successorProcessArray.length - 1][1] + 1;
          // ask childid question
          state.temp_person = currentParent;
          const currentParentDetail = this.getPerson(
            currentParentID,
            state.personsMap
          );
          state.successor_flag = QuestionType.part1;
          const allChildrenID = this.getParentChildrenIDStrings(
            currentParent._children,
            state
          );
          const newSuccessorQuestion = this.createChatBotMessage(
            QuestionConstants.addSuccessorQuestion2(
              currentParentDetail._personName,
              allChildrenID
            )
          );
          this.addMessageToBotState(newSuccessorQuestion);
          return this.returnState(state);
        }
      } else {
        throw new Error("state.temp_person._childCount < childItrPos case");
      }
    } else {
      throw new Error("childItrPos is null");
    }
  };

  handleSecondParentExists = (secondParentChoice: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      if (secondParentChoice) {
        const temp_person = state.temp_person;
        state = {
          ...state,
          parent_flag: QuestionType.part1,
        };
        const allParentsID = this.getParentChildrenIDStrings(
          temp_person._parents,
          state
        );
        const temp_person_detail = this.getPerson(
          temp_person._id,
          state.personsMap
        );
        const newParentQuestion = this.createChatBotMessage(
          QuestionConstants.addParentsQuestion2(
            temp_person_detail._personName,
            allParentsID
          )
        );
        this.addMessageToBotState(newParentQuestion);
      } else {
        this.handleClosingStep(state, false);
        // if (state.stepID !== ChatStepTypes.grandParentStep) {
        //   this.closestSurvivingRelativeParents(false);
        // } else {
        //   this.closestSurvivingRelativeGrandParents(false);
        // }
      }
      return this.returnState(state);
    });
  };

  handleParentsInput = (parentResponse: string): void => {
    const predecessor_id = parentResponse;
    this.setState((state: ChatbotInterface) => {
      const predecessor = this.createNewPerson(predecessor_id, state);
      state = {
        ...state,
        parent_flag: QuestionType.part2,
        temp_parent: predecessor,
      };

      state.temp_person.add_parent(predecessor, true);

      const aliveQuestion = this.createChatBotMessage(
        QuestionConstants.AliveQuestion(
          Person.getPerson(predecessor._id, state.personsMap)._personName
        ),
        QuestionConstants.YesNoWidgetOptions
      );
      this.addMessageToBotState(aliveQuestion);

      return this.returnState(state);
    });
  };

  handleParentAliveOption = (alive: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      const temp_parent = state.temp_parent;
      const temp_parent_detail = Person.getPerson(
        temp_parent._id,
        state.personsMap
      );
      if (!alive) {
        temp_parent_detail._deceased = true;
        state = {
          ...state,
          temp_person: temp_parent,
          successor_flag: QuestionType.part3,
        };
        temp_parent._processChildNodePos += 1;
        const allChildrenID = this.getParentChildrenIDStrings(
          temp_parent._children,
          state
        );
        const newSuccessorQuestion = this.createChatBotMessage(
          QuestionConstants.addSuccessorOfParentCount(
            temp_parent_detail._personName,
            allChildrenID
          )
        );
        this.addMessageToBotState(newSuccessorQuestion);
        return this.returnState(state);
      } else {
        temp_parent_detail._deceased = false;
        this.handleClosingStep(state);
        // if (state.stepID !== ChatStepTypes.grandParentStep) {
        //   this.closestSurvivingRelativeParents();
        // } else {
        //   this.closestSurvivingRelativeGrandParents();
        // }
      }
      return this.returnState(state);
    });
  };

  grandParentFirst = () => {
    this.setState((state: ChatbotInterface) => {
      const testatorNode = NodeEntity.getNode(state.person._id, state.nodeMap);
      if (!state.deceasedParentsArray) state.deceasedParentsArray = [];

      for (const parent_id of testatorNode._parents) {
        if (Person.getPerson(parent_id, state.personsMap)._deceased) {
          const temp_class =
            this.get_class_and_distance_closest_surviving_relative(
              NodeEntity.getNode(parent_id, state.nodeMap),
              state
            )[0];
          if (temp_class !== 1) {
            if (!state.deceasedParentsArray.includes(parent_id))
              state.deceasedParentsArray.push(parent_id);
          }
        }
      }
      if (state.deceasedParentsArray.length !== 0) {
        const temp_person = this.getNode(
          state.deceasedParentsArray[0],
          state.nodeMap
        );
        const temp_person_detail = this.getPerson(
          state.deceasedParentsArray[0],
          state.personsMap
        );
        state = {
          ...state,
          stepID: ChatStepTypes.grandParentStep,
          parent_flag: QuestionType.part1,
          temp_person: temp_person,
          successor_flag: QuestionType.initialQuestion,
        };
        const newParentQuestion = this.createChatBotMessage(
          QuestionConstants.addParentsQuestion1(temp_person_detail._personName)
        );
        this.addMessageToBotState(newParentQuestion);
      } else {
        console.log("check situation if it arrives here");
        this.askFinalQuestion();
      }
      return this.returnState(state);
    });
  };
  askForNextGrandParent = () => {
    this.setState((state: ChatbotInterface) => {
      if (state.deceasedParentsArray.length !== 0) {
        const temp_person = this.getNode(
          state.deceasedParentsArray[0],
          state.nodeMap
        );
        const temp_person_detail = this.getPerson(
          state.deceasedParentsArray[0],
          state.personsMap
        );
        state = {
          ...state,
          stepID: ChatStepTypes.grandParentStep,
          parent_flag: QuestionType.part1,
          temp_person: temp_person,
          successor_flag: QuestionType.initialQuestion,
        };
        const newParentQuestion = this.createChatBotMessage(
          QuestionConstants.addParentsQuestion1(temp_person_detail._personName)
        );
        this.addMessageToBotState(newParentQuestion);
      } else {
        this.askFinalQuestion();
      }
      return this.returnState(state);
    });
  };

  // TODO check options
  handleMarriedParents = (marriedParentsResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      if (marriedParentsResponse) {
        this.set_spouse(
          state.person._parents[0],
          state.person._parents[1],
          true
        );
        this.askFinalQuestion();
      } else {
        this.grandParentFirst();
      }
      return this.returnState(state);
    });
  };
  // eslint-disable-next-line
  handleFinalQuestion = (finalOption: boolean): any => {
    this.setState((state: ChatbotInterface) => {
      if (finalOption) {
        const inheritanceCalculation = new InheritanceCalculation(
          state.person,
          this,
          state
        );
        inheritanceCalculation.computeInheritance();
        inheritanceCalculation.computeGenealogyInheritance(state.testator._id);

        const pliktdelsarvCalculation = new PliktdelsarvCalculation(
          state.person,
          this,
          state
        );
        pliktdelsarvCalculation.computeInheritance();
        pliktdelsarvCalculation.computeGenealogyInheritance(state.testator._id);
        const document = (
          <FinalDocument
            inputData={{
              inheritanceCalculation: inheritanceCalculation,
              pliktdelsarvCalculation: pliktdelsarvCalculation,
            }}
          />
        );

        const pdfDownloadLink = (
          <div>
            <PDFDownloadLink document={document} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          </div>
        );
        const pdfLink = this.createChatBotMessage(pdfDownloadLink);
        this.addMessageToBotState(pdfLink);

        console.log("prepare report and download");
      } else {
        console.log("retry");
      }
      return this.returnState(state);
    });
  };

  handleRearChildrenResult = (rearChildrenResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      state = {
        ...state,
        rearChildrenResponse: rearChildrenResponse,
      };
      this.askFinalQuestion();
      return this.returnState(state);
    });
  };
  handleClosingStep = (state: ChatbotInterface, isTwoParent = true) => {
    switch (state.stepID) {
      case ChatStepTypes.successorStep:
        this.closestSurvivingRelativeChildren();
        break;
      case ChatStepTypes.parentsStep:
        state.temp_person = state.person;
        this.closestSurvivingRelativeParents(isTwoParent);
        break;
      case ChatStepTypes.undividedEstateStep:
        state.temp_person = state.person;
        handleUndividedStep(state, this, isTwoParent);
        break;
      case ChatStepTypes.grandParentStep:
        state.temp_person = this.getNode(
          state.deceasedParentsArray[0],
          state.nodeMap
        );
        this.closestSurvivingRelativeGrandParents(isTwoParent);
        break;

      case ChatStepTypes.testatorOtherChildStep:
        this.askUnderAgeQuestion();
    }
  };

  askUnderAgeQuestion = () => {
    this.setState((state: ChatbotInterface) => {
      state.stepID = ChatStepTypes.underAgeStep;
      const underAgeQuestion = this.createChatBotMessage(
        QuestionConstants.UnderAgeQuestion,
        QuestionConstants.YesNoWidgetOptions
      );
      this.addMessageToBotState(underAgeQuestion);
      return this.returnState(state);
    });
  };
  closestSurvivingRelativeChildren = () => {
    this.setState((state: ChatbotInterface) => {
      const testator = state.person;
      const testatorDetail = Person.getPerson(testator._id, state.personsMap);
      const temp_class_testator =
        this.get_class_and_distance_closest_surviving_relative(
          state.testator,
          state
        )[0];

      if (
        state.person !== state.testator &&
        state.testator._undividedEstateSpouse
      ) {
        if (!(temp_class_testator && temp_class_testator !== 1)) {
          state = {
            ...state,
            parent_flag: QuestionType.part1,
            successor_flag: QuestionType.initialQuestion,
            isUndividedParent: true,
          };
          const newParentQuestion = this.createChatBotMessage(
            QuestionConstants.addParentsQuestion1(testatorDetail._personName)
          );
          this.addMessageToBotState(newParentQuestion);
          return this.returnState(state);
        }
      }

      if (temp_class_testator === 1) {
        state = {
          ...state,
          stepID: ChatStepTypes.rearChildrenStep,
        };

        this.askFinalQuestion();
        return this.returnState(state);
      }

      if (
        testator._spouse !== null &&
        state.netWealth <=
          InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS
      ) {
        this.askFinalQuestion();
        return this.returnState(state);
      }

      if (
        testator._cohabitant !== null &&
        state.netWealth <=
          InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS
      ) {
        this.askFinalQuestion();
        return this.returnState(state);
      }
      state = {
        ...state,
        stepID: ChatStepTypes.parentsStep,
        parent_flag: QuestionType.part1,
        temp_person: state.testator,
        successor_flag: QuestionType.initialQuestion,
      };
      const newParentQuestion = this.createChatBotMessage(
        QuestionConstants.addParentsQuestion1(testatorDetail._personName)
      );
      this.addMessageToBotState(newParentQuestion);
      return this.returnState(state);
    });
  };

  getParentChildrenIDStrings = (
    collection: Array<number>,
    state: ChatbotInterface
  ): ReactElement => {
    return (
      <strong>{`{{ ${collection
        .map(
          (child_id) => Person.getPerson(child_id, state.personsMap)._personName
        )
        .filter((name) => name !== "")
        .join(", ")} }}`}</strong>
    );
  };

  askFinalQuestion = (): void => {
    this.setState((state: ChatbotInterface) => {
      state = {
        ...state,
        stepID: ChatStepTypes.finalStep,
      };
      const finalQuestion = this.createChatBotMessage(
        QuestionConstants.FinalQuestion,
        QuestionConstants.YesNoWidgetOptions
      );
      this.addMessageToBotState(finalQuestion);
      return this.returnState(state);
    });
  };

  closestSurvivingRelativeParents = (isTwoParent = true) => {
    this.setState((state: ChatbotInterface) => {
      if (isTwoParent && state.temp_person._parents.length < 2) {
        // TODO
        state.successor_flag = QuestionType.initialQuestion;
        state.parent_flag = QuestionType.part3;
        const personName = this.getPerson(
          state.temp_person._id,
          state.personsMap
        )._personName;
        const secondParentChoiceQuestion = this.createChatBotMessage(
          QuestionConstants.askSecondParentChoiceQuestion(`${personName}`),
          QuestionConstants.YesNoWidgetOptions
        );
        this.addMessageToBotState(secondParentChoiceQuestion);
        return this.returnState(state);
      }

      if (state.person._spouse !== null) {
        this.askFinalQuestion();
        return this.returnState(state);
      }
      const temp_class = this.get_class_and_distance_closest_surviving_relative(
        state.person,
        state
      )[0];
      const eitherParentsDeceased =
        state.person._parents.filter((p_id) => {
          return Person.getPerson(p_id, state.personsMap)._deceased;
        }).length !== 0;
      const personDetail = Person.getPerson(state.person._id, state.personsMap);

      if (
        state.person._parents.length === 2 &&
        eitherParentsDeceased &&
        temp_class === 2
      ) {
        const parent1Detail = Person.getPerson(
          state.person._parents[0],
          state.personsMap
        );
        const parent2Detail = Person.getPerson(
          state.person._parents[1],
          state.personsMap
        );
        if (!personDetail._underAge) {
          this.askFinalQuestion();
          return this.returnState(state);
        }
        if (state.person._parents.length !== 2) {
          this.askFinalQuestion();
          return this.returnState(state);
        }

        if (parent1Detail._deceased) {
          state = {
            ...state,
            stepID: ChatStepTypes.marriedParentsStep,
          };
          const marriedParentsQn = this.createChatBotMessage(
            QuestionConstants.MarriedParents1(
              parent1Detail._personName,
              parent2Detail._personName
            )
          );
          this.addMessageToBotState(marriedParentsQn);
          return this.returnState(state);
        } else {
          state = {
            ...state,
            stepID: ChatStepTypes.marriedParentsStep,
          };
          const marriedParentsQn = this.createChatBotMessage(
            QuestionConstants.MarriedParents2(
              parent1Detail._personName,
              parent2Detail._personName
            )
          );
          this.addMessageToBotState(marriedParentsQn);
          return this.returnState(state);
        }
      } else {
        this.grandParentFirst();
        return this.returnState(state);
      }
    });
  };

  closestSurvivingRelativeGrandParents = (isTwoParent = true) => {
    this.setState((state: ChatbotInterface) => {
      if (isTwoParent && state.temp_person._parents.length < 2) {
        // TODO
        state.successor_flag = QuestionType.initialQuestion;
        state.parent_flag = QuestionType.part3;

        const secondParentChoiceQuestion = this.createChatBotMessage(
          QuestionConstants.askSecondParentChoiceQuestion(
            `${state.temp_person._id}`
          ),
          QuestionConstants.YesNoWidgetOptions
        );
        this.addMessageToBotState(secondParentChoiceQuestion);
        return this.returnState(state);
      }
      state.deceasedParentsArray = state.deceasedParentsArray.filter(
        (item) => item !== state.deceasedParentsArray[0]
      );
      this.askForNextGrandParent;
      return state;
    });
  };

  // Generic functions
  addMessageToBotState = (messages: any): void => {
    this.setState((state: any) => {
      if (Array.isArray(messages)) {
        state.messages = [...state.messages, ...messages];
      } else {
        state.messages = [...state.messages, messages];
      }
      // const messageCopy = _.cloneDeep(state.messages)
      // state.tempMessages = messageCopy;
      return this.returnState(state);
    });
  };

  handleDefault = (): void => {
    const message = this.createChatBotMessage(QuestionConstants.DefaultText, {
      withAvatar: true,
    });

    this.addMessageToBotState(message);
  };

  createNewPerson = (personID: string, state: any) => {
    const newPerson = new Person(personID, this.generateNextID(state.id));
    state.personsMap.set(newPerson._id, newPerson);
    const newNode = new NodeEntity(newPerson._id, 0);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  };
  createEmptyNode = (state: any, id: number) => {
    const newPerson = new Person("", id);
    state.personsMap.set(newPerson._id, newPerson);
    const newNode = new NodeEntity(newPerson._id, 0);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  };
  createTestator = (personID: string, state: any) => {
    const newPerson = new Person(personID, this.generateNextID(state.id));
    newPerson._deceased = true;
    state.personsMap.set(newPerson._id, newPerson);
    const newNode = new NodeEntity(newPerson._id, 0);
    newNode._path.push([ParentChildSelector.testator, newPerson._id]);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
  };

  public getPerson = (id: number, personMap: Map<number, Person>) => {
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
      state.id = state.id + 1;
      return this.returnState(state);
    });
    return id;
  };

  set_spouse = (
    firstSpouse_id: number,
    secondSpouse_id: number,
    add_for_both: boolean
  ): void => {
    this.setState((state: any) => {
      NodeEntity.getNode(firstSpouse_id, state.nodeMap)._spouse =
        secondSpouse_id;
      if (add_for_both) {
        NodeEntity.getNode(secondSpouse_id, state.nodeMap)._spouse =
          firstSpouse_id;
      }
      return this.returnState(state);
    });
  };

  surviving_successor_distance = (
    node: NodeEntity,
    state: any
  ): number | undefined => {
    const nodeDetail: Person = Person.getPerson(node._id, state.personsMap);

    if (nodeDetail._deceased === false) return 0;
    else if (node._children.length === 0) return undefined;
    else {
      const possible_distances: Array<number> = [];
      for (const child_id of node._children) {
        const temp = this.surviving_successor_distance(
          NodeEntity.getNode(child_id, state.nodeMap),
          state
        );
        if (temp != undefined) {
          possible_distances.push(1 + temp);
        }
      }
      if (possible_distances.length === 0) return undefined;
      else return Math.min(...possible_distances);
    }
  };

  get_class_and_distance_closest_surviving_relative = (
    testatorNode: NodeEntity,
    state: any
  ): [number | undefined, number | undefined] => {
    const distance = this.surviving_successor_distance(testatorNode, state);
    if (distance !== undefined) return [1, distance];
    else if (testatorNode._parents.length == 0) return [undefined, undefined];
    else {
      const alternatives: Array<Array<number | undefined>> = [];
      for (const parent_id of testatorNode._parents) {
        alternatives.push(
          this.get_class_and_distance_closest_surviving_relative(
            NodeEntity.getNode(parent_id, state.nodeMap),
            state
          )
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
  check = () => {
    const self = this;
    if (this.isStarted) {
      this.checkstate = setInterval(() => {
        if (self.glb_state !== null) {
          self.isStarted = false;
          messageService.sendMessageFromChatbot({ detail: self.glb_state });
          // close the interval
          self.glb_state = null;
          clearInterval(this.checkstate);
        }
      }, 200);
    }
  };
  returnState = (state: any) => {
    this.check();
    this.glb_state = chartSelector(state);
    return state;
  };
  handleValidation = (tempMessages: any) => {
    this.setState((state: any) => {
      if (tempMessages && tempMessages.length !== 0) {
        state.messages = tempMessages;
        return state;
      }
      return state;
    });
  };
  resetChatbot = () => {
    this.setState((state: any) => {
      state = InitialChatbotState;

      return this.returnState(state);
    });
    const initialQuestion = this.createChatBotMessage(
      QuestionConstants.TestatorQuestion
    );
    this.addMessageToBotState(initialQuestion);
  };

  delay = (n: number) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  };
}

export default ActionProvider;

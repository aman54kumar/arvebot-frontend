import Person from "./Helper/Classes/Person";
import { ChatbotInterface, InitialChatbotState } from "./Generics";
import { ChatStepTypes } from "./Helper/Enums/ChatStepTypes";
import { ReactElement } from "react";
import { NodeEntity } from "./Helper/Classes/NodeEntity";
import chartSelector from "../../../store/chartSelector";
import { messageService } from "./services/ChatbotCommunicator";
import {
  delvisFirstResponse,
  delvisFulltResponse,
  delvisSecondResponse,
  totalEstateValue,
  undividedEstateChoice,
  undividedEstateSpouse,
  undividedOwnershipResponse,
} from "./ActionProviderMethods/UndividedEstateMethods";
import QuestionConstants from "./Helper/Methods/QuestionConstants";
import {
  handleAskUnderAgeQuestion,
  handleNetWealth,
  handleTestator,
  handleUnderAge,
} from "./ActionProviderMethods/TestatorInformationMethods";
import {
  handleCohabitantChoice,
  handleSpouseOption,
  handleSpouseInput,
  handleCohabitantInput,
} from "./ActionProviderMethods/PartnerMethods";
import {
  handleAskForNextGrandParent,
  handleChildAliveOption,
  handleGrandParentFirst,
  handleMarriedParents,
  handleParentAliveOption,
  handleParentsInput,
  handleSecondParentExists,
  handleSuccessorCount,
  handleSuccessorInput,
} from "./ActionProviderMethods/RelativeMethods";
import {
  handleClosestSurvivingRelativeChildren,
  handleClosestSurvivingRelativeGrandParens,
  handleClosestSurvivingRelativeParents,
  handleFinalQuestion,
} from "./ActionProviderMethods/OtherChatbotMethods";

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
    this.setState((state: ChatbotInterface) => {
      return handleTestator(testatorResponse, state, this);
    });
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
      return handleNetWealth(currencyResponse, state, this);
    });
  }

  handleUnderAge = (selectedOption: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleUnderAge(selectedOption, state, this);
    });
  };

  handleSpouseChoice = (spouseChoice: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleSpouseOption(spouseChoice, state, this);
    });
  };

  handleSpouseInput = (spouseResponse: string): void => {
    const spouseID = spouseResponse;
    this.setState((state: ChatbotInterface) => {
      return handleSpouseInput(spouseID, state, this);
    });
  };

  handleCohabitantChoice = (cohabitantChoiceResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleCohabitantChoice(cohabitantChoiceResponse, state, this);
    });
  };

  handleCohabitantInput = (cohabitantResponse: string): void => {
    const cohabitantID = cohabitantResponse;
    this.setState((state: ChatbotInterface) => {
      return handleCohabitantInput(cohabitantID, state, this);
    });
  };

  handleSuccessorCount(successorCountResponse: string): void {
    this.setState((state: ChatbotInterface) => {
      return handleSuccessorCount(successorCountResponse, state, this);
    });
  }
  handleSuccessorInput = (successorResponse: string): void => {
    const child_name = successorResponse;
    this.setState((state: ChatbotInterface) => {
      return handleSuccessorInput(successorResponse, state, this);
    });
  };

  handleChildAliveOption = (aliveResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleChildAliveOption(aliveResponse, state, this);
    });
  };

  handleSecondParentExists = (secondParentChoice: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleSecondParentExists(secondParentChoice, state, this);
    });
  };

  handleParentsInput = (parentResponse: string): void => {
    this.setState((state: ChatbotInterface) => {
      return handleParentsInput(parentResponse, state, this);
    });
  };

  handleParentAliveOption = (alive: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleParentAliveOption(alive, state, this);
    });
  };

  grandParentFirst = () => {
    this.setState((state: ChatbotInterface) => {
      return handleGrandParentFirst(state, this);
    });
  };

  askForNextGrandParent = () => {
    this.setState((state: ChatbotInterface) => {
      return handleAskForNextGrandParent(state, this);
    });
  };

  // TODO check options
  handleMarriedParents = (marriedParentsResponse: boolean): void => {
    this.setState((state: ChatbotInterface) => {
      return handleMarriedParents(marriedParentsResponse, state, this);
    });
  };

  // eslint-disable-next-line
  handleFinalQuestion = (finalOption: boolean): any => {
    this.setState((state: ChatbotInterface) => {
      return handleFinalQuestion(finalOption, state, this);
    });
  };

  askUnderAgeQuestion = () => {
    this.setState((state: ChatbotInterface) => {
      return handleAskUnderAgeQuestion(state, this);
    });
  };

  closestSurvivingRelativeChildren = () => {
    this.setState((state: ChatbotInterface) => {
      return handleClosestSurvivingRelativeChildren(state, this);
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

  closestSurvivingRelativeParents = (isSecondParent = true) => {
    this.setState((state: ChatbotInterface) => {
      return handleClosestSurvivingRelativeParents(isSecondParent, state, this);
    });
  };

  closestSurvivingRelativeGrandParents = (isSecondParent = true) => {
    this.setState((state: ChatbotInterface) => {
      return handleClosestSurvivingRelativeGrandParens(
        isSecondParent,
        state,
        this
      );
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
      return this.returnState(state);
    });
  };

  handleDefault = (): void => {
    const message = this.createChatBotMessage(QuestionConstants.DefaultText, {
      withAvatar: true,
    });

    this.addMessageToBotState(message);
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

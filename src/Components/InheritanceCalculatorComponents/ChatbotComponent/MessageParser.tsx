import ActionProvider from "./ActionProvider";
import { ChatbotInterface } from "./Generics";
import { ChatStepTypes, QuestionType } from "./Helper/Enums/ChatStepTypes";
import { ValidationType } from "./Helper/Enums/ValidationType";
import { ChatbotValidation } from "./Helper/Methods/ChatbotValidation";
import { messageService } from "./services/ChatbotCommunicator";
import { BinaryAnswerTypeYes, BinaryAnswerTypeNo } from "../ChatbotComponent/Helper/Enums/BinaryAnswerTypes"

class MessageParser {
  actionProvider: ActionProvider;
  state: any;
  chatbotValidator: ChatbotValidation;
  constructor(actionProvider: ActionProvider, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.chatbotValidator = new ChatbotValidation(actionProvider, state);
    // this.setRevertListeners();
  }

  parse(message: string): ReturnType<() => void> {


    message = message.trim();

    const curState = this.state;
    curState.yesNoClickedFlag = false;

    // initialStep
    if (curState.stepID === ChatStepTypes.initalStep) {
      if (this.chatbotValidator.validate(message, [ValidationType.emptyValue])) {
        return this.actionProvider.handleTestator(message);
      }
      return;
    }

    //testatorStep
    if (curState.stepID === ChatStepTypes.testatorStep) {
      message = message.toLowerCase();
      if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
        if (message in BinaryAnswerTypeYes) {
          this.disableButtons()
          return this.actionProvider.handleUndividedEstateChoice(true)

        }
        else if (message in BinaryAnswerTypeNo) {
          this.disableButtons();
          return this.actionProvider.handleUndividedEstateChoice(false)
        }
        else {
          alert("check for error");
        }
      }
    }

    // undividedEstateStep
    if (curState.stepID === ChatStepTypes.undividedEstateStep) {
      if (curState.undividedEstate.undivided_flag === QuestionType.part1) {
        return this.actionProvider.handleTotalEstateValueResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === QuestionType.part2) {
        return this.actionProvider.handleOwnershipResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === QuestionType.part3) {
        return this.actionProvider.handleDelvisFirstResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === QuestionType.part4) {
        return this.actionProvider.handleDelvisSecondResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === QuestionType.part5) {
        return this.actionProvider.handleFulltSaereieResponse(message);
      }
      if (curState.undividedEstate.undivided_flag === QuestionType.part6) {
        if (curState.successor_flag === QuestionType.part1) {
          return this.actionProvider.handleSuccessorInput(message);
        } else if (curState.successor_flag === QuestionType.part2) {
          message = message.toLowerCase();
          if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
            if (message in BinaryAnswerTypeYes) {
              this.disableButtons()
              return this.actionProvider.handleChildAliveOption(true)
            }
            else if (message in BinaryAnswerTypeNo) {
              this.disableButtons();
              return this.actionProvider.handleChildAliveOption(false)
            }
            else {
              alert("check for error");
            }
          }
        }
        else if (curState.successor_flag === QuestionType.part3) {
          if (this.chatbotValidator.validate(message, [ValidationType.emptyValue, ValidationType.onlyDigit])) {
            return this.actionProvider.handleSuccessorCount(message);
          } else {
            // remove last message and update stepid
            // return this.actionProvider.handleValidation();
          }
        }
        if (curState.parent_flag === QuestionType.part1) {
          return this.actionProvider.handleParentsInput(message);
        }
        else if (curState.parent_flag == QuestionType.part2) {
          message = message.toLowerCase();
          if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
            if (message in BinaryAnswerTypeYes) {
              this.disableButtons()
              return this.actionProvider.handleParentAliveOption(true)
            }
            else if (message in BinaryAnswerTypeNo) {
              this.disableButtons();
              return this.actionProvider.handleParentAliveOption(false)
            }
            else {
              alert("check for error");
            }
          }
        }
        return this.actionProvider.handleUndividedEstateSpouse(message)
      }
      else {
        return this.actionProvider.handleNetWealth(message);
      }

    }

    // netWealthStep
    if (curState.stepID === ChatStepTypes.netWealthStep) {
      return this.actionProvider.handleNetWealth(message)
    }

    // underAgeStep
    if (curState.stepID === ChatStepTypes.underAgeStep) {
      message = message.toLowerCase();
      if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
        if (message in BinaryAnswerTypeYes) {
          this.disableButtons()
          return this.actionProvider.handleUnderAge(true)

        }
        else if (message in BinaryAnswerTypeNo) {
          this.disableButtons();
          return this.actionProvider.handleUnderAge(false)
        }
        else {
          alert("check for error");
        }
      }
    }

    // spouse start
    if (curState.stepID === ChatStepTypes.spouseChoice) {
      message = message.toLowerCase();
      if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
        if (message in BinaryAnswerTypeYes) {
          this.disableButtons()
          return this.actionProvider.handleSpouseChoice(true)
        }
        else if (message in BinaryAnswerTypeNo) {
          this.disableButtons();
          return this.actionProvider.handleSpouseChoice(false)
        }
        else {
          alert("check for error");
        }
      }
    }
    if (curState.stepID === ChatStepTypes.spouseStep) {
      if (this.chatbotValidator.validate(message, [ValidationType.emptyValue])) {
        return this.actionProvider.handleSpouseInput(message);
      }
    }
    // spouse end


    // cohabitant start
    if (curState.stepID === ChatStepTypes.cohabitantChoice) {
      message = message.toLowerCase();
      if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
        if (message in BinaryAnswerTypeYes) {
          this.disableButtons()
          return this.actionProvider.handleCohabitantChoice(true)
        }
        else if (message in BinaryAnswerTypeNo) {
          this.disableButtons();
          return this.actionProvider.handleCohabitantChoice(false)
        }
        else {
          alert("check for error");
        }
      }
    }

    if (curState.stepID === ChatStepTypes.cohabitantStep) {
      return this.actionProvider.handleCohabitantInput(message); //set stepID = 7
    }

    //  cohabitant end


    // successorStep
    if (curState.stepID === ChatStepTypes.successorStep) {
      if (curState.successor_flag === QuestionType.part1) {
        return this.actionProvider.handleSuccessorInput(message);
      } else if (curState.successor_flag === QuestionType.part2) {
        message = message.toLowerCase();
        if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
          if (message in BinaryAnswerTypeYes) {
            this.disableButtons()
            return this.actionProvider.handleChildAliveOption(true)
          }
          else if (message in BinaryAnswerTypeNo) {
            this.disableButtons();
            return this.actionProvider.handleChildAliveOption(false)
          }
          else {
            alert("check for error");
          }
        }
      }
      else if (curState.successor_flag === QuestionType.part3) {
        if (this.chatbotValidator.validate(message, [ValidationType.emptyValue, ValidationType.onlyDigit])) {
          return this.actionProvider.handleSuccessorCount(message);
        } else {
          return;
          // remove last message and update stepid
          // return this.actionProvider.handleValidation();
        }
      }
    }


    //  parentsStep
    if (curState.stepID === ChatStepTypes.parentsStep) {
      if (curState.successor_flag === QuestionType.part1) {
        return this.actionProvider.handleSuccessorInput(message);
      } else if (curState.successor_flag === QuestionType.part2) {
        message = message.toLowerCase();
        if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
          if (message in BinaryAnswerTypeYes) {
            this.disableButtons()
            return this.actionProvider.handleChildAliveOption(true)
          }
          else if (message in BinaryAnswerTypeNo) {
            this.disableButtons();
            return this.actionProvider.handleChildAliveOption(false)
          }
          else {
            alert("check for error");
          }
        }
      }
      else if (curState.successor_flag === QuestionType.part3) {
        if (this.chatbotValidator.validate(message, [ValidationType.emptyValue, ValidationType.onlyDigit])) {
          return this.actionProvider.handleSuccessorCount(message);
        } else {
          return;
        }
      }
      if (curState.parent_flag === QuestionType.part1) {
        return this.actionProvider.handleParentsInput(message);
      }
      else if (curState.parent_flag == QuestionType.part2) {
        message = message.toLowerCase();
        if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
          if (message in BinaryAnswerTypeYes) {
            this.disableButtons()
            return this.actionProvider.handleParentAliveOption(true)
          }
          else if (message in BinaryAnswerTypeNo) {
            this.disableButtons();
            return this.actionProvider.handleParentAliveOption(false)
          }
          else {
            alert("check for error");
          }
        }
      }
    }

    // marriedParentsStep
    if (curState.stepID === ChatStepTypes.marriedParentsStep) {
      message = message.toLowerCase();
      if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
        if (message in BinaryAnswerTypeYes) {
          this.disableButtons()
          return this.actionProvider.handleMarriedParents(true)

        }
        else if (message in BinaryAnswerTypeNo) {
          this.disableButtons();
          return this.actionProvider.handleMarriedParents(false)
        }
        else {
          alert("check for error");
        }
      }
    }


    // grandParentStep
    if (curState.stepID === ChatStepTypes.grandParentStep) {
      if (curState.successor_flag === QuestionType.part1) {
        return this.actionProvider.handleSuccessorInput(message);
      } else if (curState.successor_flag === QuestionType.part2) {
        message = message.toLowerCase();
        if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
          if (message in BinaryAnswerTypeYes) {
            this.disableButtons()
            return this.actionProvider.handleChildAliveOption(true)

          }
          else if (message in BinaryAnswerTypeNo) {
            this.disableButtons();
            return this.actionProvider.handleChildAliveOption(false)
          }
          else {
            alert("check for error");
          }
        }
      }
      else if (curState.successor_flag === QuestionType.part3) {
        if (this.chatbotValidator.validate(message, [ValidationType.emptyValue, ValidationType.onlyDigit])) {
          return this.actionProvider.handleSuccessorCount(message);
        } else {
          return;
          // remove last message and update stepid
          // return this.actionProvider.handleValidation();
        }
      }
      if (curState.parent_flag === QuestionType.part1) {
        return this.actionProvider.handleParentsInput(message);
      }
      else if (curState.parent_flag == QuestionType.part2) {
        message = message.toLowerCase();
        if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
          if (message in BinaryAnswerTypeYes) {
            this.disableButtons()
            return this.actionProvider.handleParentAliveOption(true)
          }
          else if (message in BinaryAnswerTypeNo) {
            this.disableButtons();
            return this.actionProvider.handleParentAliveOption(false)
          }
          else {
            alert("check for error");
          }
        }
      }
    }


    // finalStep
    if (curState.stepID === ChatStepTypes.finalStep) {
      console.log(curState)
      message = message.toLowerCase();
      if (this.chatbotValidator.validate(message, [ValidationType.incorrectValueForBoolean])) {
        if (message in BinaryAnswerTypeYes) {
          this.disableButtons()
          return this.actionProvider.handleFinalQuestion(true)

        }
        else if (message in BinaryAnswerTypeNo) {
          this.disableButtons();
          return this.actionProvider.handleFinalQuestion(false)
        }
        else {
          alert("check for error");
        }
      }
      // return this.actionProvider.handleFinalQuestion(message)
    }
    // else {
    //   return this.actionProvider.handleDefault();
    //   return;
    // }
  }

  disableButtons = () => {
    const buttonElements: any = document.getElementsByClassName("option-selector-button");
    for (let i = 0; i < buttonElements.length; i++) {
      const currentElement = buttonElements[i];
      if (!currentElement.disabled)
        currentElement.disabled = true
      currentElement.style.pointerEvents = "none"
    }
  }

  setRevertListeners = () => {
    messageService.clearAllInternalSubscription();
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const subscription = messageService.getMessageInChatbot().subscribe(message => {
      this.revertState();
    })
    messageService.addInternalSubscription(subscription);
  }
  revertState = () => {


    const lastState = messageService.removePreviousState();
    console.log('setting state:');
    console.log(lastState);

    const previousStates: any = messageService.getPreviousStates();
    console.log('previous States:');
    console.log(previousStates);

    if (lastState) {
      this.actionProvider.setState((state: any) => {
        state = lastState
        console.log('final state');
        console.log(state);


        return state;
      });
    }
  }
  flagSwitch = (curState: ChatbotInterface, message: any) => {
    if (curState.successor_flag === QuestionType.part1) {
      return this.actionProvider.handleSuccessorInput(message);
    } else if (curState.successor_flag === QuestionType.part2)
      return this.actionProvider.handleChildAliveOption(message);
    else if (curState.successor_flag === QuestionType.part3) {
      if (this.chatbotValidator.validate(message, [ValidationType.emptyValue, ValidationType.onlyDigit])) {
        return this.actionProvider.handleSuccessorCount(message);
      } else {
        // remove last message and update stepid
        // return this.actionProvider.handleValidation();
      }
    }
    return null
  }
}




export default MessageParser;
// function dispatch(arg0: { type: string; payload: any; }) {
//   throw new Error("Function not implemented.");
// }


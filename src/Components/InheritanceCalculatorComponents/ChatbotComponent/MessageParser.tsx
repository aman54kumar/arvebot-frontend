import ActionProvider from "./ActionProvider";
import { ChatbotInterface } from "./Generics";
import { QuestionType } from "./Helper/Enums/SuccessorParentType";
import { ValidationType } from "./Helper/Enums/ValidationType";
import { ChatbotValidation } from "./Helper/Methods/ChatbotValidation";

class MessageParser {
  actionProvider: ActionProvider;
  state: ChatbotInterface;
  chatbotValidator: ChatbotValidation;
  constructor(actionProvider: ActionProvider, state: ChatbotInterface) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.chatbotValidator = new ChatbotValidation(actionProvider);

  }

  parse(message: string): ReturnType<() => void> {


    const curState = this.state;

    if (curState.stepID === 0) {
      this.actionProvider.handleCaseName(message); //set stepID = 1
      return
    }
    if (curState.stepID === 1) {
      if (this.chatbotValidator.validate(message, [ValidationType.emptyValue])) {
        return this.actionProvider.handleTestator(message);
      }
      //set stepID = 2
    }
    // if (curState.stepID === 2) {
    //   return this.actionProvider.handleUndividedEstate(message); //set stepID = 3
    // }
    if (curState.stepID === 3) {
      if (curState.undividedEstate.undivided_flag === "part1") {
        return this.actionProvider.handleTotalEstateValueResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === "part2") {
        return this.actionProvider.handleOwnershipResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === "part3") {
        return this.actionProvider.handleDelvisFirstResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === "part4") {
        return this.actionProvider.handleDelvisSecondResponse(message)
      }
      if (curState.undividedEstate.undivided_flag === "part5") {
        return this.actionProvider.handleFulltSaereieResponse(message); //set stepID = 4
      }
      if (curState.undividedEstate.undivided_flag === "part6") {
        if (curState.successor_flag === "part1") {
          return this.actionProvider.handleSuccessorInput(message)
        }
        if (curState.successor_flag === "part2") {
          return this.actionProvider.handleChildAliveOption(message)
        }
        return this.actionProvider.handleUndividedEstateSpouse(message)
      }
      else {
        return this.actionProvider.handleNetWealth(message); //set stepID = 4
      }

    }
    // if (curState.stepID === 4) {
    //   return this.actionProvider.handleUnderAge(message); //set stepID = 5
    // }
    if (curState.stepID === 5) {
      if (this.chatbotValidator.validate(message, [ValidationType.emptyValue])) {
        return this.actionProvider.handleSpouseInput(message); //set stepID = 6
      }
    }
    if (curState.stepID === 6) {
      return this.actionProvider.handleCohabitantInput(message); //set stepID = 7
    }
    if (curState.stepID === 7) {
      if (curState.successor_flag === QuestionType.part1) {
        return this.actionProvider.handleSuccessorInput(message);
      } else if (curState.successor_flag === QuestionType.part2)
        return this.actionProvider.handleChildAliveOption(message);
      else if (curState.successor_flag === QuestionType.part3) {
        if (this.chatbotValidator.validate(message, [ValidationType.emptyValue, ValidationType.onlyDigit])) {
          return this.actionProvider.handleSuccessorCount(message);
        } else {
          // remove last message and update stepid
          return this.actionProvider.handleValidation();
        }
      }
    }
    if (curState.stepID === 8) {
      if (curState.parent_flag === "part1") {
        return this.actionProvider.handleParentsInput(message);
      }
      else if (curState.parent_flag == "part2")
        return this.actionProvider.handleParentAliveOption(message)
    }
    if (curState.stepID === 14) {
      if (curState.grandParent_flag === "part1") {
        return this.actionProvider.handleGrandParentResponse(message)
      }
      else if (curState.grandParent_flag === "part2") {
        return this.actionProvider.handleGrandParentAliveOption(message)
      }
    }

    if (curState.stepID === -1) {
      console.log(curState)
      return this.actionProvider.handleFinalQuestion(message)
    }
    else {
      // return this.actionProvider.handleDefault();
      return;
    }
  }
}

export default MessageParser;
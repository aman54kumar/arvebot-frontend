import ActionProvider from "./ActionProvider";
import { ChatbotInterface } from "./Generics";
import Person from "./Helper/Classes/Person";

class MessageParser {
  actionProvider: ActionProvider;
  state: ChatbotInterface<Person>;
  constructor(actionProvider: ActionProvider, state: ChatbotInterface<Person>) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string): ReturnType<() => void> {
    const curState = this.state;
    if (curState.stepID === 0) {
      return this.actionProvider.handleCaseName(message); //set stepID = 1
    }
    if (curState.stepID === 1) {
      return this.actionProvider.handleTestator(message); //set stepID = 2
    }
    // if (curState.stepID === 2) {
    //   return this.actionProvider.handleUndividedEstate(message); //set stepID = 3
    // }
    if (curState.stepID === 3) {
      return this.actionProvider.handleNetWealth(message); //set stepID = 4
    }
    // if (curState.stepID === 4) {
    //   return this.actionProvider.handleUnderAge(message); //set stepID = 5
    // }
    if (curState.stepID === 5) {
      return this.actionProvider.handleSpouseInput(message); //set stepID = 6
    }
    if (curState.stepID === 6) {
      return this.actionProvider.handleCohabitantInput(message); //set stepID = 7
    }
    if (curState.stepID === 7) {
      if (curState.successor_flag === "part1") {
        return this.actionProvider.handleSuccessorInput(message);
      } else if (curState.successor_flag === "part2")
        return this.actionProvider.handleChildAliveOption(message);
    }
    if (curState.stepID === 8) {
      if (curState.parent_flag === "part1") {
        return this.actionProvider.handleParentsInput(message);
      }
      else if (curState.parent_flag == "part2")
        return this.actionProvider.handleParentAliveOption(message)
    }
    // if (curState.stepID === 9) {
    //   return this.actionProvider.handleSuccessorInput(message);
    // }
    // if (curState.stepID === 9) {
    //   return this.actionProvider.handleAliveOption(message);
    // }
    if (curState.stepID === 10) {
      console.log("dead-end now");
    } else {
      return this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;

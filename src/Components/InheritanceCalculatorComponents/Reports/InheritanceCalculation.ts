import { ChatbotInterface } from "../ChatbotComponent/Generics";
import Person from "../ChatbotComponent/Helper/Classes/Person";

export class InheritanceCalculation {
  state: ChatbotInterface;
  constructor(state: ChatbotInterface, will = undefined) {
    this.state = state;
  }
}

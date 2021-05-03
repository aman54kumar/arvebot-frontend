import InheritanceContants from "./InheritanceConstants";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (this.state.stepID === 0) {
      return this.actionProvider.handleCaseName(message);
    }
    if (this.state.stepID === 1) {
      return this.actionProvider.handlePersonID(message);
    }
    if (this.state.stepID === 2) {
      return this.actionProvider.handleNetWealth(message);
    }
    if (this.state.stepID === 5) {
      if (this.state.underAge && this.state.marriage) {
        /**
         *  * is underage and married -> probably error and ask again
         *  * confirm
         *  ! TODO find and fix scenario
         *
         */
        console.log("underage not implemented");
      } else if (!this.state.underAge && this.state.marriage) {
        /**
         *  * not underage and married
         *  * handle spouse details
         */
        return this.actionProvider.handleSpouseID(message);
      } else if (!this.state.underAge && !this.state.marriage) {
        /**
         * * not underage and not married
         * * handle cohabitant details
         */
        return this.actionProvider.handleCohabitant(message);
      } else if (this.state.underAge && !this.state.marriage) {
        /**
         * * is underage and not married
         */
        console.log("underage and not married");
      }
    } else {
      return this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;

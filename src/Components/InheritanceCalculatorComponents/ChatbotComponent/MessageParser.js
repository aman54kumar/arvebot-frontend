class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (this.state.stepID === 0) {
      return this.actionProvider.handleCaseName(message); //set stepID = 1
    }
    if (this.state.stepID === 1) {
      return this.actionProvider.handleTestator(message); //set stepID = 2
    }
    if (this.state.stepID === 2) {
      return this.actionProvider.handleUndividedEstate(message); //set stepID = 3
    }
    if (this.state.stepID === 3) {
      return this.actionProvider.handleNetWealth(message); //set stepID = 4
    }
    if (this.state.stepID === 4) {
      return this.actionProvider.handleUnderAge(message); //set stepID = 5
    }
    if (this.state.stepID === 5) {
      return this.actionProvider.handleSpouseInput(message); //set stepID = 6
    }
    if (this.state.stepID === 6) {
      return this.actionProvider.handleCohabitantInput(message); //set stepID = 7
    }
    // if (this.state.stepID === 7) {
    //   if (
    //     (this.state.spouse !== "" &&
    //       this.state.netWealth <=
    //         InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN) ||
    //     (this.state.cohabitant !== "" &&
    //       this.state.netWealth <=
    //         InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN)
    //   ) {
    //     return this.actionProvider.askRearChildrenQuestion();
    //   }

    // if (this.state.stepID === 6 && (this.state.spouse==="" && this.state.netWealth <= InheritanceContants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN)) {
    //   return this.actionProvider.handleRearChildrenInput()
    // }
    // if (this.state.stepID === 6) {
    //   return this.actionProvider.handleCohabintantInput(message);
    // }
    // if (this.state.stepID === 7 && (this.state.cohabitant==="" && this.state.netWealth <= InheritanceContants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN)) {
    //   return this.actionProvider.handle
    // }
    // if (
    //   {
    //   return this.actionProvider.    }
    else {
      return this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;

import { ChatbotInterface } from "../ChatbotComponent/Generics";
import { NodeEntity } from "../ChatbotComponent/Helper/Classes/NodeEntity";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
import InheritanceConstants from "../ChatbotComponent/Helper/Methods/InheritanceConstants";
import ActionProvider from "../ChatbotComponent/ActionProvider";
import { ReportCalculationBase } from "./ReportCalculationBase";
import { getNode } from "../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";
const cache = createIntlCache();
const intl = createIntl({ locale: "nb-NO", messages: Norsk }, cache);

export class PliktdelsarvCalculation extends ReportCalculationBase {
  state: ChatbotInterface;
  actionProvider: ActionProvider;
  person: NodeEntity;
  constructor(
    person: NodeEntity,
    actionProvider: ActionProvider,
    state: ChatbotInterface,
    will = undefined
  ) {
    super(person, actionProvider, state, 3, will);
    this.state = state;
    this.actionProvider = actionProvider;
    this.person = getNode(person._id, this.state.nodeMap);
    this.will = will;
  }

  // computeInheritance = () => {
  //   //
  // };

  // computeGenealogyInheritance = (person_id: number) => {
  //   this.survivor_inheritance_sum = Math.min(
  //     this.state.netWealth,
  //     this.minimum_surviving_inheritance
  //   );

  //   this.genealogy_inheritance_sum = Math.min(
  //     this.state.netWealth - this.survivor_inheritance_sum,
  //     this.state.netWealth * InheritanceConstants.FRACTION_PLIKTDEL,
  //     InheritanceConstants.LINE_MAXIMUM_PLIKTDEL *
  //       this.state.testator._children.length
  //   );
  //   if (this.genealogy_inheritance_sum !== 0) {
  //     this.splits_with_chains = this.reportUtils.split_evenly_between_lines(
  //       this.state.testator._children
  //     );

  //     const genealogy_splits = this.reportUtils.combine_duplicates(
  //       this.splits_with_chains
  //     );

  //     genealogy_splits.map((genealogy_split: any) => {
  //       return this.genealogy_inheritance.push({
  //         person: genealogy_split.person,
  //         frac: genealogy_split.frac * this.genealogy_inheritance_sum,
  //         chains: genealogy_split.chains,
  //       });
  //     });
  //   } else {
  //     this.splits_with_chains = [];
  //     this.genealogy_splits = splits_initial;
  //     this.genealogy_inheritance = [splits_initial];
  //   }
  //   return this.genealogy_inheritance;
  // };
}

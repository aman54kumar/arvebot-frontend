import { ChatbotInterface } from "../ChatbotComponent/Generics";
import { NodeEntity } from "../ChatbotComponent/Helper/Classes/NodeEntity";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
import InheritanceConstants from "../ChatbotComponent/Helper/Methods/InheritanceConstants";
import ActionProvider from "../ChatbotComponent/ActionProvider";
import { ReportCalculationBase } from "./ReportCalculationBase";
import {
  getNode,
  get_class_and_distance_closest_surviving_relative,
} from "../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";
const cache = createIntlCache();
const intl = createIntl({ locale: "nb-NO", messages: Norsk }, cache);
export class UndividedCalculation extends ReportCalculationBase {
  survivor: number | null = null;

  constructor(
    person: NodeEntity,
    actionProvider: ActionProvider,
    state: ChatbotInterface
  ) {
    super(person, actionProvider, state, 2);
    this.state = state;
    this.actionProvider = actionProvider;
    this.person = getNode(person._id, this.state.nodeMap);
  }

  // computeGenealogyInheritance = () => {
  //   this.survivor_inheritance_sum = Math.min(
  //     this.state.netWealth,
  //     Math.max(
  //       this.minimum_surviving_inheritance,
  //       this.surviving_fraction * this.state.netWealth
  //     )
  //   );
  //   this.genealogy_inheritance_sum =
  //     this.state.netWealth - this.survivor_inheritance_sum;
  //   if (this.genealogy_inheritance_sum !== 0) {
  //     this.splits_with_chains =
  //       this.reportUtils.compute_default_genealogy_splits_with_chains(
  //         this.person
  //       );

  //     const genealogy_splits = this.reportUtils.combine_duplicates(
  //       this.splits_with_chains
  //     );
  //   } else {
  //     this.splits_with_chains = [];
  //     this.genealogy_inheritance = [];
  //   }
  //   return this.genealogy_inheritance;
  // };
}

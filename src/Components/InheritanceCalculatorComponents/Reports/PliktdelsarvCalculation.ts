import { ChatbotInterface } from "../ChatbotComponent/Generics";
import { NodeEntity } from "../ChatbotComponent/Helper/Classes/NodeEntity";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
import { ReportUtils } from "./ReportUtils";
import InheritanceConstants from "../ChatbotComponent/Helper/Methods/InheritanceConstants";
import ActionProvider from "../ChatbotComponent/ActionProvider";
const cache = createIntlCache();
const intl = createIntl({ locale: "nb-NO", messages: Norsk }, cache);

interface PliktCalculationInterface {
  survivor: number | null;
  survivor_type: string;
  class_closest: number | undefined;
  distance_closest: number | undefined;
  old_surviving_reference_paragraphs: string;
  surviving_reference_paragraphs: Array<string>;
  minimum_surviving_inheritance: number;
  surviving_fraction: number;
  descriptive_text: string;
  survivor_inheritance_sum: number;
  genealogy_inheritance_sum: number;
  splits_with_chains: [];
  genealogy_inheritance: [];
}
interface pliktFractionListType {
  person: string;
  frac: number;
  chains: Array<string>;
}
export const splits_initial = {
  person: "",
  frac: 0,
  chains: [],
};
export class PliktdelsarvCalculation {
  state: ChatbotInterface;
  inheritanceConstants: InheritanceConstants;
  actionProvider: ActionProvider;
  person: NodeEntity;
  survivor: number | null = null;
  survivor_type = "";
  class_closest: number | undefined;
  distance_closest: number | undefined;
  old_surviving_reference_paragraphs = "";
  surviving_reference_paragraphs: string[] = [];
  minimum_surviving_inheritance = 0;
  surviving_fraction = 0;
  descriptive_text = "";
  survivor_inheritance_sum = 0;
  genealogy_inheritance_sum = 0;
  splits_with_chains: [] = [];
  genealogy_inheritance: Array<pliktFractionListType> = [];
  genealogy_splits: pliktFractionListType = splits_initial;
  will: string | undefined;
  reportUtils: any;
  constructor(
    person: NodeEntity,
    actionProvider: ActionProvider,
    state: ChatbotInterface,
    inheritanceConstants: InheritanceConstants,
    will = undefined
  ) {
    this.state = state;
    this.actionProvider = actionProvider;
    this.person = actionProvider.getNode(person._id, this.state.nodeMap);
    this.inheritanceConstants = inheritanceConstants;
    this.will = will;
    this.reportUtils = new ReportUtils(actionProvider, state);
  }

  computeInheritance = () => {
    [this.class_closest, this.distance_closest] =
      this.actionProvider.get_class_and_distance_closest_surviving_relative(
        this.state.testator,
        this.state
      );

    if (this.person.has_surviving_spouse()) {
      // TODO define has_surviving_spouse in NodeEntity.ts
      this.survivor = this.person._spouse;
      this.survivor_type = intl.formatMessage({
        id: "REPORT.Inheritance.survivorType1",
      });

      this.surviving_reference_paragraphs.push(
        intl.formatMessage({
          id: "REPORT.Inheritance.surviving_reference_paragraphs_10annet",
        })
      );
      if (this.class_closest === 1) {
        this.minimum_surviving_inheritance =
          this.inheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DescriptiveTest_firstClass_spouse_4G",
        });
      } else {
        this.minimum_surviving_inheritance =
          this.inheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DescriptiveTest_firstClass_spouse_6G",
        });
      }
    } else {
      this.survivor = null;
      this.surviving_reference_paragraphs = [];
      this.descriptive_text =
        this.inheritanceConstants.DESC_NO_SPOUSE_OR_COHABITANT;
      this.minimum_surviving_inheritance = 0;
    }
  };

  computeGenealogyInheritance = (person_id: number) => {
    this.survivor_inheritance_sum = Math.min(
      this.state.netWealth,
      this.minimum_surviving_inheritance
    );

    this.genealogy_inheritance_sum = Math.min(
      this.state.netWealth - this.survivor_inheritance_sum,
      this.state.netWealth * this.inheritanceConstants.FRACTION_PLIKTDEL,
      this.inheritanceConstants.LINE_MAXIMUM_PLIKTDEL *
        this.state.testator._children.length
    );
    if (this.genealogy_inheritance_sum !== 0) {
      this.splits_with_chains = this.reportUtils.split_evenly_between_lines(
        this.state.testator._children
      );

      const genealogy_splits = this.reportUtils.combine_duplicates(
        this.splits_with_chains
      );

      genealogy_splits.map((genealogy_split: any) => {
        return this.genealogy_inheritance.push({
          person: genealogy_split.person,
          frac: genealogy_split.frac * this.genealogy_inheritance_sum,
          chains: genealogy_split.chains,
        });
      });
    } else {
      this.splits_with_chains = [];
      this.genealogy_splits = splits_initial;
      this.genealogy_inheritance = [splits_initial];
    }
    return this.genealogy_inheritance;
  };
}

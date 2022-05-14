import { ChatbotInterface } from "../ChatbotComponent/Generics";
import { NodeEntity } from "../ChatbotComponent/Helper/Classes/NodeEntity";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
import InheritanceConstants from "../ChatbotComponent/Helper/Methods/InheritanceConstants";
import { ReportUtils } from "./ReportUtils";
const cache = createIntlCache();
const intl = createIntl({ locale: "nb-NO", messages: Norsk }, cache);

interface InheritanceCalculationInterface {
  survivor: number | null;
  survivor_type: string;
  class_closest: number | undefined;
  distance_closest: number | undefined;
  old_surviving_reference_paragraphs: string;
  surviving_reference_paragraphs: string;
  minimum_surviving_inheritance: number;
  surviving_fraction: number;
  descriptive_text: string;
  survivor_inheritance_sum: number;
  genealogy_inheritance_sum: number;
  splits_with_chains: [];
  genealogy_inheritance: [];
}
interface inheritanceFractionListType {
  person: number;
  frac: number;
  chains: Array<any>;
}
export class UndividedCalculation implements InheritanceCalculationInterface {
  state: ChatbotInterface;
  ActionProvider: any;
  InheritanceConstants: any;
  person: NodeEntity;
  survivor: number | null = null;
  survivor_type = "";
  class_closest: number | undefined;
  distance_closest: number | undefined;
  old_surviving_reference_paragraphs = "";
  surviving_reference_paragraphs = "";
  minimum_surviving_inheritance = 0;
  surviving_fraction = 0;
  descriptive_text = "";
  survivor_inheritance_sum = 0;
  genealogy_inheritance_sum = 0;
  splits_with_chains: [] = [];
  genealogy_inheritance: any = [];
  genealogy_splits: [] = [];
  will: string | undefined;
  reportUtils: any;
  constructor(
    private actionProvider: any,
    person: NodeEntity,
    state: ChatbotInterface,
    will = undefined
  ) {
    this.state = state;
    this.InheritanceConstants = new InheritanceConstants();
    this.person = person;
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

      if (this.class_closest === undefined || this.class_closest > 2) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
        });
        this.surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.surviving_reference_paragraphs_9annet",
        });
        this.minimum_surviving_inheritance = 0;
        this.surviving_fraction = 1;
        this.descriptive_text =
          this.InheritanceConstants.DESC_SPOUSE_NO_CLOSE_RELATIVES;
      } else if (this.class_closest === 1) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
        });
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_8forste",
        });
        this.minimum_surviving_inheritance =
          this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN;
        this.surviving_fraction =
          this.InheritanceConstants.FRACTION_INHERITANCE_SPOUSE_VS_CHILDREN;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DescriptiveText4G",
        });
      } else if (this.class_closest === 2) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
        });
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_9forste",
        });
        this.minimum_surviving_inheritance =
          this.InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS;
        this.surviving_fraction =
          this.InheritanceConstants.FRACTION_INHERITANCE_SPOUSE_VS_PARENTS;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DescriptiveText6G",
        });
      }
    } else if (this.person.has_surviving_cohabitant()) {
      this.survivor = this.person._cohabitant;
      this.survivor_type = intl.formatMessage({
        id: "REPORT.Inheritance.survivorType2",
      });
      if (this.class_closest === undefined || this.class_closest > 3) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
        });
        this.surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
        });
        this.minimum_surviving_inheritance = 0;
        this.surviving_fraction = 1;
        this.descriptive_text =
          this.InheritanceConstants.DESC_COHABITANT_NO_CLOSE_RELATIVES;
      } else if (this.class_closest === 1) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
        });
        this.surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
        });
        this.minimum_surviving_inheritance =
          this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN;
        this.surviving_fraction =
          this.InheritanceConstants.FRACTION_INHERITANCE_COHABITANT_VS_CHILDREN;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DescriptiveText_firstClass_cohab_4G",
        });
      } else if (this.class_closest === 2) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
        });
        this.surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
        });
        this.minimum_surviving_inheritance =
          this.InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS;
        this.surviving_fraction =
          this.InheritanceConstants.FRACTION_INHERITANCE_COHABITANT_VS_PARENTS;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DescriptiveText_secondClass_cohab_4G",
        });
      } else if (this.class_closest === 3) {
        if (this.distance_closest && this.distance_closest <= 2) {
          this.old_surviving_reference_paragraphs = intl.formatMessage({
            id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
          });
          this.surviving_reference_paragraphs = intl.formatMessage({
            id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
          });
          this.minimum_surviving_inheritance = 4 * this.InheritanceConstants.G;
          this.surviving_fraction = 0;
          this.descriptive_text = intl.formatMessage({
            id: "REPORT.Inheritance.DescriptiveText_thirdClass_cohab_4G",
          });
        } else {
          this.old_surviving_reference_paragraphs = intl.formatMessage({
            id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
          });
          this.surviving_reference_paragraphs = intl.formatMessage({
            id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
          });
          this.minimum_surviving_inheritance = 0;
          this.surviving_fraction = 1;
          this.descriptive_text =
            this.InheritanceConstants.DESC_COHABITANT_NO_CLOSE_RELATIVES;
        }
      }
    } else {
      this.survivor = null;
      this.surviving_reference_paragraphs = "";
      this.minimum_surviving_inheritance = 0;
      this.surviving_fraction = 0;
      this.descriptive_text =
        this.InheritanceConstants.DESC_NO_SPOUSE_OR_COHABITANT;
    }
  };

  computeGenealogyInheritance = () => {
    this.survivor_inheritance_sum = Math.min(
      this.state.netWealth,
      Math.max(
        this.minimum_surviving_inheritance,
        this.surviving_fraction * this.state.netWealth
      )
    );
    // const genealogy_inheritance: any = [];
    this.genealogy_inheritance_sum =
      this.state.netWealth - this.survivor_inheritance_sum;
    // this.state.netWealth - this.survivor_inheritance_sum;
    if (this.genealogy_inheritance_sum !== 0) {
      this.splits_with_chains =
        this.reportUtils.compute_default_genealogy_splits_with_chains(this.person);

      const genealogy_splits = this.reportUtils.combine_duplicates(
        this.splits_with_chains
      );

      genealogy_splits.map((genealogy_split: any) => {
        return this.genealogy_inheritance.push([
          genealogy_split.person,
          genealogy_split.frac * this.genealogy_inheritance_sum,
          genealogy_split.chains,
        ]);
      });
    } else {
      this.splits_with_chains = [];
      this.genealogy_splits = [];
      this.genealogy_inheritance = [];
    }
    return this.genealogy_inheritance;
  };
}

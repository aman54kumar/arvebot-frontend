import { ChatbotInterface } from "../ChatbotComponent/Generics";
import { NodeEntity } from "../ChatbotComponent/Helper/Classes/NodeEntity";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
import ActionProvider from "../ChatbotComponent/ActionProvider";
import { ReportCalculationBase } from "./ReportCalculationBase";
import { getNode } from "../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";
const cache = createIntlCache();
const intl = createIntl({ locale: "nb-NO", messages: Norsk }, cache);

export class InheritanceCalculation extends ReportCalculationBase {
  state: ChatbotInterface;
  actionProvider: ActionProvider;
  person: NodeEntity;
  will: undefined;
  constructor(
    person: NodeEntity,
    actionProvider: ActionProvider,
    state: ChatbotInterface,
    will = undefined
  ) {
    super(person, actionProvider, state, 1, will);
    this.state = state;
    this.actionProvider = actionProvider;
    this.person = getNode(person._id, this.state.nodeMap);
    this.will = will;
  }

  // computeInheritance = () => {
  //   [this.class_closest, this.distance_closest] =
  //     get_class_and_distance_closest_surviving_relative(
  //       this.state.testator,
  //       this.state
  //     );

  //   if (this.person.has_surviving_spouse()) {
  //     // TODO define has_surviving_spouse in NodeEntity.ts
  //     this.survivor = this.person._spouse;
  //     this.survivor_type = intl.formatMessage({
  //       id: "REPORT.Inheritance.survivorType1",
  //     });

  //     if (this.class_closest === undefined || this.class_closest > 2) {
  //       this.old_surviving_reference_paragraphs = intl.formatMessage({
  //         id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
  //       });
  //       this.surviving_reference_paragraphs.push(
  //         intl.formatMessage({
  //           id: "REPORT.Inheritance.surviving_reference_paragraphs_9annet",
  //         })
  //       );
  //       this.minimum_surviving_inheritance = 0;
  //       this.surviving_fraction = 1;
  //       this.descriptive_text = intl.formatMessage({
  //         id: "REPORT.Inheritance.DESC_SPOUSE_NO_CLOSE_RELATIVES",
  //       });
  //     } else if (this.class_closest === 1) {
  //       this.old_surviving_reference_paragraphs = intl.formatMessage({
  //         id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
  //       });
  //       this.surviving_reference_paragraphs.push(
  //         intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_8forste",
  //         })
  //       );
  //       this.minimum_surviving_inheritance =
  //         InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN;
  //       this.surviving_fraction =
  //         InheritanceConstants.FRACTION_INHERITANCE_SPOUSE_VS_CHILDREN;
  //       this.descriptive_text = intl.formatMessage({
  //         id: "REPORT.Inheritance.DescriptiveText4G",
  //       });
  //     } else if (this.class_closest === 2) {
  //       this.old_surviving_reference_paragraphs = intl.formatMessage({
  //         id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
  //       });
  //       this.surviving_reference_paragraphs.push(
  //         intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_9forste",
  //         })
  //       );
  //       this.minimum_surviving_inheritance =
  //         InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS;
  //       this.surviving_fraction =
  //         InheritanceConstants.FRACTION_INHERITANCE_SPOUSE_VS_PARENTS;
  //       this.descriptive_text = intl.formatMessage({
  //         id: "REPORT.Inheritance.DescriptiveText6G",
  //       });
  //     }
  //   } else if (this.person.has_surviving_cohabitant()) {
  //     this.survivor = this.person._cohabitant;
  //     this.survivor_type = intl.formatMessage({
  //       id: "Report.Inheritance.survivorType2",
  //     });

  //     if (this.class_closest === undefined || this.class_closest > 3) {
  //       this.old_surviving_reference_paragraphs = intl.formatMessage({
  //         id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
  //       });
  //       this.surviving_reference_paragraphs.push(
  //         intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
  //         })
  //       );
  //       this.minimum_surviving_inheritance = 0;
  //       this.surviving_fraction = 1;
  //       this.descriptive_text = intl.formatMessage({
  //         id: "REPORT.Inheritance.DESC_COHABITANT_NO_CLOSE_RELATIVES",
  //       });
  //     } else if (this.class_closest === 1) {
  //       this.old_surviving_reference_paragraphs = intl.formatMessage({
  //         id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
  //       });
  //       this.surviving_reference_paragraphs.push(
  //         intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
  //         })
  //       );
  //       this.minimum_surviving_inheritance =
  //         InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN;
  //       this.surviving_fraction =
  //         InheritanceConstants.FRACTION_INHERITANCE_COHABITANT_VS_CHILDREN;
  //       this.descriptive_text = intl.formatMessage({
  //         id: "REPORT.Inheritance.DescriptiveText_firstClass_cohab_4G",
  //       });
  //     } else if (this.class_closest === 2) {
  //       this.old_surviving_reference_paragraphs = intl.formatMessage({
  //         id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
  //       });
  //       this.surviving_reference_paragraphs.push(
  //         intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
  //         })
  //       );
  //       this.minimum_surviving_inheritance =
  //         InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS;
  //       this.surviving_fraction =
  //         InheritanceConstants.FRACTION_INHERITANCE_COHABITANT_VS_PARENTS;
  //       this.descriptive_text = intl.formatMessage({
  //         id: "REPORT.Inheritance.DescriptiveText_secondClass_cohab_4G",
  //       });
  //     } else if (this.class_closest === 3) {
  //       if (this.distance_closest && this.distance_closest <= 2) {
  //         this.old_surviving_reference_paragraphs = intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
  //         });
  //         this.surviving_reference_paragraphs.push(
  //           intl.formatMessage({
  //             id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
  //           })
  //         );
  //         this.minimum_surviving_inheritance = 4 * InheritanceConstants.G;
  //         this.surviving_fraction = 0;
  //         this.descriptive_text = intl.formatMessage({
  //           id: "REPORT.Inheritance.DescriptiveText_thirdClass_cohab_4G",
  //         });
  //       } else {
  //         this.old_surviving_reference_paragraphs = intl.formatMessage({
  //           id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
  //         });
  //         this.surviving_reference_paragraphs.push(
  //           intl.formatMessage({
  //             id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
  //           })
  //         );
  //         this.minimum_surviving_inheritance = 0;
  //         this.surviving_fraction = 1;
  //         this.descriptive_text = intl.formatMessage({
  //           id: "REPORT.Inheritance.DESC_COHABITANT_NO_CLOSE_RELATIVES_2",
  //         });
  //       }
  //     }
  //   } else {
  //     this.survivor = null;
  //     this.surviving_reference_paragraphs = [];
  //     this.minimum_surviving_inheritance = 0;
  //     this.surviving_fraction = 0;
  //     this.descriptive_text = intl.formatMessage({
  //       id: "REPORT.Inheritance.DESC_NO_SPOUSE_OR_COHABITANT",
  //     });
  //   }
  // };

  // compute_default_genealogy_splits_with_chains = (person: number) => {
  //   //
  //   const personNode = getNode(person, this.state.nodeMap);
  //   const personDetail = getPerson(person, this.state.personsMap);
  //   const [closest_class, closest_distance] =
  //     get_class_and_distance_closest_surviving_relative(personNode, this.state);
  //   if (closest_class === 1) {
  //     return this.reportUtils.split_evenly_between_lines(personNode._children);
  //   } else if (closest_class === 2) {
  //     const firstParentNode = getNode(
  //       personNode._parents[0],
  //       this.state.nodeMap
  //     );
  //     if (
  //       !personDetail._underAge ||
  //       firstParentNode._spouse === personNode._parents[1]
  //     ) {
  //       return this.reportUtils.split_evenly_between_lines(personNode._parents);
  //     } else
  //       return this.reportUtils.split_evenly_between_lines(
  //         personNode._parents,
  //         undefined,
  //         true
  //       );
  //   } else if (closest_class === 3) {
  //     const grandparent_splits = [];
  //     for (const parent of personNode._parents) {
  //       const parentNode = getNode(parent, this.state.nodeMap);
  //       grandparent_splits.push(
  //         this.reportUtils.split_evenly_between_lines(parentNode._parents, 2)
  //       );
  //     }
  //     const tempArray = [];
  //     for (const a of grandparent_splits) {
  //       if (a.length > 0) {
  //         tempArray.push(a);
  //       }
  //     }
  //     const num = tempArray.length;

  //     const temp_list = [];
  //     for (const split of grandparent_splits) {
  //       if (split.length > 0) {
  //         temp_list.push([split[0]]);
  //       }
  //     }
  //     const resultList = [];
  //     for (const item of temp_list) {
  //       resultList.push([item[0], item[1] / num, item[2]]);
  //     }
  //     return resultList;
  //   } else if (closest_class === undefined || closest_class > 3) {
  //     return [];
  //   }
  // };

  // computeGenealogyInheritance = (person_id: number) => {
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
  //       this.compute_default_genealogy_splits_with_chains(person_id);
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

import ActionProvider from "../ChatbotComponent/ActionProvider";
import { ChatbotInterface } from "../ChatbotComponent/Generics";
import { NodeEntity } from "../ChatbotComponent/Helper/Classes/NodeEntity";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
import InheritanceConstants from "../ChatbotComponent/Helper/Methods/InheritanceConstants";
import Person from "../ChatbotComponent/Helper/Classes/Person";
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
export class InheritanceCalculation implements InheritanceCalculationInterface {
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
  genealogy_inheritance: [] = [];
  genealogy_splits: [] = [];
  will: string | undefined;
  constructor(state: ChatbotInterface, will = undefined) {
    this.state = state;
    this.ActionProvider = ActionProvider;
    this.InheritanceConstants = InheritanceConstants;
    this.person = state.person;
    this.will = will;
  }

  computeInheritance = () => {
    [this.class_closest, this.distance_closest] =
      this.ActionProvider.get_class_and_distance_closest_surviving_relative(
        this.state.testator
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
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DESC_SPOUSE_NO_CLOSE_RELATIVES",
        });
      } else if (this.class_closest === 1) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_6forste",
        });
        this.surviving_reference_paragraphs = intl.formatMessage({
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
        this.surviving_reference_paragraphs = intl.formatMessage({
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
        id: "Report.Inheritance.survivorType2",
      });

      if (this.class_closest === undefined || this.class_closest > 3) {
        this.old_surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste",
        });
        this.surviving_reference_paragraphs = intl.formatMessage({
          id: "REPORT.Inheritance.old_surviving_reference_paragraphs_12forste",
        });
        this.minimum_surviving_inheritance = 0;
        this.surviving_fraction = 1;
        this.descriptive_text = intl.formatMessage({
          id: "REPORT.Inheritance.DESC_COHABITANT_NO_CLOSE_RELATIVES",
        });
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
          id: "REPORT.Inheritance.DescriptiveText_firstClass4G",
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
          id: "REPORT.Inheritance.DescriptiveText_secondClass4G",
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
            id: "REPORT.Inheritance.DescriptiveText_thirdClass4G",
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
          this.descriptive_text = intl.formatMessage({
            id: "REPORT.Inheritance.DESC_COHABITANT_NO_CLOSE_RELATIVES_2",
          });
        }
      }
    } else {
      this.survivor = null;
      this.surviving_reference_paragraphs = "";
      this.minimum_surviving_inheritance = 0;
      this.surviving_fraction = 0;
      this.descriptive_text = intl.formatMessage({
        id: "REPORT.Inheritance.DESC_NO_SPOUSE_OR_COHABITANT",
      });
    }
  };

  computeSurvivorInheritanceSum = () => {
    return Math.min(
      this.state.netWealth,
      Math.max(
        this.minimum_surviving_inheritance,
        this.surviving_fraction * this.state.netWealth
      )
    );
  };

  // computeGenealogyInheritance = () => {
  //   const genealogy_inheritance_sum =
  //     this.state.netWealth - this.survivor_inheritance_sum;
  //   if (this.genealogy_inheritance_sum !== 0) {
  //     this.splits_with_chains =
  //       this.compute_default_genealogy_splits_with_chains(this.person);
  //     const genealogy_splits = this.combine_duplicates(this.splits_with_chains);
  //     const genealogy_inheritance = [];
  //     for (const genealogy_split of genealogy_splits) {
  //       genealogy_inheritance.push([
  //         genealogy_split[0],
  //         genealogy_split[1] * genealogy_inheritance_sum,
  //         genealogy_split[2],
  //       ]);
  //     }
  //   } else {
  //     this.splits_with_chains = [];
  //     this.genealogy_splits = [];
  //     this.genealogy_inheritance = [];
  //   }
  // };

  // compute_default_genealogy_splits_with_chains = (person: NodeEntity): [] => {
  //   const personEntity = Person.getPerson(person._id, this.state.personsMap);
  //   const [closest_class, closest_distance] =
  //     this.ActionProvider.get_class_and_distance_closest_surviving_relative(
  //       person
  //     );
  //   if (closest_class == 1)
  //     return this.split_evenly_between_lines(person._children);
  //   else if (closest_class == 2) {
  //     if (
  //       !personEntity._underAge ||
  //       NodeEntity.getNode(person._parents[0], this.state.nodeMap)._spouse ==
  //         person._parents[1]
  //     ) {
  //       return this.split_evenly_between_lines(person._parents);
  //     } else {
  //       return this.split_evenly_between_lines(
  //         person._parents,
  //         undefined,
  //         true
  //       );
  //     }
  //   } else if (closest_class == 3) {
  //     const grandparent_splits = [];
  //     for (const parent of person._parents) {
  //       grandparent_splits.push([
  //         this.split_evenly_between_lines(
  //           NodeEntity.getNode(parent, this.state.nodeMap)._parents,
  //           2
  //         ),
  //       ]);
  //     }
  //     const temp_list = [];
  //     for (const a of grandparent_splits) {
  //       if (a.length > 0) {
  //         temp_list.push([a]);
  //       }
  //     }
  //     const num = temp_list.length;

  //     const splitList = [];
  //     for (const split of grandparent_splits) {
  //       if (split.length > 0) {
  //         for (const splitContents of split[0]) {
  //           splitList.push([
  //             splitContents[0],
  //             splitContents[1] / num,
  //             splitContents[2],
  //           ]);
  //         }
  //       }
  //     }
  //     // @ts-ignore
  //     return splitList;
  //   } else if (closest_class === undefined || closest_class > 3) return [];
  //   return [];
  // };

  //   split_evenly_between_lines = (
  //     person_list: Array<number>,
  //     maximum_distance: undefined | number = undefined,
  //     allow_parents = false
  //   ): [] => {
  //     const split_fraction_list: [] = [];
  //     if (person_list.length == 0) {
  //       return split_fraction_list;
  //     }
  //     const split_frac = 1 / person_list.length;

  //     for (const person of person_list) {
  //       const personNode = NodeEntity.getNode(person, this.state.nodeMap);
  //       const personEntity = Person.getPerson(person, this.state.personsMap);
  //       let split_fraction_list: [] = [];
  //       if (personEntity._deceased) {
  //         if (maximum_distance == 0) {
  //           console.log("pass");
  //         } else if (
  //           this.ActionProvider.get_class_and_distance_closest_surviving_relative(
  //             person
  //           )[1] != 1
  //         ) {
  //           if (allow_parents) {
  //             const temp_list: [] = this.split_evenly_between_lines(
  //               personNode._parents
  //             );
  //             let level_sum = 0;

  //             for (const tempListContent of temp_list) {
  //               if (tempListContent[1]) level_sum += tempListContent[1];
  //             }
  //             if (level_sum != 1) {
  //               const resultList = [];

  //               for (const tempListContent of temp_list) {
  //                 resultList.push([
  //                   tempListContent[0],
  //                   tempListContent[1] / level_sum,
  //                   tempListContent[2],
  //                 ]);
  //               }
  //               const temp_split_fraction_list: [] = [];

  //               for (const tempListContent of temp_list) {
  //                 temp_split_fraction_list.push([
  //                   tempListContent[0],
  //                   tempListContent[1] * split_frac,
  //                   tempListContent[2] + [personNode._id],
  //                 ]);
  //               }
  //               split_fraction_list = [
  //                 ...split_fraction_list,
  //                 ...temp_split_fraction_list,
  //               ];
  //             } else {
  //               console.log("pass");
  //             }
  //           } else {
  //             const temp_list = this.split_evenly_between_lines(
  //               personNode._children
  //             );
  //             let level_sum = 0;

  //             for (const tempListContent of temp_list) {
  //               level_sum += tempListContent[1];
  //             }
  //             if (level_sum != 1) {
  //               for (const tempListContent of temp_list) {
  //                 temp_list.push([
  //                   tempListContent[0],
  //                   tempListContent[1] / level_sum,
  //                   tempListContent[2],
  //                 ]);
  //               }
  //             }
  //             const temp_split_fraction_list = [];

  //             for (const tempListContent of temp_list) {
  //               temp_split_fraction_list.push([
  //                 tempListContent[0],
  //                 tempListContent[1] * split_frac,
  //                 tempListContent[2] + [personNode._id],
  //               ]);
  //             }

  //             split_fraction_list = [...split_fraction_list,
  //               ...temp_split_fraction_list

  //             ]
  //         }
  //       } else {
  //         split_fraction_list.push([person, split_frac, []]);
  //       }
  //     }
  //     let level_sum = 0;

  //     for (const splitFractionListContent of split_fraction_list) {
  //       level_sum = level_sum + splitFractionListContent[1];
  //     }
  //     if (level_sum != 1) {
  //       for (const splitFractionListContent of split_fraction_list) {
  //         split_fraction_list.push([
  //           splitFractionListContent[0],
  //           splitFractionListContent[1] / level_sum,
  //           splitFractionListContent[2],
  //         ]);
  //       }
  //     }
  //     return split_fraction_list;
  //   };

  //   combine_duplicates = (inheritance_fraction_list: []): [] => {
  //     const temp_set = new Set();
  //     for (let i in inheritance_fraction_list) {
  //       temp_set.add([inheritance_fraction_list[i][0]]);
  //     }

  //     for (let i in temp_set) {
  //       temp_set[i]

  //     }

  //   };
}

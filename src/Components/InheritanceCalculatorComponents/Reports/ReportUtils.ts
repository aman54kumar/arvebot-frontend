import ActionProvider from "../ChatbotComponent/ActionProvider";
import { ChatbotInterface } from "../ChatbotComponent/Generics";
import Person from "../ChatbotComponent/Helper/Classes/Person";
import {
  inheritanceFractionListType,
  splits_initial,
} from "./InheritanceCalculation";

import _ from "lodash";

export class ReportUtils {
  ActionProvider: ActionProvider;
  state: ChatbotInterface;
  constructor(actionProvider: any, state: ChatbotInterface) {
    this.ActionProvider = actionProvider;
    this.state = state;
  }

  combine_duplicates = (
    inheritance_fraction_list: Array<inheritanceFractionListType>
  ): any => {
    const combinedDuplicates_inheritance_fraction_list: Array<inheritanceFractionListType> =
      [];
    const inheritance_fraction_person_set = new Set();
    for (const inheritance_fraction of inheritance_fraction_list) {
      inheritance_fraction_person_set.add(inheritance_fraction.person);
    }

    if (inheritance_fraction_person_set.size > 0) {
      inheritance_fraction_list.forEach((inheritance_fraction) => {
        let frac_sum = 0;
        const chain_array: Array<string> = [];
        if (inheritance_fraction_person_set.has(inheritance_fraction.person)) {
          frac_sum += inheritance_fraction.frac;
          chain_array.concat(inheritance_fraction.chains);
        }
        combinedDuplicates_inheritance_fraction_list.push({
          person: inheritance_fraction.person,
          frac: frac_sum,
          chains: chain_array,
        });
      });
    } else {
      combinedDuplicates_inheritance_fraction_list.push(splits_initial);
    }
    return combinedDuplicates_inheritance_fraction_list;
  };

  split_evenly_between_lines = (
    person_list: Array<number>,
    maximum_distance: number | undefined = undefined,
    allow_parents = false
  ): any[] => {
    let split_fraction_list: any[] = [];
    if (person_list.length === 0) {
      return split_fraction_list;
    }

    const split_frac = 1 / person_list.length;

    for (const person of person_list) {
      const personDetail: Person = this.ActionProvider.getPerson(
        person,
        this.state.personsMap
      );
      const personNode = this.ActionProvider.getNode(
        person,
        this.state.nodeMap
      );
      if (personDetail._deceased) {
        if (maximum_distance === 0) {
          // pass
        } else if (
          this.ActionProvider.get_class_and_distance_closest_surviving_relative(
            personNode,
            this.state
          )[1] !== 1
        ) {
          if (allow_parents) {
            let temp_list: inheritanceFractionListType[] =
              this.split_evenly_between_lines(personNode._parents);
            let level_sum = 0;
            for (const item of temp_list) {
              level_sum += item.frac;
            }
            const interm_temp_list: inheritanceFractionListType[] = [
              splits_initial,
            ];
            if (level_sum !== 1) {
              for (const item of temp_list) {
                interm_temp_list.push({
                  person: item.person,
                  frac: item.frac / level_sum,
                  chains: item.chains,
                });
              }
              temp_list = interm_temp_list;
            }

            const temp_split_fraction_list: any[] = [];
            for (const item of temp_list) {
              temp_split_fraction_list.push({
                person: item.person,
                frac: item.frac * split_frac,
                chains: item.chains.concat([personDetail._personName]),
              });
            }
            split_fraction_list = split_fraction_list.concat(
              temp_split_fraction_list
            );
          } else {
            // pass
          }
        } else {
          let temp_list: Array<inheritanceFractionListType> =
            this.split_evenly_between_lines(personNode._children);
          const temp_fraction_list: Array<any> = [];
          let level_sum = 0;
          for (const item of temp_list) {
            level_sum += item.frac;
          }
          if (level_sum !== 1) {
            for (const item of temp_list) {
              temp_fraction_list.push({
                person: item.person,
                frac: item.frac / level_sum,
                chains: item.chains.concat([personDetail._personName]),
              });
            }
            temp_list = temp_fraction_list;
          }
          const temp_split_fraction_list: any = [];
          for (const item of temp_list) {
            temp_split_fraction_list.push({
              person: item.person,
              frac: item.frac * split_frac,
              chains: item.chains.concat([personDetail._personName]),
            });
          }
          split_fraction_list = split_fraction_list.concat(
            temp_split_fraction_list
          );
        }
      } else {
        split_fraction_list.push({
          person: personDetail._personName,
          frac: split_frac,
          chains: [],
        });
      }
    }
    let level_sum = 0;
    for (const item of split_fraction_list) {
      level_sum += item.frac;
    }

    if (level_sum !== 1) {
      const temp_split_fraction_list: any = [];
      for (const item of split_fraction_list) {
        temp_split_fraction_list.push({
          person: item.person,
          frac: item.frac / level_sum,
          chains: item.chains,
        });
      }
      split_fraction_list = split_fraction_list.concat(
        temp_split_fraction_list
      );
    }

    if (_.isEqual(split_fraction_list, [splits_initial])) return [];
    return split_fraction_list;
  };

  compute_default_genealogy_splits_with_chains = (person: number): any => {
    const personNode = this.ActionProvider.getNode(person, this.state.nodeMap);
    const personObject = this.ActionProvider.getPerson(
      person,
      this.state.personsMap
    );
    const class_closest =
      this.ActionProvider.get_class_and_distance_closest_surviving_relative(
        personNode,
        this.state
      )[0];
    if (class_closest === 1) {
      return this.split_evenly_between_lines(personNode._children);
    } else if (class_closest === 2) {
      const firstParentSpouse = this.ActionProvider.getNode(
        personNode._parents[0],
        this.state.nodeMap
      )._spouse;
      if (
        !personObject._underAge ||
        firstParentSpouse === personNode._parents[1]
      ) {
        return this.split_evenly_between_lines(personNode._parents);
      } else {
        return this.split_evenly_between_lines(
          personNode._parents,
          undefined,
          true
        );
      }
    } else if (class_closest === 3) {
      const grandParent_splits = [];
      personNode._parents.map((parent: number) => {
        const parentNode = this.ActionProvider.getNode(
          parent,
          this.state.nodeMap
        );
        grandParent_splits.push(
          this.split_evenly_between_lines(parentNode._parents, 2)
        );
      });
    } else if (class_closest === undefined || class_closest > 3) return [];
  };
}

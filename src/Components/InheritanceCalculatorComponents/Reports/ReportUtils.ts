import ActionProvider from "../ChatbotComponent/ActionProvider";
import { ChatbotInterface } from "../ChatbotComponent/Generics";
import Person from "../ChatbotComponent/Helper/Classes/Person";

import _ from "lodash";
import { inheritanceFractionType } from "./ReportCalculationBase";
import {
  getNode,
  getPerson,
  get_class_and_distance_closest_surviving_relative,
} from "../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";

const manipulateDuplicatedMapArray = (
  duplicatedMapArray: Array<inheritanceFractionType>
) => {
  const resultingArray = [];
  const personValue = duplicatedMapArray[0].person;
  const fracSum = duplicatedMapArray.reduce((accumulator, item) => {
    return accumulator + item.frac;
  }, 0);
  const chainsValue = duplicatedMapArray.reduce((arr: any[], curr) => {
    arr.push(curr.chains);
    return arr;
  }, []);

  resultingArray.push({
    person: personValue,
    frac: fracSum,
    chains: chainsValue,
  });

  return resultingArray;
};

export const combine_duplicates = (
  inheritance_fraction_list: Array<inheritanceFractionType>
): Array<inheritanceFractionType> => {
  const duplicateArrayPersonMap = new Map<
    string,
    Array<inheritanceFractionType>
  >();
  let combinedArray: Array<inheritanceFractionType> = [];

  for (const inheritance_fraction of inheritance_fraction_list) {
    if (!duplicateArrayPersonMap.has(inheritance_fraction.person)) {
      duplicateArrayPersonMap.set(inheritance_fraction.person, [
        inheritance_fraction,
      ]);
    } else {
      const tempInheritanceFractionList = duplicateArrayPersonMap.get(
        inheritance_fraction.person
      );
      tempInheritanceFractionList?.push(inheritance_fraction);
      if (tempInheritanceFractionList !== undefined) {
        duplicateArrayPersonMap.set(
          inheritance_fraction.person,
          tempInheritanceFractionList
        );
      }
    }
  }

  for (const key of duplicateArrayPersonMap.keys()) {
    const currentValue = duplicateArrayPersonMap.get(key);
    if (currentValue !== undefined) {
      combinedArray = manipulateDuplicatedMapArray(currentValue);
    }
  }
  return combinedArray;
};

export const split_evenly_between_lines = (
  actionProvider: ActionProvider,
  state: ChatbotInterface,
  person_list: Array<number>,
  maximum_distance: number | undefined = undefined,
  allow_parents = false
): inheritanceFractionType[] => {
  let split_fraction_list: inheritanceFractionType[] = [];
  if (person_list.length === 0) {
    return split_fraction_list;
  }

  const split_frac = 1 / person_list.length;

  for (const person of person_list) {
    const personDetail: Person = getPerson(person, state.personsMap);
    const personNode = getNode(person, state.nodeMap);
    if (personDetail._deceased) {
      if (maximum_distance === 0) {
        // pass
      } else if (
        get_class_and_distance_closest_surviving_relative(
          personNode,
          state
        )[1] !== 1
      ) {
        if (allow_parents) {
          let temp_list: inheritanceFractionType[] = split_evenly_between_lines(
            actionProvider,
            state,
            personNode._parents
          );
          let level_sum = 0;
          for (const item of temp_list) {
            level_sum += item.frac;
          }
          const interm_temp_list: inheritanceFractionType[] = [];
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

          const temp_split_fraction_list: Array<inheritanceFractionType> = [];
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
          return [];
        }
      } else {
        let temp_list = split_evenly_between_lines(
          actionProvider,
          state,
          personNode._children
        );
        const temp_fraction_list: Array<inheritanceFractionType> = [];
        let level_sum = 0;
        for (const item of temp_list) {
          level_sum += item.frac;
        }
        if (level_sum !== 1) {
          temp_list.map((temp_list_item) => {
            temp_fraction_list.push({
              person: temp_list_item.person,
              frac: temp_list_item.frac / level_sum,
              chains: temp_list_item.chains,
            });
          });
          temp_list = temp_fraction_list;
        }
        const temp_split_fraction_list: Array<inheritanceFractionType> = [];
        temp_list.map((temp_list_item) => {
          temp_split_fraction_list.push({
            person: temp_list_item.person,
            frac: temp_list_item.frac * split_frac,
            chains: temp_list_item.chains.concat(personDetail._personName),
          });
        });

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
    const temp_split_fraction_list: Array<inheritanceFractionType> = [];
    for (const item of split_fraction_list) {
      temp_split_fraction_list.push({
        person: item.person,
        frac: item.frac / level_sum,
        chains: item.chains,
      });
    }
    split_fraction_list = split_fraction_list.concat(temp_split_fraction_list);
  }

  if (_.isEqual(split_fraction_list, [])) return [];
  return split_fraction_list;
};

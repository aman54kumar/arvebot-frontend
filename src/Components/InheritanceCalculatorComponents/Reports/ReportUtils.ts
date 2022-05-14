import { ChatbotInterface } from "../ChatbotComponent/Generics";

export class ReportUtils {
  actionProvider: any;
  state: ChatbotInterface;
  constructor(actionProvider: any, state: ChatbotInterface) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  combine_duplicates = (inheritance_fraction_list: Array<any>): Array<any> => {
    const combinedList = new Map<number, any>();
    for (const inheritanceFraction of inheritance_fraction_list) {
      if (combinedList.has(inheritanceFraction[0])) {
        const x = combinedList.get(inheritanceFraction[0]);
        if (x) {
          x.frac += inheritanceFraction[1];
          x.chains.push(inheritanceFraction[2]);
        }
      } else {
        combinedList.set(inheritanceFraction[0], {
          person: inheritanceFraction[0],
          frac: inheritanceFraction[1],
          chains: [inheritanceFraction[2]],
        });
      }
    }
    const resultArray = Array.from(combinedList.values());
    const arrayOfObjects = [];
    for (const rArray of resultArray) {
      arrayOfObjects.push(rArray);
    }
    return arrayOfObjects;
  };

  split_evenly_between_lines = (
    person_list: Array<number>,
    maximum_distance: number | undefined = undefined,
    allow_parents = false
  ): any => {
    let split_fraction_list = new Array<any>();
    if (person_list.length === 0) {
      return split_fraction_list;
    }

    const split_frac = 1 / person_list.length;

    for (const person of person_list) {
      const personDetail = this.actionProvider.getPerson(
        person,
        this.state.personsMap
      );
      const personNode = this.actionProvider.getNode(
        person,
        this.state.nodeMap
      );
      if (personDetail._deceased) {
        if (maximum_distance === 0) {
          // pass
        } else if (
          this.actionProvider.get_class_and_distance_closest_surviving_relative(
            personNode,
            this.state
          )[1] !== 1
        ) {
          if (allow_parents) {
            let temp_list: any = this.split_evenly_between_lines(
              personNode._parents
            );
            let level_sum = 0;
            for (const item of temp_list) {
              level_sum += item[1];
            }
            const interm_temp_list: typeof temp_list = [];
            if (level_sum !== 1) {
              for (const item of temp_list) {
                interm_temp_list.push[(item[0], item[1] / level_sum, item[2])];
              }
              temp_list = interm_temp_list;
            }

            const temp_split_fraction_list: typeof split_fraction_list = [];
            for (const item of temp_list) {
              temp_split_fraction_list.push([
                item[0],
                item[1] * split_frac,
                item[2] + [personDetail._personName],
              ]);
            }
            split_fraction_list = split_fraction_list.concat(
              temp_split_fraction_list
            );
          } else {
            // pass
          }
        } else {
          let temp_list: Array<any> = this.split_evenly_between_lines(
            personNode._children
          );
          const temp_fraction_list: Array<any> = [];
          let level_sum = 0;
          for (const item of temp_list) {
            level_sum += item[1];
          }
          if (level_sum !== 1) {
            for (const item of temp_list) {
              temp_fraction_list.push([
                item[0],
                item[1] / level_sum,
                item[2].concat([personDetail._personName]),
              ]);
            }
            temp_list = temp_fraction_list;
          }
          const temp_split_fraction_list: any = [];
          for (const item of temp_list) {
            temp_split_fraction_list.push([
              item[0],
              item[1] * split_frac,
              item[2] + [personDetail._personName],
            ]);
          }
          split_fraction_list = split_fraction_list.concat(
            temp_split_fraction_list
          );
          console.log(split_fraction_list);
        }
      } else {
        split_fraction_list.push([person, split_frac, []]);
      }
    }
    let level_sum = 0;
    for (const item of split_fraction_list) level_sum += item[1];

    if (level_sum !== 1) {
      const temp_split_fraction_list: any = [];
      for (const item of split_fraction_list) {
        temp_split_fraction_list.push([item[0], item[1] / level_sum, item[2]]);
      }
      split_fraction_list = split_fraction_list.concat(
        temp_split_fraction_list
      );
    }
    return split_fraction_list;
  };

  compute_default_genealogy_splits_with_chains = (person: number): any => {
    const personNode = this.actionProvider.getNode(person, this.state.nodeMap);
    const [class_closest, distance_closest] =
      this.actionProvider.get_class_and_distance_closest_surviving_relative(
        personNode
      );
    if (class_closest === 1) {
      return this.split_evenly_between_lines(personNode._children);
    } else if (class_closest === 2) {
      const firstParentSpouse = this.actionProvider.getNode(
        personNode._parents[0],
        this.state.nodeMap
      )._spouse;
      if (
        !personNode._underAge ||
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
        const parentNode = this.actionProvider.getNode(
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

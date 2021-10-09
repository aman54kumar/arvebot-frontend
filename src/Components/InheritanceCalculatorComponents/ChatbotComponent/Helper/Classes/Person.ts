export default class Person {
  _personID = "";
  _undividedEstateSpouse: Person | undefined;
  _deceased = false;
  _spouse: Person | undefined;
  _cohabitant: Person | undefined;
  _parents: Array<Person> = [];
  _children: Array<Person> = [];
  _childrenRearing: boolean | undefined;
  _underAge: boolean | undefined;

  constructor(id: string) {
    this._personID = id;
  }

  get person_id(): string {
    return this._personID;
  }

  set person_id(value: string) {
    this._personID = value;
  }

  get deceased(): boolean {
    return this._deceased;
  }

  set deceased(value: boolean) {
    this._deceased = value;
  }

  get undividedEstateSpouse(): Person | undefined {
    return this._undividedEstateSpouse;
  }

  set undividedEstateSpouse(value: Person | undefined) {
    this._undividedEstateSpouse = value;
  }

  get spouse(): Person | undefined {
    return this._spouse;
  }

  set_spouse = (spouse: Person, add_for_both = true): void => {
    if (!this._spouse) console.log(this._spouse == spouse);
    else this._spouse = spouse;
    if (add_for_both) spouse.set_spouse(this, false);
  };

  hasSurvivingSpouse = (): boolean => {
    if (this._spouse !== undefined && !this._spouse._deceased) return true;
    else return false;
  };

  get cohabitant(): Person | undefined {
    return this._cohabitant;
  }

  set_cohabitant = (cohabitant: Person, add_for_both = true): void => {
    if (!this._cohabitant) console.log(this._cohabitant == cohabitant);
    else this._cohabitant = cohabitant;
    if (add_for_both) cohabitant.set_cohabitant(this, false);
  };

  has_surviving_cohabitant_with_common_child = (): boolean => {
    if (this._cohabitant && !this._cohabitant._deceased) {
      for (const child of this._children) {
        if (this._cohabitant._children.includes(child)) return true;
      }
      return false;
    } else return false;
  };

  has_surviving_cohabitant_without_common_child = (): boolean => {
    if (this._cohabitant && !this._cohabitant._deceased) {
      for (const child of this._children) {
        if (this._cohabitant._children.includes(child)) return false;
      }
      return true;
    } else return false;
  };

  has_surviving_cohabitant(): boolean {
    if (this._cohabitant && !this._cohabitant._deceased) return true;
    else return false;
  }

  get parents(): Person[] | undefined {
    return this._parents;
  }

  add_parent = (parent: Person, add_for_both = true): void => {
    if (!this._parents.includes(parent)) {
      console.log(parent);
      console.log(this._parents);

      this._parents.push(parent);
    }
    if (add_for_both) {
      parent.add_child(this, false);
    }
  };

  get children(): Array<Person> {
    return this._children;
  }

  add_child = (child: Person, add_for_both = true): void => {
    console.log(this);

    const children_array = this._children;
    const child_id = child._personID;
    if (!children_array.find((obj) => obj._personID === child_id)) {
      this._children.push(child);
    }
    if (add_for_both) {
      child.add_parent(this, false);
    }
  };

  surviving_successor_distance = (): number | undefined => {
    if (this._deceased === false) return 0;
    else if (this._children.length === 0) return undefined;
    else {
      const possible_distances: Array<number> = [];
      for (const child of this._children) {
        const temp = child.surviving_successor_distance();
        if (temp != undefined) {
          possible_distances.push(1 + temp);
        }
      }
      if (possible_distances.length === 0) return undefined;
      else return Math.min(...possible_distances);
    }
  };

  get_class_and_distance_closest_surviving_relative = (): [
    number | undefined,
    number | undefined
  ] => {
    const distance = this.surviving_successor_distance();
    if (distance !== undefined) return [1, this.surviving_successor_distance()];
    else if (this._parents.length == 0) return [undefined, undefined];
    else {
      const alternatives: Array<Array<number | undefined>> = [];
      for (const parent of this._parents) {
        alternatives.push(
          parent.get_class_and_distance_closest_surviving_relative()
        );
      }

      alternatives.sort((a, b) => {
        if (a[0] != undefined && b[0] != undefined) return a[0] - b[0];
        if (a[0] == undefined && b[0] != undefined) return 1;
        return -1;
      });
      const [closest_alternative_class, closest_alternative_distance] =
        alternatives[0];

      if (closest_alternative_class == undefined) {
        return [undefined, undefined];
      }
      return [closest_alternative_class + 1, closest_alternative_distance];
    }
  };
}

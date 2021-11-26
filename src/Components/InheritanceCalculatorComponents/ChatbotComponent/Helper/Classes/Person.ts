export enum ParentChildSelector {
  child = 0,
  parent = 1,
  testator = -1,
  grandParent = 2,
}

export default class Person {
  _id: number;
  _personID = "";
  _undividedEstateSpouse: Person | undefined;
  _deceased = false;
  _spouse: Person | undefined;
  _cohabitant: Person | undefined;
  _childrenRearing: boolean | undefined;
  _underAge: boolean | undefined;

  constructor(personid: string, id = 1) {
    this._personID = personid;
    this._id = id;
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

  // has_surviving_cohabitant_with_common_child = (): boolean => {
  //   if (this._cohabitant && !this._cohabitant._deceased) {
  //     for (const child of this._children) {
  //       if (this._cohabitant._children.includes(child)) return true;
  //     }
  //     return false;
  //   } else return false;
  // };

  // has_surviving_cohabitant_without_common_child = (): boolean => {
  //   if (this._cohabitant && !this._cohabitant._deceased) {
  //     for (const child of this._children) {
  //       if (this._cohabitant._children.includes(child)) return false;
  //     }
  //     return true;
  //   } else return false;
  // };

  has_surviving_cohabitant(): boolean {
    if (this._cohabitant && !this._cohabitant._deceased) return true;
    else return false;
  }

  // get parents(): Person[] | undefined {
  //   return this._parents;
  // }

  // add_parent = (
  //   parent: Person,
  //   childOrParent: number,

  //   add_for_both = true
  // ): void => {
  //   const parentsArray = this._parents;
  //   const parent_id = parent._personID;
  //   if (
  //     !parentsArray.find((obj) => obj._personID === parent_id) &&
  //     parentsArray.length < 3
  //   ) {
  //     this._parents.push(parent);
  //   }
  //   if (add_for_both) {
  //     parent._childrenIDList = [...this._childrenIDList];
  //     parent._childrenIDList.push([ParentChildSelector.child, this._id]);
  //   }
  // };

  // get_parent_child = (
  //   rootPerson: Person,
  //   currentPosition: number
  // ): Person | null => {
  //   let list: Array<Person> = [];

  //   if (currentPosition == this._parentsIDList.length) {
  //     return rootPerson;
  //   }
  //   if (currentPosition > this._parentsIDList.length) {
  //     return null;
  //   }
  //   if (this._parentsIDList[currentPosition][0] == ParentChildSelector.child) {
  //     list = rootPerson._children;
  //   } else {
  //     list = rootPerson._parents;
  //   }
  //   const c = list.filter((child) => {
  //     return child._id == this._parentsIDList[currentPosition][1];
  //   });
  //   if (c.length == 0) {
  //     console.error("invalid parent");
  //     return null;
  //   }
  //   return this.get_parent_child(c[0], currentPosition + 1);
  // };

  // get children(): Array<Person> {
  //   return this._children;
  // }

  // add_child = (child: Person, add_for_both = true): void => {
  //   const children_array = this._children;
  //   const child_id = child._personID;
  //   if (!children_array.find((obj) => obj._personID === child_id)) {
  //     this._children.push(child);
  //   }
  //   if (add_for_both) {
  //     child._parentsIDList = [...this._parentsIDList];
  //     child._parentsIDList.push([ParentChildSelector.child, this._id]);
  //   }
  // };
}

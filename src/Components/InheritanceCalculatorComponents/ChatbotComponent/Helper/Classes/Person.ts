export default class Person {
  _id: number;
  _personName = "";
  _undividedEstateSpouse: Person | undefined;
  _deceased = false;
  _spouse: Person | undefined;
  _cohabitant: Person | undefined;
  _childrenRearing: boolean | undefined;
  _underAge: boolean | undefined;

  constructor(personid: string, id = 1) {
    this._personName = personid;
    this._id = id;
  }

  get person_id(): string {
    return this._personName;
  }

  set person_id(value: string) {
    this._personName = value;
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

  static getPerson = (id: number, personMap: Map<number, Person>) => {
    const person: Person | undefined = personMap.get(id);
    if (person == undefined) {
      throw new Error("Person not found with given id:" + id);
    }
    return person;
  };

  has_surviving_cohabitant(): boolean {
    if (this._cohabitant && !this._cohabitant._deceased) return true;
    else return false;
  }
}

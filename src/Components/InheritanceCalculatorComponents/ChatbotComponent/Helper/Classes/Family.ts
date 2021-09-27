import Person from "./Person";

class Family {
  _person_dict: Record<string, Person>;

  constructor() {
    this._person_dict = {};
  }

  get_or_create_person(personID: string): Person {
    if (personID in Object.keys(this._person_dict)) {
      return this._person_dict[personID];
    } else {
      const person = new Person(personID);
      this._person_dict[personID] = person;
      return person;
    }
  }
}

export default Family;

import Person from "./Person";

export default class Child {
  _personID = "";
  _deceased = false;
  _parents = "";
  _children: Array<Person | Child | undefined> = [];
}

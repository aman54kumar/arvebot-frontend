import { ParentChildSelector } from "./Person";

export class NodeEntity {
  _id: number;
  _level: number;
  _path: Array<[number, number]>;
  _parents: Array<number>;
  _children: Array<number>;
  _spouse: number | null;
  _cohabitant: number | null;

  constructor(id: number, level: number) {
    this._id = id;
    this._level = level;
    this._path = [];
    this._parents = [];
    this._children = [];
    this._spouse = null;
    this._cohabitant = null;
  }

  setPath(prevPath: Array<[number, number]>) {
    this._path = prevPath;
  }
  getParentId() {
    if (this._path.length - 2 < 0) {
      return null;
    }
    return this._path[this._path.length - 2][1];
  }

  add_child = (child: NodeEntity, add_for_both = true): void => {
    const children_array = this._children;
    const child_id = child._id;
    if (!children_array.find((obj) => obj === child_id)) {
      this._children.push(child_id);
    }
    child._path = [...this._path];
    child._path.push([ParentChildSelector.child, child_id]);
    if (add_for_both) {
      if (!child._parents.find((obj) => obj === this._id)) {
        child._parents.push(this._id);
      }
    }
  };

  add_parent = (parent: NodeEntity, add_for_both = true): void => {
    const parents_array = this._parents;
    const parent_id = parent._id;
    if (!parents_array.find((obj) => obj === parent_id)) {
      this._parents.push(parent_id);
    }
    parent._path = [...this._path];
    parent._path.push([ParentChildSelector.parent, parent_id]);
    if (add_for_both) {
      if (!parent._children.find((obj) => obj === this._id)) {
        parent._children.push(this._id);
      }
    }
  };

  
}

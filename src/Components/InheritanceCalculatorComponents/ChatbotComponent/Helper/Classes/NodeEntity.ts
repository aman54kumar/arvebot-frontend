import { ParentChildSelector } from "../Enums/ParentChildSelector";

export class NodeEntity {
  _id: number;
  _level: number;
  _path: Array<[number, number]>;
  _parents: Array<number>;
  _children: Array<number>;
  _spouse: number | null;
  _cohabitant: number | null;
  _undividedEstateSpouse: number | null;
  _relationshipMap: Map<string, string>;
  _childCount: number;
  _processChildNodePos: number;
  constructor(id: number, level: number) {
    this._id = id;
    this._level = level;
    this._path = [];
    this._parents = [];
    this._children = [];
    this._spouse = null;
    this._cohabitant = null;
    this._undividedEstateSpouse = null;
    this._relationshipMap = this._getRelationshipMap();
    this._childCount = 0;
    this._processChildNodePos = 0;
  }
  _getRelationshipMap = (): Map<string, string> => {
    return new Map<string, string>([
      ["0", "child"],
      ["00", "grandchild"],
      ["1", "parent"],
      ["10", "brother/sister"],
      ["100", "nephew/niece"],
      ["1000", "grandniece"],
      ["12", "grandparent"],
      ["120", "uncle/aunt"],
      ["1200", "cousin"],
      ["", ""],
    ]);
    return new Map<string, string>();
  };
  setPath(prevPath: Array<[number, number]>) {
    this._path = prevPath;
  }
  getParentId(nodeMap: Map<number, NodeEntity>) {
    if (this._path.length - 2 < 0) {
      return null;
    }
    const currId = this._path[this._path.length - 2][1];
    const currNode = NodeEntity.getNode(currId, nodeMap);
    if (
      !(
        this._children.includes(this._path[this._path.length - 2][1]) ||
        currNode._undividedEstateSpouse === this._id
      )
    )
      return this._path[this._path.length - 2][1];
    return null;
  }
  getGenerationCount() {
    let parentCount = 0;
    if (this._path.length - 2 < 0) {
      return 0;
    }
    for (let i = this._path.length - 2; i >= 0; i--) {
      if (this._path[i][0] === ParentChildSelector.grandParent) {
        parentCount += 1;
        break;
      } else {
        parentCount += 1;
      }
    }
    return parentCount;
  }

  add_child = (child: NodeEntity, add_for_both = true): void => {
    const children_array = this._children;
    const child_id = child._id;
    if (!children_array.find((obj) => obj === child_id)) {
      this._children.push(child_id);
    }
    child._path = [...this._path];
    child._path.push([ParentChildSelector.child, child_id]);
    child._level = this.getLevel(child._path);
    if (add_for_both) {
      if (!child._parents.find((obj) => obj === this._id)) {
        child._parents.push(this._id);
      }
    }
  };
  /* eslint-disable @typescript-eslint/no-unused-vars */
  add_parent = (
    parent: NodeEntity,
    add_for_both = true,
    grandParent = false
  ): void => {
    const parents_array = this._parents;
    const parent_id = parent._id;
    if (!parents_array.find((obj) => obj === parent_id)) {
      this._parents.push(parent_id);
    }
    parent._path = [...this._path];

    parent._path.push([ParentChildSelector.parent, parent_id]);
    parent._level = this.getLevel(parent._path);
    if (parent._level === 2) {
      parent._path[parent._path.length - 1][0] =
        ParentChildSelector.grandParent;
    }
    if (add_for_both) {
      if (!parent._children.find((obj) => obj === this._id)) {
        parent._children.push(this._id);
      }
    }
  };

  getLatestPathKey = () => {
    if (this._path.length == 0) {
      throw new Error("Invalid Case");
    }
    return this._path[this._path.length - 1][0];
  };

  getLevel = (path: Array<[number, number]>) => {
    let level = 0;
    path.map((x) => {
      if (x[0] === ParentChildSelector.child) {
        level = level - 1;
      } else if (
        x[0] === ParentChildSelector.parent ||
        x[0] === ParentChildSelector.grandParent
      ) {
        level = level + 1;
      } else {
        level = level + 0;
      }
    });
    return level;
  };

  static getNode = (id: number, nodeMap: Map<number, NodeEntity>) => {
    const node: NodeEntity | undefined = nodeMap.get(id);
    if (node == undefined) {
      throw new Error("Node not found with given id:" + id);
    }
    return node;
  };

  setPathforPartner = (partnerSelector: number, partner: NodeEntity) => {
    partner._path = [...this._path];
    partner._path.push([partnerSelector, partner._id]);
  };
  getChildUnprocessedNode() {
    if (this._processChildNodePos < this._children.length) {
      return this._children[this._processChildNodePos++];
    }
  }

  has_surviving_spouse = () => {
    return true;
  };

  has_surviving_cohabitant = () => {
    if (this._cohabitant !== null) return true;
    return false;
  };
}

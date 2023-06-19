import { NodeEntity } from '../Helper/Classes/NodeEntity';
import { ParentChildSelector } from '../Helper/Enums/ParentChildSelector';

export const add_parent = (
    parent: NodeEntity,
    state: any,
    add_for_both = true,
    grandParent = false,
) => {
    // const parents_array = this._parents;
    const parent_id = parent._id;
    let isParentPresent = false;
    const person = state.temp_person;
    for (const p of person._parents) {
        if (p === parent_id) {
            isParentPresent = true;
            break;
        }
    }

    // const t = this._parents.find((obj) => obj === parent_id);
    if (!isParentPresent) {
        person._parents.push(parent_id);
    }
    parent._path = [...person._path];

    parent._path.push([ParentChildSelector.parent, parent_id]);
    parent._level = person.getLevel(parent._path);
    if (parent._level === 2) {
        parent._path[parent._path.length - 1][0] =
            ParentChildSelector.grandParent;
    }
    if (add_for_both) {
        if (!parent._children.find((obj) => obj === person._id)) {
            parent._children.push(person._id);
        }
    }
    return state;
};

export const add_child = (
    child: NodeEntity,
    state: any,
    currentPartnerNode: NodeEntity | null = null,
    add_for_both = true,
    isPartner = false,
) => {
    const temp_person = currentPartnerNode || state.temp_person;
    const children_array = temp_person._children;
    const child_id = child._id;

    if (!children_array.includes(child_id)) {
        children_array.push(child_id);
    }

    if (!isPartner) {
        child._path = [
            ...temp_person._path,
            [ParentChildSelector.child, child_id],
        ];
        child._level = temp_person.getLevel(child._path);
    } else {
        child._partnerPath = [
            ...temp_person._path,
            [ParentChildSelector.child, child_id],
        ];
        // child._level = this.getLevel(child._path);
    }

    if (add_for_both && !child._parents.includes(temp_person._id)) {
        child._parents.push(temp_person._id);
    }

    return state;
};

export const getChildUnprocessedNode = (curPerson: NodeEntity) => {
    if (curPerson._processChildNodePos < curPerson._children.length) {
        return curPerson._children[curPerson._processChildNodePos++];
    }
};

export const getParentId = (state: any) => {
    const nodeMap: Map<number, NodeEntity> = state.nodeMap;
    const curPerson: NodeEntity = state.temp_person;
    if (curPerson._path.length - 2 < 0) {
        return null;
    }
    const currId = curPerson._path[curPerson._path.length - 2][1];
    const currNode = NodeEntity.getNode(currId, nodeMap);
    if (
        !(
            curPerson._children.includes(
                curPerson._path[curPerson._path.length - 2][1],
            ) || currNode._undividedEstateSpouse === curPerson._id
        )
    )
        return curPerson._path[curPerson._path.length - 2][1];
    return null;
};

export const updateProcessChildNodePos = (curPerson: NodeEntity) => {
    curPerson._processChildNodePos++;
};

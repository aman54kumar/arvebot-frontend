import { PDFDownloadLink } from '@react-pdf/renderer';
import { InheritanceCalculation } from '../../Reports/InheritanceCalculation';
import FinalDocument from '../../Reports/PDF/FinalDocument';
import { PliktdelsarvCalculation } from '../../Reports/PliktdelsarvCalculation';
import { UndividedCalculation } from '../../Reports/UndividedCalculation';
import ActionProvider from '../ActionProvider';
import { ChatbotInterface } from '../Generics';
import { NodeEntity } from '../Helper/Classes/NodeEntity';
import Person from '../Helper/Classes/Person';
import { ChatStepTypes, QuestionType } from '../Helper/Enums/ChatStepTypes';
import { ParentChildSelector } from '../Helper/Enums/ParentChildSelector';
import InheritanceConstants from '../Helper/Methods/InheritanceConstants';
import QuestionConstants from '../Helper/Methods/QuestionConstants';
import { handleUndividedStep } from './UndividedEstateMethods';

export const handleFinalQuestionDef = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (res) {
        const document = computeInheritances(state, actionProvider);
        const pdfDownloadLink = (
            <div>
                <PDFDownloadLink
                    document={document}
                    fileName={
                        getPerson(state.testator._id, state.personsMap)
                            ._personName
                    }
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download now!'
                    }
                </PDFDownloadLink>
            </div>
        );
        const pdfLink = actionProvider.createChatBotMessage(pdfDownloadLink);
        console.log(pdfDownloadLink);

        state = actionProvider.addMessageToBotState(pdfLink, state);

        console.log('prepare report and download');
    }
    return state;
};

const computeInheritances = (
    state: any,
    actionProvider: ActionProvider,
): JSX.Element => {
    const inheritanceCalculation = new InheritanceCalculation(
        state.person,
        actionProvider,
        state,
    );
    inheritanceCalculation.computeMethod(1);
    inheritanceCalculation.computeGenealogyInheritance(
        state.testator._id,
        state,
    );

    const pliktdelsarvCalculation = new PliktdelsarvCalculation(
        state.person,
        actionProvider,
        state,
    );
    pliktdelsarvCalculation.computeMethod(2);
    pliktdelsarvCalculation.computeGenealogyPliktInheritance(
        state.testator._id,
        state,
    );

    const undividedCalculation = new UndividedCalculation(
        state.person,
        actionProvider,
        state,
    );
    undividedCalculation.computeMethod(3);
    const document = (
        <FinalDocument
            inputData={{
                inheritanceCalculation: inheritanceCalculation,
                pliktdelsarvCalculation: pliktdelsarvCalculation,
                undividedCalculation: undividedCalculation,
            }}
        />
    );
    return document;
};

export const handleClosingStep = (
    state: any,
    actionProvider: ActionProvider,
    isSecondParent = true,
) => {
    switch (state.stepID) {
        case ChatStepTypes.successorStep:
            return actionProvider.closestSurvivingRelativeChildren(state);
        case ChatStepTypes.parentsStep:
            state.temp_person = state.person;
            state = actionProvider.closestSurvivingRelativeParents(
                isSecondParent,
                state,
            );
            return state;
        case ChatStepTypes.undividedEstateStep:
            state.temp_person = state.person;
            state = handleUndividedStep(state, actionProvider, isSecondParent);
            return state;
        case ChatStepTypes.grandParentStep:
            state.temp_person = getNode(
                state.deceasedParentsArray[0],
                state.nodeMap,
            );
            state = actionProvider.closestSurvivingRelativeGrandParents(
                true,
                state,
            );
            return state;

        case ChatStepTypes.testatorOtherChildStep:
            state = actionProvider.askUnderAgeQuestion(state);
            return state;
    }
};

export const handleClosestSurvivingRelativeChildren = (
    state: any,
    actionProvider: ActionProvider,
) => {
    const testator = state.person;
    const testatorDetail = Person.getPerson(testator._id, state.personsMap);
    const temp_class_testator =
        get_class_and_distance_closest_surviving_relative(
            state.testator,
            state,
        )[0];

    if (
        state.person !== state.testator &&
        state.testator._undividedEstateSpouse
    ) {
        if (!(temp_class_testator && temp_class_testator !== 1)) {
            state = {
                ...state,
                parent_flag: QuestionType.part1,
                successor_flag: QuestionType.initialQuestion,
                isUndividedParent: true,
            };
            const newParentQuestion = actionProvider.createChatBotMessage(
                QuestionConstants.addParentsQuestion1(
                    testatorDetail._personName,
                ),
            );
            state = actionProvider.addMessageToBotState(
                newParentQuestion,
                state,
            );
            return state;
        }
    }

    if (temp_class_testator === 1) {
        state = {
            ...state,
            stepID: ChatStepTypes.rearChildrenStep,
        };

        state = actionProvider.askFinalQuestion(state);
        return state;
    }

    if (
        testator._spouse !== null &&
        state.netWealth <=
            InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS
    ) {
        state = actionProvider.askFinalQuestion(state);
        return state;
    }

    if (
        testator._cohabitant !== null &&
        state.netWealth <=
            InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS
    ) {
        state = actionProvider.askFinalQuestion(state);
        return state;
    }
    state = {
        ...state,
        stepID: ChatStepTypes.parentsStep,
        parent_flag: QuestionType.part1,
        temp_person: state.testator,
        successor_flag: QuestionType.initialQuestion,
    };
    const newParentQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.addParentsQuestion1(testatorDetail._personName),
    );
    state = actionProvider.addMessageToBotState(newParentQuestion, state);
    return state;
};

export const handleClosestSurvivingRelativeParents = (
    isSecondParent: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (isSecondParent && state.temp_person._parents.length < 2) {
        // TODO
        state.successor_flag = QuestionType.initialQuestion;
        state.parent_flag = QuestionType.part3;
        const personName = getPerson(
            state.temp_person._id,
            state.personsMap,
        )._personName;
        const secondParentChoiceQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.askSecondParentChoiceQuestion(`${personName}`),
            QuestionConstants.YesNoWidgetOptions,
        );
        state = actionProvider.addMessageToBotState(
            secondParentChoiceQuestion,
            state,
        );
        return state;
    }

    if (state.person._spouse !== null) {
        actionProvider.askFinalQuestion(state);
        return state;
    }
    const temp_class = get_class_and_distance_closest_surviving_relative(
        state.person,
        state,
    )[0];
    const eitherParentsDeceased =
        state.person._parents.filter((p_id: any) => {
            return Person.getPerson(p_id, state.personsMap)._deceased;
        }).length !== 0;
    const personDetail = Person.getPerson(state.person._id, state.personsMap);

    if (
        state.person._parents.length === 2 &&
        eitherParentsDeceased &&
        temp_class === 2
    ) {
        const parent1Detail = Person.getPerson(
            state.person._parents[0],
            state.personsMap,
        );
        const parent2Detail = Person.getPerson(
            state.person._parents[1],
            state.personsMap,
        );
        if (!personDetail._underAge) {
            actionProvider.askFinalQuestion(state);
            return state;
        }
        if (state.person._parents.length !== 2) {
            actionProvider.askFinalQuestion(state);
            return state;
        }

        if (parent1Detail._deceased) {
            state = {
                ...state,
                stepID: ChatStepTypes.marriedParentsStep,
            };
            const marriedParentsQn = actionProvider.createChatBotMessage(
                QuestionConstants.MarriedParents1(
                    parent1Detail._personName,
                    parent2Detail._personName,
                ),
            );
            state = actionProvider.addMessageToBotState(
                marriedParentsQn,
                state,
            );
            return state;
        } else {
            state = {
                ...state,
                stepID: ChatStepTypes.marriedParentsStep,
            };
            const marriedParentsQn = actionProvider.createChatBotMessage(
                QuestionConstants.MarriedParents2(
                    parent1Detail._personName,
                    parent2Detail._personName,
                ),
            );
            state = actionProvider.addMessageToBotState(
                marriedParentsQn,
                state,
            );
            return state;
        }
    } else {
        state = actionProvider.grandParentFirst(state);
        return state;
    }
};

export const handleClosestSurvivingRelativeGrandParens = (
    isSecondParent: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    if (isSecondParent && state.temp_person._parents.length < 2) {
        // TODO
        state.successor_flag = QuestionType.initialQuestion;
        state.parent_flag = QuestionType.part3;
        const grandparentName = getPerson(
            state.temp_person._id,
            state.personsMap,
        );
        const secondParentChoiceQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.askSecondParentChoiceQuestion(
                `${grandparentName._personName}`,
            ),
            QuestionConstants.YesNoWidgetOptions,
        );
        state = actionProvider.addMessageToBotState(
            secondParentChoiceQuestion,
            state,
        );
        return state;
    }
    state.deceasedParentsArray = state.deceasedParentsArray.filter(
        (item: any) => item !== state.deceasedParentsArray[0],
    );
    state = actionProvider.askForNextGrandParent(state);
    return state;
};

const surviving_successor_distance = (
    node: NodeEntity,
    state: any,
): number | undefined => {
    const nodeDetail: Person = Person.getPerson(node._id, state.personsMap);

    if (nodeDetail._deceased === false) return 0;
    else if (node._children.length === 0) return undefined;
    else {
        const possible_distances: Array<number> = [];
        for (const child_id of node._children) {
            const temp = surviving_successor_distance(
                NodeEntity.getNode(child_id, state.nodeMap),
                state,
            );
            if (temp != undefined) {
                possible_distances.push(1 + temp);
            }
        }
        if (possible_distances.length === 0) return undefined;
        else return Math.min(...possible_distances);
    }
};

export const get_class_and_distance_closest_surviving_relative = (
    testatorNode: NodeEntity,
    state: any,
): [number | undefined, number | undefined] => {
    const distance = surviving_successor_distance(testatorNode, state);
    if (distance !== undefined) return [1, distance];
    else if (testatorNode._parents.length == 0) return [undefined, undefined];
    else {
        const alternatives: Array<Array<number | undefined>> = [];
        for (const parent_id of testatorNode._parents) {
            alternatives.push(
                get_class_and_distance_closest_surviving_relative(
                    NodeEntity.getNode(parent_id, state.nodeMap),
                    state,
                ),
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

export const createNewPerson = (
    personID: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const newPerson = new Person(
        personID,
        actionProvider.generateNextID(state.id),
    );
    state.personsMap.set(newPerson._id, newPerson);
    const newNode = new NodeEntity(newPerson._id, 0);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
};
export const createEmptyNode = (state: any, id: number) => {
    const newPerson = new Person('', id);
    state.personsMap.set(newPerson._id, newPerson);
    const newNode = new NodeEntity(newPerson._id, 0);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
};
export const createTestator = (
    personID: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const newPerson = new Person(
        personID,
        actionProvider.generateNextID(state.id),
    );
    newPerson._deceased = true;
    state.personsMap.set(newPerson._id, newPerson);
    const newNode = new NodeEntity(newPerson._id, 0);
    newNode._path.push([ParentChildSelector.testator, newPerson._id]);
    state.nodeMap.set(newNode._id, newNode);
    return newNode;
};

export const getPerson = (id: number, personMap: Map<number, Person>) => {
    const person: Person | undefined = personMap.get(id);
    if (person == undefined) {
        throw new Error('Person not found with given id:' + id);
    }
    return person;
};

export const getNode = (id: number, nodeMap: Map<number, NodeEntity>) => {
    const node: NodeEntity | undefined = nodeMap.get(id);
    if (node == undefined) {
        throw new Error('Node not found with given id:' + id);
    }
    return node;
};
export const add_parent = (
    parent: NodeEntity,
    state: any,
    add_for_both = true,
    grandParent = false,
): void => {
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
    add_for_both = true,
    isPartner = false,
): void => {
    const partnerNode = state.temp_person._partnerNode;
    const children_array = partnerNode._children;
    const child_id = child._id;
    if (!children_array.find((obj: any) => obj === child_id)) {
        partnerNode._children.push(child_id);
    }
    if (!isPartner) {
        child._path = [...partnerNode._path];
        child._path.push([ParentChildSelector.child, child_id]);
        child._level = partnerNode.getLevel(child._path);
    } else {
        child._partnerPath = [...partnerNode._path];
        child._partnerPath.push([ParentChildSelector.child, child_id]);
        // child._level = this.getLevel(child._path);
    }
    if (add_for_both) {
        if (!child._parents.find((obj) => obj === partnerNode._id)) {
            child._parents.push(partnerNode._id);
        }
    }
};

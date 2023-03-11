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
    state: ChatbotInterface,
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

        actionProvider.addMessageToBotState(pdfLink);

        console.log('prepare report and download');
    }
    return actionProvider.returnState(state);
};

const computeInheritances = (
    state: ChatbotInterface,
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
    state: ChatbotInterface,
    actionProvider: ActionProvider,
    isSecondParent = true,
) => {
    switch (state.stepID) {
        case ChatStepTypes.successorStep:
            actionProvider.closestSurvivingRelativeChildren();
            break;
        case ChatStepTypes.parentsStep:
            state.temp_person = state.person;
            actionProvider.closestSurvivingRelativeParents(isSecondParent);
            break;
        case ChatStepTypes.undividedEstateStep:
            state.temp_person = state.person;
            handleUndividedStep(state, actionProvider, isSecondParent);
            break;
        case ChatStepTypes.grandParentStep:
            state.temp_person = getNode(
                state.deceasedParentsArray[0],
                state.nodeMap,
            );
            actionProvider.closestSurvivingRelativeGrandParents(true);
            break;

        case ChatStepTypes.testatorOtherChildStep:
            actionProvider.askUnderAgeQuestion();
    }
};

export const handleClosestSurvivingRelativeChildren = (
    state: ChatbotInterface,
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
            actionProvider.addMessageToBotState(newParentQuestion);
            return actionProvider.returnState(state);
        }
    }

    if (temp_class_testator === 1) {
        state = {
            ...state,
            stepID: ChatStepTypes.rearChildrenStep,
        };

        actionProvider.askFinalQuestion();
        return actionProvider.returnState(state);
    }

    if (
        testator._spouse !== null &&
        state.netWealth <=
            InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS
    ) {
        actionProvider.askFinalQuestion();
        return actionProvider.returnState(state);
    }

    if (
        testator._cohabitant !== null &&
        state.netWealth <=
            InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS
    ) {
        actionProvider.askFinalQuestion();
        return actionProvider.returnState(state);
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
    actionProvider.addMessageToBotState(newParentQuestion);
    return actionProvider.returnState(state);
};

export const handleClosestSurvivingRelativeParents = (
    isSecondParent: boolean,
    state: ChatbotInterface,
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
        actionProvider.addMessageToBotState(secondParentChoiceQuestion);
        return actionProvider.returnState(state);
    }

    if (state.person._spouse !== null) {
        actionProvider.askFinalQuestion();
        return actionProvider.returnState(state);
    }
    const temp_class = get_class_and_distance_closest_surviving_relative(
        state.person,
        state,
    )[0];
    const eitherParentsDeceased =
        state.person._parents.filter((p_id) => {
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
            actionProvider.askFinalQuestion();
            return actionProvider.returnState(state);
        }
        if (state.person._parents.length !== 2) {
            actionProvider.askFinalQuestion();
            return actionProvider.returnState(state);
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
            actionProvider.addMessageToBotState(marriedParentsQn);
            return actionProvider.returnState(state);
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
            actionProvider.addMessageToBotState(marriedParentsQn);
            return actionProvider.returnState(state);
        }
    } else {
        actionProvider.grandParentFirst();
        return actionProvider.returnState(state);
    }
};

export const handleClosestSurvivingRelativeGrandParens = (
    isSecondParent: boolean,
    state: ChatbotInterface,
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
        actionProvider.addMessageToBotState(secondParentChoiceQuestion);
        return actionProvider.returnState(state);
    }
    state.deceasedParentsArray = state.deceasedParentsArray.filter(
        (item) => item !== state.deceasedParentsArray[0],
    );
    actionProvider.askForNextGrandParent();
    return actionProvider.returnState(state);
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

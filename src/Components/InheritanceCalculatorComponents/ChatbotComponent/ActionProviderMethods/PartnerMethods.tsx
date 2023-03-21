import ActionProvider from '../ActionProvider';
import { ChatbotInterface } from '../Generics';
import Person from '../Helper/Classes/Person';
import { ChatStepTypes, QuestionType } from '../Helper/Enums/ChatStepTypes';
import { ParentChildSelector } from '../Helper/Enums/ParentChildSelector';
import InheritanceConstants from '../Helper/Methods/InheritanceConstants';
import QuestionConstants from '../Helper/Methods/QuestionConstants';
import { createNewPerson } from './OtherChatbotMethods';

export const handleSpouseOption = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    // Spouse present
    if (res) {
        state = {
            ...state,
            stepID: ChatStepTypes.spouseStep,
        };
        const spouseQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.SpouseQuestion,
        );
        state = actionProvider.addMessageToBotState(spouseQuestion, state);
    }
    // No spouse
    else {
        const testator = Person.getPerson(state.person._id, state.personsMap);
        // is Adult, then ask for cohabitant
        if (!testator._underAge && testator.spouse === undefined) {
            state = {
                ...state,
                stepID: ChatStepTypes.cohabitantChoice,
            };
            const cohabitantChoiceQuestion =
                actionProvider.createChatBotMessage(
                    QuestionConstants.CohabitantChoiceQuestion,
                    QuestionConstants.YesNoWidgetOptions,
                );
            state = actionProvider.addMessageToBotState(
                cohabitantChoiceQuestion,
                state,
            );
        } else {
            state = {
                ...state,
                stepID: ChatStepTypes.successorStep,
                successor_flag: QuestionType.part3,
            };
            const newSuccessorQuestion = actionProvider.createChatBotMessage(
                QuestionConstants.addSuccessorCount(testator._personName),
            );
            state = actionProvider.addMessageToBotState(
                newSuccessorQuestion,
                state,
            );
        }
    }
    return state;
};

export const handleSpouseInput = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    /**
     *  * function for handling spouseID replies.
     *  * stepID is updated to 6 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    const testator = Person.getPerson(state.person._id, state.personsMap);
    const newSpouse = createNewPerson(res, state, actionProvider);
    state.person = Object.assign(state.person, { _spouse: newSpouse._id });
    // state.person._spouse = newSpouse._id;
    state.person.setPathforPartner(ParentChildSelector.spouse, newSpouse);
    if (
        state.netWealth <=
        InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
    ) {
        state = {
            ...state,
            stepID: ChatStepTypes.rearChildrenStep,
        };
        state = actionProvider.askFinalQuestion(state);
        return state;
    }

    state = {
        ...state,
        stepID: ChatStepTypes.successorStep,
        successor_flag: QuestionType.part3,
    };
    state.testator = Object.assign(state.testator, {
        _partnerNode: newSpouse._id,
    });
    // state.testator._partnerNode = newSpouse._id;
    const newSuccessorQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.addSuccessorCount(testator._personName),
    );
    state = actionProvider.addMessageToBotState(newSuccessorQuestion, state);
    return state;
};

export const handleCohabitantChoice = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    // if cohabitant choice is yes
    if (res) {
        state = {
            ...state,
            stepID: ChatStepTypes.cohabitantStep,
        };
        const cohabitantQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.CohabitantQuestion,
        );
        state = actionProvider.addMessageToBotState(cohabitantQuestion, state);
    }
    // if cohabitant choice is no
    else {
        state = {
            ...state,
            stepID: ChatStepTypes.successorStep,
            successor_flag: QuestionType.part3,
        };
        const testator = Person.getPerson(state.person._id, state.personsMap);
        const newSuccessorQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.addSuccessorCount(testator._personName),
        );
        state = actionProvider.addMessageToBotState(
            newSuccessorQuestion,
            state,
        );
    }
    return state;
};

export const handleCohabitantInput = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    /**
     *  * function for handling cohabitant replies.
     *  * stepID is updated to 7 and then further conditions are evaluated next.
     *  * open reply, no conditions for now.
     */
    const testator = Person.getPerson(state.person._id, state.personsMap);
    const newCohabitant = createNewPerson(res, state, actionProvider);
    state.person = Object.assign(state.person, {
        _cohabitant: newCohabitant._id,
    });
    // state.person._cohabitant = newCohabitant._id;
    state.person.setPathforPartner(
        ParentChildSelector.cohabitant,
        newCohabitant,
    );

    if (
        state.netWealth <=
        InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN
    ) {
        state = {
            ...state,
            stepID: ChatStepTypes.rearChildrenStep,
        };
        state = actionProvider.askFinalQuestion(state);
        return state;
    }
    state = {
        ...state,
        stepID: ChatStepTypes.successorStep,
        successor_flag: QuestionType.part3,
    };
    const newSuccessorQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.addSuccessorCount(testator._personName),
    );
    state = actionProvider.addMessageToBotState(newSuccessorQuestion, state);
    return state;
};

import ActionProvider from '../ActionProvider';
import InfoMessagesWidget from '../Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget';
import { ChatbotInterface } from '../Generics';
import { ChatStepTypes } from '../Helper/Enums/ChatStepTypes';
import {
    CurrencyOutput,
    ParseCurrencyStringForOutput,
} from '../Helper/Methods/HandleCurrency';
import QuestionConstants from '../Helper/Methods/QuestionConstants';
import { createTestator, getPerson } from './OtherChatbotMethods';

export const handleTestator = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    /**
     *  * function for handling personID replies.
     *  * stepID is updated to 2 and then proceed to wealth question.
     *  * open reply, no conditions for now.
     */

    const undividedEstateQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.UndividedEstateQuestion,
        QuestionConstants.YesNoWidgetOptions,
    );
    state = {
        ...state,
        stepID: ChatStepTypes.testatorStep,
        testator: createTestator(res, state, actionProvider),
    };
    state = {
        ...state,
    };

    return actionProvider.addMessageToBotState(undividedEstateQuestion, state);
};

export const handleNetWealth = (
    res: string,
    state: any,
    actionProvider: ActionProvider,
) => {
    const netWealthQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.NetWealthQuestion,
        { withAvatar: true },
    );
    const currencyIntResponse = CurrencyOutput(res);
    const currencyStringResponse = ParseCurrencyStringForOutput(
        currencyIntResponse[1],
    );
    const currencyJSX = <InfoMessagesWidget label={currencyStringResponse} />;
    if (currencyIntResponse[0] === 5) {
        const underAgeQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.UnderAgeQuestion,
            QuestionConstants.YesNoWidgetOptions,
        );
        const currencyCustom = actionProvider.createClientMessage(currencyJSX);
        state = actionProvider.addMessageToBotState(currencyCustom, state);

        state = {
            ...state,
            stepID: ChatStepTypes.underAgeStep,
            netWealth: parseInt(currencyIntResponse[1]),
        };
        if (state.netWealth <= 0) {
            actionProvider.askFinalQuestion(state);
        }
        state = actionProvider.addMessageToBotState(underAgeQuestion, state);
    } else {
        const netWealthWarning = actionProvider.createChatBotMessage(
            QuestionConstants.NetWealthWarning,
        );

        state = actionProvider.addMessageToBotState(netWealthWarning, state);
        state = actionProvider.addMessageToBotState(netWealthQuestion, state);
    }

    return state;
};

export const handleUnderAge = (
    res: boolean,
    state: any,
    actionProvider: ActionProvider,
) => {
    state.person = state.testator;
    state.temp_person = state.testator;
    getPerson(state.person._id, state.personsMap)._underAge = res;
    if (res) {
        const cohabitantChoiceQuestion = actionProvider.createChatBotMessage(
            QuestionConstants.CohabitantChoiceQuestion,
            QuestionConstants.YesNoWidgetOptions,
        );
        state = {
            ...state,
            stepID: ChatStepTypes.cohabitantChoice,
        };
        state = actionProvider.addMessageToBotState(
            cohabitantChoiceQuestion,
            state,
        );

        return state;
    }

    const spouseChoiceQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.SpouseChoiceQuestion,
        QuestionConstants.YesNoWidgetOptions,
    );
    state = {
        ...state,
        stepID: ChatStepTypes.spouseChoice,
    };
    state = actionProvider.addMessageToBotState(spouseChoiceQuestion, state);

    return state;
};

export const handleAskUnderAgeQuestion = (
    state: any,
    actionProvider: ActionProvider,
) => {
    state = {
        ...state,
        stepID: ChatStepTypes.underAgeStep,
    };
    const underAgeQuestion = actionProvider.createChatBotMessage(
        QuestionConstants.UnderAgeQuestion,
        QuestionConstants.YesNoWidgetOptions,
    );
    state = actionProvider.addMessageToBotState(underAgeQuestion, state);
    return state;
};

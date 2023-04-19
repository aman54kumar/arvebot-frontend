import { FormattedMessage } from 'react-intl';
import {
    FormattedMessages,
    undividedOwnershipType,
} from '../Enums/ChatStepTypes';
import React, { ReactElement } from 'react';
import ActionProvider from '../../ActionProvider';

export const getReturnValueFromBooleanWidget = (
    message: string,
    state: any,
) => {
    state = {
        ...state,
        yesNoClickedFlag: true,
    };
    const returnValue =
        message === 'yes' ? (
            <FormattedMessage id="Chatbot.Yes" />
        ) : (
            <FormattedMessage id="Chatbot.No" />
        );

    return returnValue;
};

export const getReturnValueFromUndividedWidget = (
    message: string,
    state: any,
) => {
    state = {
        ...state,
        yesNoClickedFlag: true,
    };

    const ownershipTypeWithFormattedMessages = {
        [undividedOwnershipType.felleseie[0]]: (
            <FormattedMessage id={FormattedMessages.FELLESEIE} />
        ),
        [undividedOwnershipType.delvis[0]]: (
            <FormattedMessage id={FormattedMessages.DELVIS} />
        ),
        [undividedOwnershipType.fullt[0]]: (
            <FormattedMessage id={FormattedMessages.FULLT} />
        ),
    };

    return (
        ownershipTypeWithFormattedMessages[
            message as keyof typeof ownershipTypeWithFormattedMessages
        ] ?? 'The message is not in the array'
    );
};

export const modifiedChoiceResponse = (
    ownershipResponse: string,
    actionProvider: ActionProvider,
    state: any,
): void => {
    state.messages.pop();
    const customOwnershipResponse = actionProvider.createClientMessage(
        React.createElement('div', null, ownershipResponse),
    );
    state = actionProvider.addMessageToBotState(customOwnershipResponse, state);
};

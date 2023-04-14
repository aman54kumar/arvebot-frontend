import { FormattedMessage } from 'react-intl';
import {
    FormattedMessages,
    undividedOwnershipType,
} from '../Enums/ChatStepTypes';
import React, { ReactElement } from 'react';

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
        [undividedOwnershipType.felleseie]: (
            <FormattedMessage id={FormattedMessages.FELLESEIE} />
        ),
        [undividedOwnershipType.delvis]: (
            <FormattedMessage id={FormattedMessages.DELVIS} />
        ),
        [undividedOwnershipType.fullt]: (
            <FormattedMessage id={FormattedMessages.FULLT} />
        ),
    };

    return (
        ownershipTypeWithFormattedMessages[
            message as keyof typeof ownershipTypeWithFormattedMessages
        ] ?? 'The message is not in the array'
    );
};

export const undChoiceAlterUsrMsg = (inputText: string): ReactElement => {
    return React.createElement('div', inputText.match(/[a-zA-Z]+/g)?.join(''));
};

import './OptionSelector.scss';
import { FormattedMessage } from 'react-intl';
import { ReactElement } from 'react';
import { ChatbotInterface } from '../../../Generics';
import ActionProvider from '../../../ActionProvider';

const OptionSelector = ({ actionProvider, ...rest }: any): ReactElement => {
    const onClickHandler = (e: any): void => {
        const thisButton = e.target as HTMLButtonElement;
        const nextButton = thisButton.nextElementSibling as HTMLButtonElement;
        const prevButton =
            thisButton.previousElementSibling as HTMLButtonElement;
        const otherButton = nextButton ? nextButton : prevButton;
        thisButton.style.pointerEvents = 'none';
        thisButton.style.background = 'darkolivegreen';
        thisButton.disabled = true;
        otherButton.style.pointerEvents = 'none';
        otherButton.disabled = true;
    };
    return (
        <div>
            <div className="option-selector-button-container">
                <button
                    className="option-selector-button"
                    onClick={(e) => {
                        onClickHandler(e);
                        handleOptions(true, actionProvider);
                    }}
                >
                    <FormattedMessage id="Chatbot.Yes" />
                </button>
                <button
                    className="option-selector-button"
                    onClick={(e) => {
                        onClickHandler(e);
                        handleOptions(false, actionProvider);
                    }}
                >
                    <FormattedMessage id="Chatbot.No" />
                </button>
            </div>
        </div>
    );
};

const handleOptions = (option: boolean, actionProvider: ActionProvider) => {
    hideWarning();
    actionProvider.setState((state: ChatbotInterface) => {
        state = {
            ...state,
            yesNoClickedFlag: true,
        };
        const optionSelected = option ? 'yes' : 'no';
        const returnValue =
            optionSelected === 'yes' ? (
                <FormattedMessage id="Chatbot.Yes" />
            ) : (
                <FormattedMessage id="Chatbot.No" />
            );
        const clientMessage = actionProvider.createClientMessage(returnValue);
        actionProvider.addMessageToBotState(clientMessage);

        actionProvider.handleMessage(optionSelected, state);
        return actionProvider.returnState(state);
    });
};

const hideWarning = () => {
    const warningDiv = document.getElementById('chatbot-warning-div');
    if (warningDiv) {
        warningDiv.style.display = 'none';
        return;
    }
};
export default OptionSelector;

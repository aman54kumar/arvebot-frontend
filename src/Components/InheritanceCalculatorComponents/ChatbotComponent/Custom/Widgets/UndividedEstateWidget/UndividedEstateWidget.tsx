import './UndividedEstateWidget.scss';
import { FormattedMessage } from 'react-intl';
import { ReactElement } from 'react';
import ActionProvider from '../../../ActionProvider';
import { undividedOwnershipType } from '../../../Helper/Enums/ChatStepTypes';

const UndividedEstateWidget = ({
    actionProvider,
    ...rest
}: any): ReactElement => {
    // const setOption = (option: string) => {
    //     let state = actionProvider.stateRef;
    //     state = actionProvider.handleMessage(option, state);
    //     state = actionProvider.handleOwnershipResponse(option);
    //     return state;
    // };

    return (
        <div>
            <div className="option-selector-button-container">
                <button
                    className="option-selector-button"
                    onClick={(e) => {
                        onClickHandler(e);
                        handleOptions(
                            undividedOwnershipType.felleseie,
                            actionProvider,
                        );
                    }}
                >
                    <FormattedMessage id="Chatbot.OWNERSHIP_TYPE1" />
                </button>
                <button
                    className="option-selector-button"
                    onClick={(e) => {
                        onClickHandler(e);
                        handleOptions(
                            undividedOwnershipType.delvis,
                            actionProvider,
                        );
                    }}
                >
                    <FormattedMessage id="Chatbot.OWNERSHIP_TYPE2" />
                </button>
                <button
                    className="option-selector-button"
                    onClick={(e) => {
                        onClickHandler(e);
                        handleOptions(
                            undividedOwnershipType.fullt,
                            actionProvider,
                        );
                    }}
                >
                    <FormattedMessage id="Chatbot.OWNERSHIP_TYPE3" />
                </button>
            </div>
        </div>
    );
};

const handleOptions = (option: string, actionProvider: ActionProvider) => {
    hideWarning();
    actionProvider.handleMessage(option, false, true);
};

const onClickHandler = (e: any): void => {
    // store previous state
    const thisButton = e.target as HTMLButtonElement;
    const currentParent = thisButton.parentElement;
    if (currentParent?.hasChildNodes) {
        const allCurrentButtons = Object.values(
            currentParent.childNodes,
        ) as HTMLButtonElement[];
        for (const childEl of allCurrentButtons) {
            childEl.style.pointerEvents = 'none';
            childEl.disabled = true;
        }
        thisButton.style.background = 'darkolivegreen';
    }
};

const hideWarning = () => {
    const warningDiv = document.getElementById('chatbot-warning-div');
    if (warningDiv) {
        warningDiv.style.display = 'none';
        return;
    }
};

export default UndividedEstateWidget;

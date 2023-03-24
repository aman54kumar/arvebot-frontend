import { useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import { Chatbot } from 'react-chatbot-kit';
import Config from '../Components/InheritanceCalculatorComponents/ChatbotComponent/Config.js';
import MessageParser from '../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser';
import ActionProvider from '../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider';
import OrgChartTree from '../Components/InheritanceCalculatorComponents/OtherComponent/FamilyChart/ChartComponent';
import '../Components/InheritanceCalculatorComponents/OtherComponent/ChatbotToggleButton/ChatbotToggleButton.scss';
import botIcon from '../assets/images/chat_button_logo.svg';
import { ReactFlowProvider } from 'react-flow-renderer';
import { messageService } from '../Components/InheritanceCalculatorComponents/ChatbotComponent/services/ChatbotCommunicator.tsx';
import { componentCommunicatorService } from '../Components/InheritanceCalculatorComponents/ChatbotComponent/services/ComponentCommunicatorService.tsx';

const InheritanceCalculatorPage = () => {
    let prev = 'block';
    useEffect(() => {
        messageService.clearAllExternalSubscription();
        const subscription = messageService
            .getMessageOutChatbot()
            .subscribe(({ detail }) => {
                componentCommunicatorService.sendChatbotMessage(detail);
            });
        messageService.addExternalSubscription(subscription);
        setWarningDiv();
        addListenerToChatInputField();
    }, [1]);
    const toggleBot = () => {
        const divChatBot = document.getElementsByClassName(
            'react-chatbot-kit-chat-container',
        )[0];
        if (prev === 'block') {
            divChatBot.style.display = 'none';
            prev = 'none';
        } else {
            divChatBot.style.display = 'block';
            prev = 'block';
        }
    };
    return (
        <div id="InheritanceCalculatorMain" style={{ height: '100%' }}>
            <Typography variant="h2" align="center">
                Inheritance Calculator
            </Typography>
            <ReactFlowProvider>
                <OrgChartTree />
            </ReactFlowProvider>
            {
                <div className="chatbotContainer">
                    <Chatbot
                        config={Config}
                        actionProvider={ActionProvider}
                        messageParser={MessageParser}
                    />
                </div>
            }
            <button className="ChatbotToggleButton" onClick={toggleBot}>
                <img src={botIcon} />
            </button>
        </div>
    );
};

const setWarningDiv = () => {
    const newDiv = document.createElement('div');
    newDiv.id = 'chatbot-warning-div';
    newDiv.innerHTML = 'warning';
    newDiv.style.cssText =
        'background-color: red; position: absolute; bottom: 2.5rem; width: 100%; display: none;';

    document
        .getElementsByClassName('react-chatbot-kit-chat-input-form')[0]
        .prepend(newDiv);

    const container = document.querySelector(
        '.react-chatbot-kit-chat-message-container',
    );
    const lastChild = container.lastChild;
    lastChild.style.paddingBottom = '2.5rem';
};

const addListenerToChatInputField = () => {
    const chatInputField = document.getElementsByClassName(
        'react-chatbot-kit-chat-input',
    )[0];
    chatInputField.addEventListener('input', () => {
        const warningDiv = document.getElementById('chatbot-warning-div');
        if (warningDiv) {
            if (warningDiv.style.display === 'block') {
                warningDiv.style.display = 'none';
            }
        }
    });
};
export default InheritanceCalculatorPage;

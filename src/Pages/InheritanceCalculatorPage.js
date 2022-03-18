import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { Chatbot } from "react-chatbot-kit";
import Config from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Config.js";
import MessageParser from "../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser";
import ActionProvider from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider";
import OrgChartTree from "../Components/InheritanceCalculatorComponents/OtherComponent/FamilyChart/ChartComponent";
import "../Components/InheritanceCalculatorComponents/OtherComponent/ChatbotToggleButton/ChatbotToggleButton.scss";
import botIcon from "../assets/images/chat_button_logo.svg";
import { ReactFlowProvider } from "react-flow-renderer";
import { messageService } from "../Components/InheritanceCalculatorComponents/ChatbotComponent/services/ChatbotCommunicator.tsx";
import { componentCommunicatorService } from "../Components/InheritanceCalculatorComponents/ChatbotComponent/services/ComponentCommunicatorService.tsx";

const InheritanceCalculatorPage = () => {
  let prev = "block";
  const componentWillUnmount = useRef(false);
  useEffect(() => {
    messageService.clearAllExternalSubscription();
    const subscription = messageService
      .getMessageOutChatbot()
      .subscribe(({ detail }) => {
        componentCommunicatorService.sendChatbotMessage(detail);
        // dispatch({
        //   type: "UPDATE_GENERIC",
        //   payload: detail,
        // });
      });
    messageService.addExternalSubscription(subscription);
    setWarningDiv();
    // setRevertDiv();
    addListenerToChatInputField();
  }, [1]);
  // useEffect(() => {
  //   return () => {
  //     componentWillUnmount.current = true;
  //   };
  // }, []);
  // useEffect(() => {
  //   if (componentWillUnmount.current) {
  //     messageService.clearAllExternalSubscription();
  //     messageService.clearAllInternalSubscription();
  //   }
  // }, [1]);

  // localStorage.setItem("isRevertListenerSet", "false");
  // document.removeEventListener("revert");
  const toggleBot = () => {
    const divChatBot = document.getElementsByClassName(
      "react-chatbot-kit-chat-container"
    )[0];
    if (prev === "block") {
      divChatBot.style.display = "none";
      prev = "none";
    } else {
      divChatBot.style.display = "block";
      prev = "block";
    }
  };
  return (
    <div id="InheritanceCalculatorMain" style={{ height: "100%" }}>
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
const setRevertDiv = () => {
  const chatParentElement = document.getElementsByClassName(
    "react-chatbot-kit-chat-input-container"
  )[0];
  if (!document.getElementById("revert-div")) {
    const chatContainer = document.getElementsByClassName(
      "react-chatbot-kit-chat-container"
    )[0];
    chatContainer.id = "chat_container";
    const newDiv = document.createElement("div");
    newDiv.id = "revert-div";
    const revertButton = document.createElement("button");
    revertButton.innerText = "Revert";
    newDiv.appendChild(revertButton);
    chatParentElement.prepend(newDiv);
    revertButton.addEventListener("click", ({ event }) => {
      messageService.sendMessageToChatbot("ON CLICK");
    });
  }
};
const setWarningDiv = () => {
  // const chatParentElement = document.getElementsByClassName(
  //   "react-chatbot-kit-chat-container"
  // )[0];

  const chatParentElement = document.getElementsByClassName(
    "react-chatbot-kit-chat-input-form"
  )[0];
  const newDiv = document.createElement("div");
  newDiv.id = "chatbot-warning-div";
  newDiv.innerHTML = "warning";
  newDiv.style.backgroundColor = "red";
  newDiv.style.position = "absolute";
  newDiv.style.bottom = "2.5rem";
  newDiv.style.width = "100%";
  newDiv.style.display = "none";
  chatParentElement.prepend(newDiv);
};

const addListenerToChatInputField = () => {
  const chatInputField = document.getElementsByClassName(
    "react-chatbot-kit-chat-input"
  )[0];
  chatInputField.addEventListener("input", () => {
    const warningDiv = document.getElementById("chatbot-warning-div");
    if (warningDiv) {
      if (warningDiv.style.display === "block") {
        warningDiv.style.display = "none";
      }
    }
  });
};
export default InheritanceCalculatorPage;

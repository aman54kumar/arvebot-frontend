import { useState } from "react";
import { Typography } from "@mui/material";
import { Chatbot } from "react-chatbot-kit";
import Config from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Config.js";
import MessageParser from "../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser";
import ActionProvider from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider";
// import validator from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Validator";
import OrgChartTree from "../Components/InheritanceCalculatorComponents/OtherComponent/FamilyChart/ChartComponent.js";
import ChatbotToggleButton from "../Components/InheritanceCalculatorComponents/OtherComponent/ChatbotToggleButton/ChatbotToggleButton";
import "../Components/InheritanceCalculatorComponents/OtherComponent/ChatbotToggleButton/ChatbotToggleButton.scss";
import botIcon from "../assets/images/chat_button_logo.svg";
import { useDispatch } from "react-redux";
import { messageSelector } from "../store/chartSelector.js";
import { useSelector } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
const InheritanceCalculatorPage = () => {
  let prev = "block";
  const dispatch = useDispatch();
  document.addEventListener("build", ({ detail }) => {
    dispatch({
      type: "UPDATE_GENERIC",
      payload: detail,
    });
  });
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
      {/* <div className="ChatbotContainer"> */}
      {
        <Chatbot
          config={Config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      }
      {/* <ChatbotToggleButton show={prev} clickHandler={toggleBot} /> */}
      <button className="ChatbotToggleButton" onClick={toggleBot}>
        <img src={botIcon} />
      </button>
      {/* </div> */}
    </div>
  );
};

export default InheritanceCalculatorPage;

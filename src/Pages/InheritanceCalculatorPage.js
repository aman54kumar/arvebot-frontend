import { useState } from "react";
import { Typography } from "@mui/material";
import { Chatbot } from "react-chatbot-kit";
import Config from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Config.js";
import MessageParser from "../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser";
import ActionProvider from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider";
// import validator from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Validator";
import OrgChartTree from "../Components/InheritanceCalculatorComponents/OtherComponent/FamilyChart/ChartComponent.js";
import { ChatbotState } from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Generics.ts";
import ChatbotToggleButton from "../Components/InheritanceCalculatorComponents/OtherComponent/ChatbotToggleButton/ChatbotToggleButton";
import "../Components/InheritanceCalculatorComponents/OtherComponent/ChatbotToggleButton/ChatbotToggleButton.scss";
import botIcon from "../assets/images/chat_button_logo.svg";
import { useDispatch } from "react-redux";
// import updateGeneric from "../store/genericActions.js";

const InheritanceCalculatorPage = () => {
  const [showBot, toggleBot] = useState(true);
  const dispatch = useDispatch();

  document.addEventListener("build", ({ detail }) => {
    dispatch({
      type: "UPDATE_GENERIC",
      payload: detail,
    });
  });

  return (
    <div>
      <Typography variant="h2" align="center">
        Inheritance Calculator
      </Typography>
      <OrgChartTree />
      <div className="ChatbotContainer">
        {showBot && (
          <Chatbot
            config={Config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        )}
        {/* <ChatbotToggleButton show={prev} clickHandler={toggleBot} /> */}
        <button
          className="ChatbotToggleButton"
          onClick={() => toggleBot((prev) => !prev)}
        >
          <img src={botIcon} />
        </button>
      </div>
    </div>
  );
};

export default InheritanceCalculatorPage;

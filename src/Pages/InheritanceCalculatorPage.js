import { useState } from "react";
import { Typography } from "@mui/material";
import { Chatbot } from "react-chatbot-kit";
import Config from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Config.js";
import MessageParser from "../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser";
import ActionProvider from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider";
// import validator from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Validator";
import OrgChartTree from "../Components/InheritanceCalculatorComponents/OtherComponent/ChartComponent";

const InheritanceCalculatorPage = () => {
  const [showBot, toggleBot] = useState(true);
  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  return (
    <div>
      <Typography variant="h2" align="center">
        Inheritance Calculator
      </Typography>
      <OrgChartTree />
      {showBot && (
        <Chatbot
          config={Config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
        />
      )}
      <button onClick={() => toggleBot((prev) => !prev)}>Bot</button>
    </div>
  );
};

export default InheritanceCalculatorPage;

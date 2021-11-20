import { Typography } from "@mui/material";
import { Chatbot } from "react-chatbot-kit";
import Config from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Config.js";
import MessageParser from "../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser";
import ActionProvider from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider";
// import validator from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Validator";
import OrgChartTree from "../Components/InheritanceCalculatorComponents/OtherComponent/ChartComponent";

const InheritanceCalculatorPage = () => {
  return (
    <div>
      <Typography variant="h2" align="center">
        Inheritance Calculator
      </Typography>
      <OrgChartTree />
      <Chatbot
        config={Config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default InheritanceCalculatorPage;

import React from "react";
import { Typography } from "@material-ui/core";
import Chatbot from "react-chatbot-kit";
import Config from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Config";
import MessageParser from "../Components/InheritanceCalculatorComponents/ChatbotComponent/MessageParser";
import ActionProvider from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ActionProvider";

const InheritanceCalculatorPage = () => {
  return (
    <div>
      <Typography variant="h2" align="center">
        Inheritance Calculator
      </Typography>
      <Chatbot
        config={Config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      ;
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return { person: state.person };
// };
export default InheritanceCalculatorPage;

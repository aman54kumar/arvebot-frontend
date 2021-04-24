import React from "react";
import { Typography } from "@material-ui/core";
// import Hello from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Hello";
import Chatbot from "../Components/InheritanceCalculatorComponents/ChatbotComponent/ChatBot";

const InheritanceCalculatorPage = ({ person }) => {
  return (
    <div>
      <Typography variant="h2" align="center">
        Inheritance Calculator
      </Typography>
      <Chatbot />;
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return { person: state.person };
// };
export default InheritanceCalculatorPage;

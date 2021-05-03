// import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import { FormattedMessage } from "react-intl";
import OptionSelector from "./Widgets/OptionSelector/OptionSelector";
import MarriageOptionSelector from "./Widgets/MarriageOptionSelector/MarriageOptionSelector";

const botName = "Arvebot";
const config = {
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [
    createChatBotMessage(<FormattedMessage id="Chatbot.CASE_NAME_QUESTION" />),
  ],
  state: {
    stepID: 0,
    caseName: "",
    id: 0,
    netWealth: 0,
    underAge: false,
    children: {},
    partner: [],
    parents: {},
    marriage: false,
  },
  widgets: [
    {
      widgetName: "optionSelectorWidget",
      widgetFunc: (props) => <OptionSelector {...props} />,
      mapStateToProps: ["stepID", "underAge"],
    },
    {
      widgetName: "marriageOptionSelectorWidget",
      widgetFunc: (props) => <MarriageOptionSelector {...props} />,
      mapStateToProps: ["stepID", "marriage"],
    },
  ],
};

export default config;

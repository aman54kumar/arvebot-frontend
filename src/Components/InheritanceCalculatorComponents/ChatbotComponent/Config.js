// import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import "../chatbot.css";
import { FormattedMessage } from "react-intl";
import OptionSelector from "./Widgets/OptionSelector/OptionSelector";
import MarriageOptionSelector from "./Widgets/MarriageOptionSelector/MarriageOptionSelector";
import DeceasedOptionSelector from "./Widgets/DeceasedOptionSelecor/DeceasedOptionSelecor";

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
    deceased: false,
    netWealth: 0,
    underAge: false,
    marriage: false,
    cohabitant: false,
    spouse: [],
    partner: [],
    children: [],
    parents: [],
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
    {
      widgetName: "deceasedOptionSelectorWidget",
      widgetFunc: (props) => <DeceasedOptionSelector {...props} />,
      mapStateToProps: ["stepID", "deceased"],
    },
  ],
};

export default config;

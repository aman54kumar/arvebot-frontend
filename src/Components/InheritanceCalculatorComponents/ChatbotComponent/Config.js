import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import "../chatbot.scss";
import { FormattedMessage } from "react-intl";
import OptionSelector from "./Widgets/OptionSelector/OptionSelector";
// import MarriageOptionSelector from "./Widgets/MarriageOptionSelector/MarriageOptionSelector";
// import DeceasedOptionSelector from "./Widgets/DeceasedOptionSelecor/DeceasedOptionSelecor";
import UndividedEstateOptionSelector from "./Widgets/UndividedEstateOptionSelector/UndividedEstateOptionSelector";
import RearChildrenOptionSelector from "./Widgets/RearChildrenOptionSelector/RearChildrenOptionSelector";
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
    undividedEstate: false,
    caseName: "",
    testator: "",
    deceased: false,
    netWealth: { intValue: 0, strValue: "" },
    underAge: false,
    married: false,
    cohabitant: "",
    spouse: "",
    rearChildren: false,
    children: [{ id: "dfg", parent: "testator_id" }],
    parents: [],
  },
  widgets: [
    {
      widgetName: "optionSelectorWidget",
      widgetFunc: (props) => <OptionSelector {...props} />,
      mapStateToProps: ["stepID", "underAge"],
    },
    {
      widgetName: "undividedEstateSelectorWidget",
      widgetFunc: (props) => <UndividedEstateOptionSelector {...props} />,
      mapStateToProps: ["stepID", "undividedEstate"],
    },
    {
      widgetName: "RearChildrenSelectorWidget",
      widgetFunc: (props) => <RearChildrenOptionSelector {...props} />,
      mapStateToProps: ["stepID", "rearChildren"],
    },
    // {
    //   widgetName: "marriageOptionSelectorWidget",
    //   widgetFunc: (props) => <MarriageOptionSelector {...props} />,
    //   mapStateToProps: ["stepID", "marriage"],
    // },
    // {
    //   widgetName: "deceasedOptionSelectorWidget",
    //   widgetFunc: (props) => <DeceasedOptionSelector {...props} />,
    //   mapStateToProps: ["stepID", "deceased"],
    // },
  ],
};

export default config;

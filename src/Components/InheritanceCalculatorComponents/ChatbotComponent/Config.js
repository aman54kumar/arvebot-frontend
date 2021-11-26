import { createChatBotMessage } from "react-chatbot-kit";
import OptionSelector from "./Custom/Widgets/OptionSelector/OptionSelector";
import InfoMessageWidget from "./Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget";
import RearChildrenOptionSelector from "./Custom/Widgets/RearChildrenOptionSelector/RearChildrenOptionSelector";
import "react-chatbot-kit/build/main.css";
import "../chatbot.scss";
import { FormattedMessage } from "react-intl";
import ChatHeader from "../OtherComponent/ChatHeader/ChatHeader";
import { ChatbotState } from "./Generics";

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
  state: ChatbotState,
  initialMessages: [
    createChatBotMessage(<FormattedMessage id="Chatbot.CASE_NAME_QUESTION" />),
  ],
  customComponents: {
    header: (actionProvider) => <ChatHeader actionProvider={actionProvider} />,
  },

  widgets: [
    {
      widgetName: "optionSelectorWidget",
      widgetFunc: (props) => <OptionSelector {...props} />,
    },
    {
      widgetName: "RearChildrenSelectorWidget",
      widgetFunc: (props) => <RearChildrenOptionSelector {...props} />,
    },
    {
      widgetName: "InfoMessage",
      widgetFunc: (props) => <InfoMessageWidget {...props} />,
    },
  ],
};

export default config;

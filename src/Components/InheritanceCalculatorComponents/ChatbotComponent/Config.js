import { createChatBotMessage } from "react-chatbot-kit";
import OptionSelector from "./Custom/Widgets/OptionSelector/OptionSelector";
import InfoMessageWidget from "./Custom/Widgets/InfoMessagesWidget/InfoMessagesWidget";
import RearChildrenOptionSelector from "./Custom/Widgets/RearChildrenOptionSelector/RearChildrenOptionSelector";
import UndividedEstateWidget from "./Custom/Widgets/UndividedEstateWidget/UndividedEstateWidget";
import "react-chatbot-kit/build/main.css";
import "../chatbot.scss";
import ChatHeader from "../OtherComponent/ChatHeader/ChatHeader";
import { ChatbotState } from "./Generics";
import Norsk from "../../../languages/translationNO.json";
import { createIntl, createIntlCache } from "react-intl";
const cache = createIntlCache();
const intl = createIntl({ locale: "nb-NO", messages: Norsk }, cache);

const botName = "Arvebot";
const value = intl.formatMessage({ id: "Chatbot.TESTATOR_QUESTION" });
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
  initialMessages: [createChatBotMessage(value, {})],
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
    {
      widgetName: "undividedEstateWidget",
      widgetFunc: (props) => <UndividedEstateWidget {...props} />,
    },
  ],
};
export default config;

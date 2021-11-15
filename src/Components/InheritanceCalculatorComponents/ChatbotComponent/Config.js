import { createChatBotMessage } from "react-chatbot-kit";
import CurrencyInput from "react-currency-input-field";
import OptionSelector from "./Widgets/OptionSelector/OptionSelector";
import DeceasedOptionSelector from "./Widgets/DeceasedOptionSelecor/DeceasedOptionSelecor";
import UndividedEstateOptionSelector from "./Widgets/UndividedEstateOptionSelector/UndividedEstateOptionSelector";
import RearChildrenOptionSelector from "./Widgets/RearChildrenOptionSelector/RearChildrenOptionSelector";
import { ChatbotState } from "./Generics";
import "react-chatbot-kit/build/main.css";
import "../chatbot.scss";
import { FormattedMessage } from "react-intl";

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
  state: ChatbotState,
  widgets: [
    {
      widgetName: "optionSelectorWidget",
      widgetFunc: (props) => <OptionSelector {...props} />,
      // mapStateToProps: ["stepID", "underAge"],
    },
    {
      widgetName: "undividedEstateSelectorWidget",
      widgetFunc: (props) => <UndividedEstateOptionSelector {...props} />,
      // mapStateToProps: ["stepID", "undividedEstate"],
    },
    {
      widgetName: "RearChildrenSelectorWidget",
      widgetFunc: (props) => <RearChildrenOptionSelector {...props} />,
      // mapStateToProps: ["stepID", "rearChildren"],
    },
    {
      widgetName: "deceasedOptionSelectorWidget",
      widgetFunc: (props) => <DeceasedOptionSelector {...props} />,
      // mapStateToProps: ["stepID", "deceased"],
    },
  ],
};

export default config;

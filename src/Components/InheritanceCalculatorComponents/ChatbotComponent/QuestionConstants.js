import React from "react";
import { FormattedMessage } from "react-intl";
import ShowInfoWidget from "./Widgets/ShowInfoWidget/ShowInfoWidget";

class QuestionConstants {
  TestatorQuestion = (<FormattedMessage id="Chatbot.TESTATOR_QUESTION" />);

  UndividedEstateQuestion = (
    <FormattedMessage id="Chatbot.UNDIVIDED_ESTATE_QUESTION" />
  );

  UndividedEstateWidgetOptions = {
    widget: "undividedEstateSelectorWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };

  UndividedEstateResultText = (selectedOption) => {
    let undividedEstateResultText = selectedOption
      ? "Chatbot.Yes"
      : "Chatbot.No";
    return <FormattedMessage id={undividedEstateResultText} />;
  };

  NetWealthQuestion = (
    <div>
      <FormattedMessage id="Chatbot.NET_WEALTH_QUESTION" />
      <ShowInfoWidget text="Chatbot.NET_WEALTH_EXTRA_INFO" />
    </div>
  );

  NetWealthWarning = (<FormattedMessage id="Chatbot.NET_WEALTH_WARNING" />);

  UnderAgeQuestion = (<FormattedMessage id="Chatbot.UNDER_AGE_QUESTION" />);

  UnderAgeResultText = (selectedOption) => {
    let underAgeResultText = selectedOption
      ? "Chatbot.UnderAge"
      : "Chatbot.NotUnderAge";

    return <FormattedMessage id={underAgeResultText} />;
  };

  UnderAgeWidgetOptions = {
    widget: "optionSelectorWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };

  SpouseQuestion = (<FormattedMessage id="Chatbot.SPOUSE_QUESTION" />);

  CohabitantQuestion = (
    <div>
      <FormattedMessage id="Chatbot.COHABITANT_QUESTION" />
      <ShowInfoWidget text="Chatbot.COHABITANT_EXTRA_INFO" />
    </div>
  );

  RearChildrenQuestion = (
    <FormattedMessage id="Chatbot.REAR_CHILDREN_QUESTION" />
  );

  RearChildrenWidgetOptions = {
    widget: "RearChildrenSelectorWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };
}

export default QuestionConstants;

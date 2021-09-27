// import React from "react";
import { FormattedMessage } from "react-intl";
import ShowInfoWidget from "../../Widgets/ShowInfoWidget/ShowInfoWidget";

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

  addSuccessorquestion1 = (person_id) => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorQn1"
          values={{ person_ID: person_id }}
        />
        <ShowInfoWidget text="Chatbot.CHILD_EXTRA_INFO" />
      </div>
    );
  };
  addSuccessorquestion2 = (person_id, child_id_string) => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorQn2"
          values={{ person_ID: person_id, child_ID: child_id_string }}
        />
        <ShowInfoWidget text="Chatbot.CHILD_EXTRA_INFO" />
      </div>
    );
  };

  AliveQuestionText = (selectedOption) => {
    let aliveQuestionText = selectedOption ? "Chatbot.Yes" : "Chatbot.No";

    return <FormattedMessage id={aliveQuestionText} />;
  };

  AliveWidgetOptions = {
    widget: "deceasedOptionSelectorWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };

  DefaultText = (<FormattedMessage id="Chatbot.DEFAULT_TEXT" />);
}

export default QuestionConstants;

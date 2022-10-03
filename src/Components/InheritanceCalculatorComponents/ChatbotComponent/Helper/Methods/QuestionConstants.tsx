import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import ShowInfoWidget from "../../Custom/Widgets/ShowInfoWidget/ShowInfoWidget";

class QuestionConstants {
  static TestatorQuestion = (
    <FormattedMessage id="Chatbot.TESTATOR_QUESTION" />
  );

  static UndividedEstateQuestion = (
    <FormattedMessage id="Chatbot.UNDIVIDED_ESTATE_QUESTION" />
  );

  static YesNoWidgetOptions = {
    widget: "optionSelectorWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };

  static UndividedEstateResultText = (selectedOption: string): ReactElement => {
    const undividedEstateResultText =
      selectedOption === "true" ? "Chatbot.Yes" : "Chatbot.No";
    return <FormattedMessage id={undividedEstateResultText} />;
  };

  static undvdSpouseOtherSuccessorQuestion = (): ReactElement => {
    const undividedSpouseOtherSuccessorQuestion =
      "How many children does the first-deceased have from other relationship(s) (særkullsbarn)?";
    return <div>{undividedSpouseOtherSuccessorQuestion}</div>;
  };

  static testatorOtherSuccessorQuestion = (): ReactElement => {
    const testatorOtherSuccessorQuestion =
      "How many children does the last-deceased have from other relationship(s) (særkullsbarn)?";
    return <div>{testatorOtherSuccessorQuestion}</div>;
  };

  static NetWealthQuestion = (
    <div>
      <FormattedMessage id="Chatbot.NET_WEALTH_QUESTION" />
      <ShowInfoWidget text="Chatbot.NET_WEALTH_EXTRA_INFO" />
    </div>
  );

  static NetWealthWarning = (
    <FormattedMessage id="Chatbot.NET_WEALTH_WARNING" />
  );

  static UnderAgeQuestion = (
    <FormattedMessage id="Chatbot.UNDER_AGE_QUESTION" />
  );

  static UnderAgeResultText = (selectedOption: boolean): ReactElement => {
    const underAgeResultText = selectedOption
      ? "Chatbot.UnderAge"
      : "Chatbot.NotUnderAge";

    return <FormattedMessage id={underAgeResultText} />;
  };

  static SpouseChoiceQuestion = (
    <FormattedMessage id="Chatbot.SPOUSE_EXIST_QUESTION" />
  );

  static SpouseQuestion = (<FormattedMessage id="Chatbot.SPOUSE_QUESTION" />);

  static CohabitantChoiceQuestion = (
    <FormattedMessage id="Chatbot.COHABITANT_EXIST_QUESTION" />
  );

  static CohabitantQuestion = (
    <div>
      <FormattedMessage id="Chatbot.COHABITANT_QUESTION" />
      <ShowInfoWidget text="Chatbot.COHABITANT_EXTRA_INFO" />
    </div>
  );

  static addSuccessorQuestion1 = (person_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorQn1"
          values={{ person_ID: <strong>{person_id}</strong> }}
        />
        <ShowInfoWidget text="Chatbot.CHILD_EXTRA_INFO" />
      </div>
    );
  };
  static addSuccessorQuestion2 = (
    person_id: string,
    child_id_string: ReactElement
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorQn2"
          values={{
            person_ID: <strong>{person_id}</strong>,
            children_IDs: child_id_string,
          }}
        />
        <ShowInfoWidget text="Chatbot.CHILD_EXTRA_INFO" />
      </div>
    );
  };

  static AliveQuestion = (child_id: string): ReactElement => {
    return (
      <FormattedMessage
        id="Chatbot.ALIVE_CHILD"
        values={{ child_ID: child_id }}
      />
    );
  };

  static AliveResultText = (selectedOption: string): ReactElement => {
    const aliveResultText = selectedOption ? "Chatbot.Yes" : "Chatbot.No";

    return <FormattedMessage id={aliveResultText} />;
  };

  static addParentsQuestion1 = (person_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addParentsQn1"
          values={{ person_ID: <strong>{person_id}</strong> }}
        />
        <ShowInfoWidget text="Chatbot.PARENT_EXTRA_INFO" />
      </div>
    );
  };

  static askSecondParentChoiceQuestion = (person_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.SecondParentChoice"
          values={{ person_ID: <strong>{person_id}</strong> }}
        />
      </div>
    );
  };

  static addParentsQuestion2 = (
    person_id: string,
    parent_id_string: ReactElement
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addParentsQn2"
          values={{
            person_ID: <strong>{person_id}</strong>,
            parents_IDs: parent_id_string,
          }}
        />
        <ShowInfoWidget text="Chatbot.PARENT_EXTRA_INFO" />
      </div>
    );
  };

  static MarriedParents1 = (
    first_parent_id: string,
    second_parent_id: string
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.marriedParents1"
          values={{
            parent1_ID: <strong>{first_parent_id}</strong>,
            parent2_ID: <strong>{second_parent_id}</strong>,
          }}
        />
      </div>
    );
  };

  static MarriedParents2 = (
    first_parent_id: string,
    second_parent_id: string
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.marriedParents2"
          values={{
            parent1_ID: <strong>{first_parent_id}</strong>,
            parent2_ID: <strong>{second_parent_id}</strong>,
          }}
        />
      </div>
    );
  };

  static addGrandParentsQuestion1 = (parent_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addGrandParentQn1"
          values={{ parent_id: <strong>{parent_id}</strong> }}
        />
      </div>
    );
  };

  static addGrandParentsQuestion2 = (
    parent_id: string,
    grandparent_id_string: ReactElement
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addGrandParentQn2"
          values={{
            parent_id: <strong>{parent_id}</strong>,
            grandParents_IDs: grandparent_id_string,
          }}
        />
      </div>
    );
  };

  static FinalQuestion = (<FormattedMessage id="Chatbot.FINAL_QUESTION" />);

  static EmptyQuestion = (<p></p>);
  static DefaultText = (<FormattedMessage id="Chatbot.DEFAULT_TEXT" />);

  // UndividedEstateStart

  static TotalEstateNetValueQuestion = (
    <div>
      <FormattedMessage id="Chatbot.TOTAL_ESTATE_NET_VALUE_QUESTION" />
      <ShowInfoWidget text="Chatbot.TOTAL_ESTATE_NET_VALUE_EXTRA_INFO" />
    </div>
  );

  static TotalEstateNetValueWarning = (
    <FormattedMessage id="Chatbot.NET_WEALTH_WARNING" />
  );

  static OwnershipTypeQuestion = (
    <FormattedMessage id="Chatbot.FELLESEIE_QUESTION" />
  );

  static OwnershipQuestionWidgetOptions = {
    widget: "undividedEstateWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };

  static OwnershipTypeWarning = (
    <FormattedMessage id="Chatbot.OptionChoiceWrongWarning" />
  );

  static DelvisFirstQuestion = (
    <div>
      <FormattedMessage id="Chatbot.DELVIS_SAEREIE_FIRST_QUESTION" />
      <ShowInfoWidget text="Chatbot.DELVIS_SAEREIE_FIRST_EXTRA_INFO" />
    </div>
  );

  static DelvisSecondQuestion = (
    <div>
      <FormattedMessage id="Chatbot.DELVIS_SAEREIE_LAST_QUESTION" />
      <ShowInfoWidget text="Chatbot.DELVIS_SAEREIE_LAST_EXTRA_INFO" />
    </div>
  );

  static FulltSaereieQuestion = (
    <div>
      <FormattedMessage id="Chatbot.FULLT_SAEREIE_QUESTION" />
      <ShowInfoWidget text="Chatbot.FULLT_SAEREIE_EXTRA_INFO" />
    </div>
  );

  static UndividedEstateSpouseQuestion = (
    <div>
      <FormattedMessage id="Chatbot.UNDIVIDED_SPOUSE_QUESTION" />
    </div>
  );

  static TextBeforeSucsrUndvdSpouse = (
    <div>
      <FormattedMessage id="Chatbot.TextBeforeSucsrUndvdSpouse" />
    </div>
  );

  // UndividedEstateEnd
  static addSuccessorCount = (person_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorCount"
          values={{ person_ID: <strong>{person_id}</strong> }}
        />
      </div>
    );
  };

  static undividedChildrenTogetherCount = (): ReactElement => {
    return <div>How many children do they have together?</div>;
  };

  static addSuccessorOfParentCount = (
    person_id: string,
    existing_child_id: ReactElement
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorCountExistingParent"
          values={{
            person_ID: <strong>{person_id}</strong>,
            existing_child_ID: <strong>{existing_child_id}</strong>,
          }}
        />
      </div>
    );
  };
}

export default QuestionConstants;

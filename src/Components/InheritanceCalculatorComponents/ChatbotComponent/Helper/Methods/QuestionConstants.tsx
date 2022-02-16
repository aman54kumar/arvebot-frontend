import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import ShowInfoWidget from "../../Custom/Widgets/ShowInfoWidget/ShowInfoWidget";

class QuestionConstants {

  TestatorQuestion = (<FormattedMessage id="Chatbot.TESTATOR_QUESTION" />);

  UndividedEstateQuestion = (
    <FormattedMessage id="Chatbot.UNDIVIDED_ESTATE_QUESTION" />
  );

  YesNoWidgetOptions = {
    widget: "optionSelectorWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  };

  UndividedEstateResultText = (selectedOption: string): ReactElement => {
    const undividedEstateResultText = (selectedOption === "true")
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

  UnderAgeResultText = (selectedOption: boolean): ReactElement => {
    const underAgeResultText = selectedOption
      ? "Chatbot.UnderAge"
      : "Chatbot.NotUnderAge";

    return <FormattedMessage id={underAgeResultText} />;
  };


  SpouseChoiceQuestion = (<FormattedMessage id="Chatbot.SPOUSE_EXIST_QUESTION" />);


  SpouseQuestion = (<FormattedMessage id="Chatbot.SPOUSE_QUESTION" />);


  CohabitantChoiceQuestion = (<FormattedMessage id="Chatbot.COHABITANT_EXIST_QUESTION" />);

  CohabitantQuestion = (
    <div>
      <FormattedMessage id="Chatbot.COHABITANT_QUESTION" />
      <ShowInfoWidget text="Chatbot.COHABITANT_EXTRA_INFO" />
    </div>
  );

  addSuccessorQuestion1 = (person_id: string): ReactElement => {
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
  addSuccessorQuestion2 = (
    person_id: string,
    child_id_string: ReactElement
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorQn2"
          values={{ person_ID: <strong>{person_id}</strong>, children_IDs: child_id_string }}
        />
        <ShowInfoWidget text="Chatbot.CHILD_EXTRA_INFO" />
      </div>
    );
  };

  AliveQuestion = (child_id: string): ReactElement => {
    return (
      <FormattedMessage
        id="Chatbot.ALIVE_CHILD"
        values={{ child_ID: child_id }}
      />
    );
  };

  AliveResultText = (selectedOption: string): ReactElement => {
    const aliveResultText = selectedOption ? "Chatbot.Yes" : "Chatbot.No";

    return <FormattedMessage id={aliveResultText} />;
  };


  addParentsQuestion1 = (person_id: string): ReactElement => {
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

  askSecondParentChoiceQuestion = (person_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage id="Chatbot.SecondParentChoice" values={{ person_ID: <strong>{person_id}</strong> }} />
      </div>

    )
  }

  addParentsQuestion2 = (
    person_id: string,
    parent_id_string: ReactElement
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addParentsQn2"
          values={{ person_ID: <strong>{person_id}</strong>, parents_IDs: parent_id_string }}
        />
        <ShowInfoWidget text="Chatbot.PARENT_EXTRA_INFO" />
      </div>
    );
  };

  MarriedParents1 = (
    first_parent_id: string,
    second_parent_id: string
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.marriedParents1"
          values={{ parent1_ID: <strong>{first_parent_id}</strong>, parent2_ID: <strong>{second_parent_id}</strong> }}
        />
      </div>
    );
  };

  MarriedParents2 = (
    first_parent_id: string,
    second_parent_id: string
  ): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.marriedParents2"
          values={{ parent1_ID: <strong>{first_parent_id}</strong>, parent2_ID: <strong>{second_parent_id}</strong> }}
        />
      </div>
    );
  };


  addGrandParentsQuestion1 = (parent_id: string): ReactElement => {
    return (<div>
      <FormattedMessage
        id="Chatbot.addGrandParentQn1"
        values={{ parent_id: <strong>{parent_id}</strong> }}
      />
    </div>)
  }


  addGrandParentsQuestion2 = (parent_id: string, grandparent_id_string: ReactElement): ReactElement => {
    return (<div>
      <FormattedMessage
        id="Chatbot.addGrandParentQn2"
        values={{ parent_id: <strong>{parent_id}</strong>, grandParents_IDs: grandparent_id_string }}
      />
    </div>)
  }

  FinalQuestion = (<FormattedMessage id="Chatbot.FINAL_QUESTION" />);

  EmptyQuestion = <p></p>
  DefaultText = (<FormattedMessage id="Chatbot.DEFAULT_TEXT" />);



  // UndividedEstateStart

  TotalEstateNetValueQuestion = (
    <div>
      <FormattedMessage id="Chatbot.TOTAL_ESTATE_NET_VALUE_QUESTION" />
      <ShowInfoWidget text="Chatbot.TOTAL_ESTATE_NET_VALUE_EXTRA_INFO" />
    </div>
  );

  TotalEstateNetValueWarning = (<FormattedMessage id="Chatbot.NET_WEALTH_WARNING" />);


  OwnershipTypeQuestion = (<FormattedMessage id="Chatbot.FELLESEIE_QUESTION" />)

  OwnershipQuestionWidgetOptions = {
    widget: "undividedEstateWidget",
    withAvatar: true,
    loading: true,
    terminateLoading: true,
  }

  OwnershipTypeWarning = <FormattedMessage id="Chatbot.OptionChoiceWrongWarning" />

  DelvisFirstQuestion = (
    <div>
      <FormattedMessage id="Chatbot.DELVIS_SAEREIE_FIRST_QUESTION" />
      <ShowInfoWidget text="Chatbot.DELVIS_SAEREIE_FIRST_EXTRA_INFO" />
    </div>
  );

  DelvisSecondQuestion = (
    <div>
      <FormattedMessage id="Chatbot.DELVIS_SAEREIE_LAST_QUESTION" />
      <ShowInfoWidget text="Chatbot.DELVIS_SAEREIE_LAST_EXTRA_INFO" />
    </div>
  );

  FulltSaereieQuestion = (
    <div>
      <FormattedMessage id="Chatbot.FULLT_SAEREIE_QUESTION" />
      <ShowInfoWidget text="Chatbot.FULLT_SAEREIE_EXTRA_INFO" />
    </div>
  );

  UndividedEstateSpouseQuestion = (<div>
    <FormattedMessage id="Chatbot.UNDIVIDED_SPOUSE_QUESTION" />
  </div>)

  TextBeforeSucsrUndvdSpouse = (<div><FormattedMessage id="Chatbot.TextBeforeSucsrUndvdSpouse" /></div>)

  // UndividedEstateEnd
  addSuccessorCount = (person_id: string): ReactElement => {
    return (
      <div>
        <FormattedMessage
          id="Chatbot.addSuccessorCount"
          values={{ person_ID: <strong>{person_id}</strong> }}
        />
      </div>
    );
  };

  addSuccessorOfParentCount = (person_id: string, existing_child_id: ReactElement): ReactElement => {
    return (
      <div>
        <FormattedMessage id="Chatbot.addSuccessorCountExistingParent"
          values={{ person_ID: <strong>{person_id}</strong>, existing_child_ID: <strong>{existing_child_id}</strong> }} />
      </div>
    )
  }
}

export default QuestionConstants;

import { Text } from "@react-pdf/renderer";
import { getPerson } from "../../../../../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";
import InheritanceConstants from "../../../../../ChatbotComponent/Helper/Methods/InheritanceConstants";
import { InheritanceCalculation } from "../../../../InheritanceCalculation";
import { PliktdelsarvCalculation } from "../../../../PliktdelsarvCalculation";
import { styles } from "../../../styles";
import { add_legal_references, currencyFormatNO } from "../../../../pdf_utils";
import { Bold } from "../text-styles/Bold";

const SurvivingPartnerUtils = (
  value: InheritanceCalculation | PliktdelsarvCalculation
) => {
  let survivor_name = "Fix error";
  if (value.survivor) {
    survivor_name = getPerson(
      value.survivor,
      value.state.personsMap
    )._personName;
  }

  const survivor_inheritance_sum = currencyFormatNO(
    value.survivor_inheritance_sum
  );
  const genealogy_inheritance_sum = currencyFormatNO(
    value.genealogy_inheritance_sum
  );

  const inheritanceDescriptiveText = getInheritanceDescriptiveText(
    value.descriptive_text,
    survivor_name,
    survivor_inheritance_sum,
    genealogy_inheritance_sum,
    value instanceof InheritanceCalculation
  );
  const legalReferenceTextArray = add_legal_references(
    value.surviving_reference_paragraphs,
    InheritanceConstants.CODE_PARAGRAPHS,
    InheritanceConstants.LAW_LINKS
  );
  const pliktSpecificText = (
    <Text style={styles.paragraph}>
      OBS! Nye regler for samboer - sjekk ut{"\n\n"}
    </Text>
  );

  return (
    <Text>
      <Text style={styles.paragraphHeading}>
        Gjenlevende ektefelle eller samboer {"\n"}
        {value instanceof InheritanceCalculation ? pliktSpecificText : ""}
      </Text>
      <Text style={styles.paragraph}>{inheritanceDescriptiveText}</Text>
      {legalReferenceTextArray.map((legalReferenceText) => (
        <Text
          key={legalReferenceTextArray.indexOf(legalReferenceText)}
          style={styles.paragraph}
        >
          {legalReferenceText}
        </Text>
      ))}
    </Text>
  );
};

const getInheritanceDescriptiveText = (
  descriptive_text: string,
  survivor_name: string,
  survivor_inheritance_sum: string,
  genealogy_inheritance_sum: string,
  valueType: boolean
) => {
  if (
    [
      InheritanceConstants.DESC_NO_SPOUSE_OR_COHABITANT,
      InheritanceConstants.DESC_COHABITANT_WITHOUT_COMMON_CHILD,
    ].includes(descriptive_text)
  ) {
    return <Text style={styles.paragraph}>{descriptive_text}</Text>;
  } else if (
    [
      InheritanceConstants.DESC_SPOUSE_NO_CLOSE_RELATIVES,
      InheritanceConstants.DESC_SPOUSE_NO_CLOSE_RELATIVES_2,
      InheritanceConstants.DESC_COHABITANT_NO_CLOSE_RELATIVES,
      InheritanceConstants.DESC_COHABITANT_NO_CLOSE_RELATIVES_2,
    ].includes(descriptive_text)
  ) {
    const inheritanceSpecificTextIf = (
      <Text style={styles.paragraph}>
        {descriptive_text} Den etterlatte har person-id{" "}
        <Bold>{survivor_name}</Bold>. Arv til gjenlevende er{" "}
        {survivor_inheritance_sum}.
      </Text>
    );

    const pliktSpecificTextIf = (
      <Text>
        {descriptive_text} Den etterlatte har person-id{" "}
        <Bold>{survivor_name}</Bold>. Minstearv til gjenlevende er{" "}
        {survivor_inheritance_sum}.
      </Text>
    );
    return valueType ? inheritanceSpecificTextIf : pliktSpecificTextIf;
  } else {
    const inheritanceSpecificTextElse = (
      <Text style={styles.paragraph}>
        {" "}
        {descriptive_text} Den etterlatte har person-id{" "}
        <Bold>{survivor_name}</Bold>. Arv til gjenlevende er{" "}
        <Bold>{survivor_inheritance_sum}</Bold>, og de resterende{" "}
        <Bold>{genealogy_inheritance_sum}</Bold> går til slekten.
      </Text>
    );
    const pliktSpecificTextElse = (
      <Text style={styles.paragraph}>
        {" "}
        {descriptive_text} Den etterlatte har person-id{" "}
        <Bold>{survivor_name}</Bold>. Minstearv til gjenlevende er{" "}
        <Bold>{survivor_inheritance_sum}</Bold>.
      </Text>
    );
    return valueType ? inheritanceSpecificTextElse : pliktSpecificTextElse;
  }
};

export default SurvivingPartnerUtils;

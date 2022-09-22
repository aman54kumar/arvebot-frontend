import { Text, View } from "@react-pdf/renderer";
import InheritanceConstants from "../../../../../ChatbotComponent/Helper/Methods/InheritanceConstants";
import { InheritanceCalculation } from "../../../../InheritanceCalculation";
import { styles } from "../../../styles";
import { add_legal_references, currencyFormatNO } from "../pdf_utils";
import { Bold } from "../text-styles/Bold";

const SurvivingPartnerUtils = (value: InheritanceCalculation) => {
  let survivor_name = "Fix error";
  if (value.survivor) {
    survivor_name = value.actionProvider.getPerson(
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
    value.inheritanceConstants,
    survivor_name,
    survivor_inheritance_sum,
    genealogy_inheritance_sum
  );
  const legalReferenceText = add_legal_references(
    value.surviving_reference_paragraphs,
    value.inheritanceConstants.CODE_PARAGRAPHS
  );

  return (
    <View>
      <Text style={styles.paragraphHeading}>
        Gjenlevende ektefelle eller samboer
      </Text>
      {inheritanceDescriptiveText}
      {legalReferenceText}
    </View>
  );
};

const getInheritanceDescriptiveText = (
  descriptive_text: string,
  inheritance_constants: InheritanceConstants,
  survivor_name: string,
  survivor_inheritance_sum: string,
  genealogy_inheritance_sum: string
) => {
  if (
    [
      inheritance_constants.DESC_NO_SPOUSE_OR_COHABITANT,
      inheritance_constants.DESC_COHABITANT_WITHOUT_COMMON_CHILD,
    ].includes(descriptive_text)
  ) {
    return <Text style={styles.paragraph}>{descriptive_text}</Text>;
  } else if (
    [
      inheritance_constants.DESC_SPOUSE_NO_CLOSE_RELATIVES,
      inheritance_constants.DESC_SPOUSE_NO_CLOSE_RELATIVES_2,
      inheritance_constants.DESC_COHABITANT_NO_CLOSE_RELATIVES,
      inheritance_constants.DESC_COHABITANT_NO_CLOSE_RELATIVES_2,
    ].includes(descriptive_text)
  ) {
    return (
      <Text>
        {descriptive_text} Den etterlatte har person-id{" "}
        <Bold>{survivor_name}</Bold>. Arv til gjenlevende er{" "}
        {survivor_inheritance_sum}.
      </Text>
    );
  } else {
    return (
      <Text style={styles.paragraph}>
        {" "}
        {descriptive_text} Den etterlatte har person-id{" "}
        <Bold>{survivor_name}</Bold>. Arv til gjenlevende er{" "}
        <Bold>{survivor_inheritance_sum}</Bold>, og de resterende{" "}
        <Bold>{genealogy_inheritance_sum}</Bold> går til slekten.
      </Text>
    );
  }
};

export default SurvivingPartnerUtils;

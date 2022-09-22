import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import { addLovdataLink } from "../../common/pdf_utils";

const generalReservationsUtils = () => {
  const value = useContext(UserContext).inheritanceCalculation;
  return {
    uskifteText: getUskifteText(),
    testamentText: getTestamentText(),
    avkortingText: getavkortingText(value),
    barnText: getBarnText(value),
  };
};

const getUskifteText = () => (
  <Text style={styles.paragraph}>
    <Text style={styles.paragraphHeading}>Uskifte</Text>
    {"\n"}
    <Text>Beregningene forutsetter at avdøde ikke sitter i uskiftet bo.</Text>
  </Text>
);

const getTestamentText = () => (
  <Text style={styles.paragraph}>
    <Text style={styles.paragraphHeading}>Testament</Text>
    {"\n"}
    <Text>
      Beregningene forutsetter at avdøde ikke etterlater seg testament.
    </Text>
  </Text>
);

const getavkortingText = (value: any) => {
  const code_paragraph = "75 første ledd";
  const lovdata_link = addLovdataLink(
    code_paragraph,
    value.inheritanceConstants.LAW_LINKS
  );
  return (
    <Text style={styles.paragraph}>
      <Text style={styles.paragraphHeading}>Avkorting i arv</Text>
      {"\n"}
      <Text>
        Bestemmelsene om avkorting i arvelovens § 75 er ikke tatt hensyn til i
        bergningene.
      </Text>
      {"\n"}
      <Text style={styles.redText}>
        Det er særlig viktig å være OBS på mulig avkorting dersom det har blitt
        gitt forskudd på arv.{"\n"}
      </Text>
      <Text>{lovdata_link}</Text>
    </Text>
  );
};

const getBarnText = (value: any) => {
  const code_paragraph = "7";
  return (
    <Text style={styles.paragraph}>
      <Text style={styles.paragraphHeading}>Barn</Text>
      {"\n"}
      <Text>Vær obs på de særskilte bestemmelsene i arveloven § 7.</Text>
      <Text>
        {addLovdataLink(code_paragraph, value.inheritanceConstants.LAW_LINKS)}
      </Text>
    </Text>
  );
};

export default generalReservationsUtils;

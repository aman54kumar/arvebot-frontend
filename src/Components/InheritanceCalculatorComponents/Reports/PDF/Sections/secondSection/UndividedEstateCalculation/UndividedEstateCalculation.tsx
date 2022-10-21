import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { styles } from "../../../styles";
import { UserContext } from "../../../FinalDocument";
import {
  getUndividedRelativeText,
  getUndividedSummaryTable,
} from "./UndividedEstateCalculationUtils";
import { UndividedCalculation } from "../../../../UndividedCalculation";

export const UndividedEstateCalculation = (): JSX.Element => {
  const value = useContext(UserContext).undividedCalculation;
  let undividedResult = "";
  if (value.state.undividedEstate.undividedEstateChoice) {
    const addUndividedEstateRelatives = add_undivided_estate_relatives(value);
    const addUndividedEstateSummary = add_undivided_estate_summary(value);
    undividedResult =
      addUndividedEstateRelatives + " " + addUndividedEstateSummary;
  } else {
    undividedResult = "Ingen uskiftesituasjon";
  }
  return (
    <View style={styles.section} break>
      <Text style={styles.subheading}>Legg til introduksjon her</Text>
      <Text style={styles.paragraph}>{undividedResult}</Text>
    </View>
  );
};

const add_undivided_estate_relatives = (
  value: UndividedCalculation
): JSX.Element => {
  const UndividedRelativeText = getUndividedRelativeText(value);
  return (
    <Text style={styles.paragraph}>
      <Text style={styles.paragraphHeading}>Slektsarv</Text>
      <Text>{UndividedRelativeText}</Text>
    </Text>
  );
};

const add_undivided_estate_summary = (
  value: UndividedCalculation
): JSX.Element => {
  const UndividedSummaryTable = getUndividedSummaryTable(value);
  return (
    <Text style={styles.paragraph}>
      <Text style={styles.paragraphHeading}>Sammendrag</Text>
      <Text>{UndividedSummaryTable}</Text>
    </Text>
  );
};

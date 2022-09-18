import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { styles } from "../../../styles";
import { UserContext } from "../../../FinalDocument";

export const UndividedEstateCalculation = () => {
  const value = useContext(UserContext).inheritanceCalculation;
  let undividedResult = "";
  if (value.state.undividedEstate.undividedEstateChoice) {
    const addUndividedEstateRelatives = add_undivided_estate_relatives();
    const addUndividedEstateSummary = add_undivided_estate_summary();
    // TODO prepare these functions
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

const add_undivided_estate_relatives = () => {
  return "add_undivided_estate_relatives";
};

const add_undivided_estate_summary = () => {
  return "add_undivided_estate_summary";
};

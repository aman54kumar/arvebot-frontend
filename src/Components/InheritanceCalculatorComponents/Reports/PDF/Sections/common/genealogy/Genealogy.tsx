import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import GenealogyUtils from "./Genealogy.utils";
import GenealogyPliktUtils from "./GenealogyPlikt.utils";

export const Genealogy = (props: { inheritanceMode: boolean }): JSX.Element => {
  if (props.inheritanceMode) {
    const value = useContext(UserContext).inheritanceCalculation;
    const genealogyParagraph = GenealogyUtils(value);

    return (
      <View style={styles.section} wrap={false}>
        <Text style={styles.paragraphHeading}>Slektsarv</Text>
        {genealogyParagraph}
      </View>
    );
  } else {
    const value = useContext(UserContext).pliktdelsarvCalculation;
    const genealogyPliktParagraph = GenealogyPliktUtils(value);
    return (
      <View style={styles.section} wrap={false}>
        <Text style={styles.paragraphHeading}>Slektsarv</Text>
        {genealogyPliktParagraph}
      </View>
    );
  }
};

import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import GenealogyUtils from "./genealogy.utils";

export const Genealogy = () => {
  const value = useContext(UserContext);
  const genealogyParagraph = GenealogyUtils(value);
  return (
    <View style={styles.section} break>
      <Text style={styles.subheading}>Slektsarv</Text>
      {genealogyParagraph}
    </View>
  );
};

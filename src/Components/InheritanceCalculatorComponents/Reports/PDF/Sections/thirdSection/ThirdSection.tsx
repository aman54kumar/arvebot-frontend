import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { Genealogy } from "../common/genealogy/Genealogy";
import { Summary } from "../common/summary/Summary";
import { SurvivingPartner } from "../common/survivingPartner/SurvivingPartner";

export const ThirdSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Pliktdelsarv</Text>
      <SurvivingPartner />
      <Genealogy />
      <Summary />
    </View>
  );
};

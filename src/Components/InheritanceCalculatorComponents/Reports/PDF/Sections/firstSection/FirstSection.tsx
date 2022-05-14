import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { Genealogy } from "../common/genealogy/Genealogy";
import { Summary } from "../common/summary/Summary";
import { SurvivingPartner } from "../common/survivingPartner/SurvivingPartner";

export const FirstSection = () => {
  return (
    <View style={styles.section} break>
      <Text style={styles.subheading}>Beregnet arv i fravær av testament</Text>
      <SurvivingPartner />
      <Genealogy />
      <Summary />
    </View>
  );
};

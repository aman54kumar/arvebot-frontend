import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { Genealogy } from "../common/genealogy/Genealogy";
import { IntroductionPage } from "../common/introSection/IntroductionPage";
import { Summary } from "../common/summary/Summary";
import { SurvivingPartner } from "../common/survivingPartner/SurvivingPartner";

/* SurvivingPartner -> Gjenlevende ektefelle eller samboer
   Genealogy -> Slektsarv
   Summary -> Sammendrag
*/

export const FirstSection = (): JSX.Element => {
  return (
    <View style={styles.section}>
      <IntroductionPage inheritanceMode />
      <Text style={styles.subheading}>Beregnet arv i fravær av testament</Text>
      <SurvivingPartner inheritanceMode />
      <Genealogy inheritanceMode />
      <Summary inheritanceMode />
    </View>
  );
};

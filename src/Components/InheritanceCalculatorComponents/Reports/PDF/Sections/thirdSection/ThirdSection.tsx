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

export const ThirdSection = (): JSX.Element => {
  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Pliktdelsarv</Text>
      <IntroductionPage inheritanceMode={false} />
      <SurvivingPartner inheritanceMode={false} />
      <Genealogy inheritanceMode={false} />
      <Summary inheritanceMode={false} />
    </View>
  );
};
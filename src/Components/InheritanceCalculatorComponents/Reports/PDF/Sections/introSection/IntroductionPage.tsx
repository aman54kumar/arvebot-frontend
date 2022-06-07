import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { useContext } from "react";
import { UserContext } from "../../FinalDocument";
import { IntroductionUtils } from "./Introduction.utils";
import { Bold } from "../common/text-styles/Bold";

export const IntroductionPage = () => {
  const value = useContext(UserContext);
  const calculatedValues = IntroductionUtils(value);
  console.log(calculatedValues);

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Beregning av arv</Text>
      <Text style={styles.paragraph}>
        Dette dokumentet inneholder en beregning av arv etter arvelater med
        person-id <Bold>{calculatedValues.testatorName}</Bold>. Boet har en
        total verdi på <Bold>{calculatedValues.currencyFormatted}</Bold>.
      </Text>
      <Text>{calculatedValues.undividedEstateResults}</Text>
    </View>
  );
};

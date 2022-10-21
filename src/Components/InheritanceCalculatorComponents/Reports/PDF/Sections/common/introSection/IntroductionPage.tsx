import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../../styles";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { IntroductionUtils } from "./Introduction.utils";
import { Bold } from "../text-styles/Bold";
import { IntroductionPliktUtils } from "./IntroductionPlikt.utils";

export const IntroductionPage = (props: {
  inheritanceMode: boolean;
}): JSX.Element => {
  if (props.inheritanceMode) {
    const value = useContext(UserContext).inheritanceCalculation;
    const calculatedValues = IntroductionUtils(value);
    return (
      <View style={[styles.section]} wrap={false}>
        <Text style={[styles.heading, { textAlign: "center" }]}>
          Beregning av arv
        </Text>
        <Text style={styles.paragraph}>
          Dette dokumentet inneholder en beregning av arv etter arvelater med
          person-id <Bold>{calculatedValues.testatorName}</Bold>. Boet har en
          total verdi på <Bold>{calculatedValues.currencyFormatted}</Bold>.
        </Text>
      </View>
    );
  } else {
    const value = useContext(UserContext).pliktdelsarvCalculation;
    const pliktIntroText = IntroductionPliktUtils(value);
    return <View wrap={false}>{pliktIntroText}</View>;
  }
};

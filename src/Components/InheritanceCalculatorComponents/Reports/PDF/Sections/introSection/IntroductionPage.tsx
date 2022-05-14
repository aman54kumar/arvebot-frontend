import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";

export const IntroductionPage = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Beregning av arv</Text>
      <Text style={styles.paragraph}>
        Dette dokumentet inneholder en beregning av arv etter arvelater med
        person-id ff. Boet har en total verdi på 111 234 666 777.00.
      </Text>
    </View>
  );
};

import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { useContext } from "react";
import { UserContext } from "../../FinalDocument";

export const IntroductionPage = () => {
  const value = useContext(UserContext);
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Beregning av arv</Text>
      <Text style={styles.paragraph}>
        Dette dokumentet inneholder en beregning av arv etter arvelater med
        person-id{" "}
        {value.actionProvider.getPerson(1, value.state.personsMap)._personName}.
        Boet har en total verdi på {value.state.netWealth}.
      </Text>
    </View>
  );
};

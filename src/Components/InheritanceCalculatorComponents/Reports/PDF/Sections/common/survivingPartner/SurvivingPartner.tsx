import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";

export const SurvivingPartner = () => {
  const value = useContext(UserContext);
  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Surviving Partner</Text>
      <Text style={styles.paragraph}>{value.state.stepID}</Text>
    </View>
  );
};

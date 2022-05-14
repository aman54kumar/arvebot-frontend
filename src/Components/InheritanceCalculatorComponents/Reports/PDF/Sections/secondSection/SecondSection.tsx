import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";

export const SecondSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Uskiftearv</Text>
      <Text style={styles.paragraph}>Legg til introduksjon her</Text>
      <Text style={styles.paragraph}>Ingen uskiftesituasjon</Text>
    </View>
  );
};

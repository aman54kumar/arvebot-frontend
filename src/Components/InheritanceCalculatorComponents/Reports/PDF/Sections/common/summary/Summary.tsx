import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../../styles";

export const Summary = () => {
  return (
    <View style={styles.section} break>
      <Text style={styles.subheading}>Summary</Text>
    </View>
  );
};

import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../../styles";
import generalReservationsUtils from "./GeneralReservationsUtils";

export const GeneralReservations = (): JSX.Element => {
  const generalReservationsText = generalReservationsUtils();
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.paragraphHeading}>Generelle forbehold</Text>
      {"\n\n"}
      {generalReservationsText.uskifteText}
      {"\n\n"}
      {generalReservationsText.testamentText}
      {"\n\n"}
      {generalReservationsText.avkortingText}
      {"\n\n"}
      {generalReservationsText.barnText}
      {"\n\n"}
    </View>
  );
};

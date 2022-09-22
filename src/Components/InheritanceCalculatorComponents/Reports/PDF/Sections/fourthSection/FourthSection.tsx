import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { GeneralReservations } from "./generalReservations/GeneralReservations";
import { NationalInsurance } from "./nationalInsurance/NationalInsurance";

export const FourthSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.subheading}>Merknader og forbehold</Text>
      {"\n\n"}
      <NationalInsurance />
      <GeneralReservations />
    </View>
  );
};

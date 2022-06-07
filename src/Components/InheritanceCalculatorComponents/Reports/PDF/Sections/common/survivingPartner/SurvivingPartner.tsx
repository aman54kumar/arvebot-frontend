import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import SurvivingPartnerUtils from "./SurvivingPartner.utils";

export const SurvivingPartner = () => {
  const value = useContext(UserContext);
  const survivingPartnerParagraph = SurvivingPartnerUtils(value);
  return <View style={styles.section}>{survivingPartnerParagraph}</View>;
};

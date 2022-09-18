import { View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import SurvivingPartnerUtils from "./SurvivingPartner.utils";
import SurvivingPartnerPliktUtils from "./SurvivingPartnerPlikt.utils";

export const SurvivingPartner = (props: { inheritanceMode: boolean }) => {
  if (props.inheritanceMode) {
    const value = useContext(UserContext).inheritanceCalculation;
    const survivingPartnerParagraph = SurvivingPartnerUtils(value);
    return <View style={styles.section}>{survivingPartnerParagraph}</View>;
  } else {
    const value = useContext(UserContext).pliktdelsarvCalculation;
    const survivingPartnerParagraph = SurvivingPartnerPliktUtils(value);
    return <View style={styles.section}>{survivingPartnerParagraph}</View>;
  }
};

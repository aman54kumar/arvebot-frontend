import { View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import SurvivingPartnerUtils from "./SurvivingPartner.utils";

export const SurvivingPartner = (props: {
  inheritanceMode: boolean;
}): JSX.Element => {
  if (props.inheritanceMode) {
    const value = useContext(UserContext).inheritanceCalculation;

    const survivingPartnerParagraph = SurvivingPartnerUtils(value);

    return (
      <View style={styles.section} wrap={false}>
        {survivingPartnerParagraph}
      </View>
    );
  } else {
    const value = useContext(UserContext).pliktdelsarvCalculation;
    const survivingPartnerParagraph = SurvivingPartnerUtils(value);
    return (
      <View style={styles.section} wrap={false}>
        {survivingPartnerParagraph}
      </View>
    );
  }
};

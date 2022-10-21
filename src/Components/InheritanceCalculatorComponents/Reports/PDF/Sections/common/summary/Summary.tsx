import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import { SummaryUtils } from "./Summary.utils";

export type summaryValueType = {
  survivorName: string;
  survivorType: string;
  belopAmount: string;
};

export const initialSummaryValue = {
  survivorName: "",
  survivorType: "",
  belopAmount: "",
};

export const Summary = (props: { inheritanceMode: boolean }): JSX.Element => {
  const value = useContext(UserContext).inheritanceCalculation;
  if (props.inheritanceMode) {
    const summaryTable = SummaryUtils(value);

    return (
      <View style={styles.section} wrap={false}>
        <Text style={styles.paragraphHeading}>Sammendrag</Text>
        <View style={styles.marginTop}>{summaryTable}</View>
      </View>
    );
  } else {
    const value = useContext(UserContext).pliktdelsarvCalculation;
    const summaryPliktTable = SummaryUtils(value);
    return (
      <View style={styles.section} wrap={false}>
        <Text style={styles.paragraphHeading}>Sammendrag</Text>
        <View style={styles.marginTop}>{summaryPliktTable}</View>
      </View>
    );
  }
};

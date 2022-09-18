import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import { SummaryUtils } from "./Summary.utils";
import { SummaryPliktUtils } from "./SummaryPlikt.utils";

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

export const Summary = (props: { inheritanceMode: boolean }) => {
  const value = useContext(UserContext).inheritanceCalculation;
  if (props.inheritanceMode) {
    const summaryTable = SummaryUtils(value);
    return (
      <View style={styles.section}>
        <Text style={styles.subheading}>Sammendrag</Text>
        <View style={styles.marginTop}>{summaryTable}</View>
      </View>
    );
  } else {
    const value = useContext(UserContext).pliktdelsarvCalculation;
    const summaryPliktTable = SummaryPliktUtils(value);
    return (
      <View style={styles.section}>
        <Text style={styles.subheading}>Sammendrag</Text>
        <View style={styles.marginTop}>{summaryPliktTable}</View>
      </View>
    );
  }
};

import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import InheritanceConstants from "../../../../../ChatbotComponent/Helper/Methods/InheritanceConstants";
import { UserContext } from "../../../FinalDocument";
import { styles } from "../../../styles";
import { currencyFormatNO } from "../../../../pdf_utils";
import { Bold } from "../../common/text-styles/Bold";

export const NationalInsurance = (): JSX.Element => {
  const NationalInsuranceText = getNationalInsuranceString();
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.paragraphHeading}>Folketrygdens grunnbeløp</Text>
      <Text style={styles.paragraph}>{NationalInsuranceText}</Text>
    </View>
  );
};

const getNationalInsuranceString = () => {
  // const value = useContext(UserContext).inheritanceCalculation;
  return (
    <Text wrap={false}>
      <Text>
        Enkelte terskelverdier beregnes utfra det til enhver tid gjeldende
        grunnbeløp i folketrygden. I beregningene er det forutsatt at
        grunnbeløpet i folketrygden er på{" "}
      </Text>
      <Bold>{currencyFormatNO(InheritanceConstants.G)}</Bold>.
    </Text>
  );
};

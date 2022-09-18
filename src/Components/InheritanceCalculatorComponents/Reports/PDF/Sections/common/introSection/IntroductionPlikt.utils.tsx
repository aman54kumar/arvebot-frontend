import { Text } from "@react-pdf/renderer";
import { PliktdelsarvCalculation } from "../../../../PliktdelsarvCalculation";
import { styles } from "../../../styles";
import { currencyFormatNO } from "../pdf_utils";

export const IntroductionPliktUtils = (value: PliktdelsarvCalculation) => {
  return getPliktIntroString(value);
};

const getPliktIntroString = (value: PliktdelsarvCalculation) => {
  const person_name = value.actionProvider.getPerson(
    value.person._id,
    value.state.personsMap
  )._personName;
  const net_wealth_NOK = currencyFormatNO(value.state.netWealth);
  const survivor_inheritance_sum = currencyFormatNO(
    value.survivor_inheritance_sum
  );
  const genealogy_inheritance_sum = currencyFormatNO(
    value.genealogy_inheritance_sum
  );
  const available_for_will = currencyFormatNO(
    value.state.netWealth -
      value.survivor_inheritance_sum -
      value.genealogy_inheritance_sum
  );
  return (
    <Text style={styles.paragraph}>
      <Text style={styles.paragraph}>
        Denne delen inneholder en beregning av pliktdelsarv etter arvelater med
        person-id
      </Text>{" "}
      <Text style={styles.boldValue}>{person_name}</Text>{" "}
      <Text style={styles.paragraph}>som etterlater seg en nettoarv på</Text>{" "}
      <Text style={styles.boldValue}>{net_wealth_NOK}</Text>
      {".\n\n "}
      <Text style={styles.boldValue}>{survivor_inheritance_sum}</Text>{" "}
      <Text style={styles.paragraph}>går til etterlatte, mens</Text>{" "}
      <Text style={styles.boldValue}>{genealogy_inheritance_sum}</Text>{" "}
      <Text style={styles.paragraph}>går til livsarvinger. Det betyr at</Text>{" "}
      <Text style={styles.boldValue}>{available_for_will}</Text>{" "}
      <Text style={styles.paragraph}>fritt kan testamenteres bort.</Text>
    </Text>
  );
};

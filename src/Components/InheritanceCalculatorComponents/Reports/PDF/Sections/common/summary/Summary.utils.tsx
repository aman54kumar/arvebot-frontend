import { TableElement } from "../react-pdf-table/Table";
import { currencyFormatNO } from "../../../../pdf_utils";
import { summaryValueType } from "./Summary";
import { InheritanceCalculation } from "../../../../InheritanceCalculation";
import { getPerson } from "../../../../../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";
import { styles } from "../../../styles";
import { Text } from "@react-pdf/renderer";
import { PliktdelsarvCalculation } from "../../../../PliktdelsarvCalculation";

export const SummaryUtils = (
  value: InheritanceCalculation | PliktdelsarvCalculation
): JSX.Element => {
  const summaryValues = getSummaryValues(value);
  const table = <TableElement summaryValue={summaryValues} />;
  const emptyTableCase = (
    <Text style={styles.paragraph}>Table not available</Text>
  );
  return summaryValues.length > 0 ? table : emptyTableCase;
};

export const getSummaryValues = (
  value: InheritanceCalculation | PliktdelsarvCalculation
): Array<summaryValueType> => {
  const summaryValue: Array<summaryValueType> = [];
  if (value.survivor !== null) {
    const survivor_name = getPerson(
      value.survivor,
      value.state.personsMap
    )._personName;
    const belopAmount = currencyFormatNO(value.survivor_inheritance_sum);
    summaryValue[0] = {
      survivorName: survivor_name,
      survivorType: value.survivor_type,
      belopAmount: belopAmount,
    };
  }
  for (const gen_inherit of value.genealogy_inheritance) {
    if (gen_inherit) {
      const summaryCell = {
        survivorName: gen_inherit.person,
        survivorType: `Slekt i ${value.class_closest}. arvegangsklasse`,
        belopAmount: currencyFormatNO(gen_inherit.frac),
      };
      summaryValue.push(summaryCell);
    }
  }
  if (
    value.genealogy_inheritance_sum > 0 &&
    (value.class_closest === undefined ||
      (value.class_closest === 3 &&
        value.distance_closest &&
        value.distance_closest > 2))
  ) {
    summaryValue[0] = {
      survivorName: "-",
      survivorType: "Frivillig arbeid",
      belopAmount: currencyFormatNO(value.genealogy_inheritance_sum),
    };
  }
  return summaryValue;
};
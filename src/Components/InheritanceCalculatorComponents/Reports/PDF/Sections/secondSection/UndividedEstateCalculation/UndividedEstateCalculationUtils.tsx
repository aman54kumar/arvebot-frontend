import { Text } from "@react-pdf/renderer";
import { getPerson } from "../../../../../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods";
import InheritanceConstants from "../../../../../ChatbotComponent/Helper/Methods/InheritanceConstants";
import { UndividedCalculation } from "../../../../UndividedCalculation";
import { styles } from "../../../styles";
import {
  add_legal_reference,
  currencyFormatNO,
  unravel_chains_to_string,
} from "../../../../pdf_utils";
import { TableElement } from "../../common/react-pdf-table/Table";
import { summaryValueType } from "../../common/summary/Summary";
import { Bold } from "../../common/text-styles/Bold";

export const getUndividedRelativeText = (
  value: UndividedCalculation
): JSX.Element => {
  let returnValue;
  if (value.genealogy_inheritance_sum === 0) {
    returnValue = <Text>Det er ingen slektsarv igjen å fordele.</Text>;
  } else if (
    value.class_closest === undefined ||
    (value.class_closest === 3 &&
      value.distance_closest &&
      value.distance_closest > 2)
  ) {
    const code_paragraph1 = "6 første ledd, andre punktum";
    const code_paragraph2 = "76 første ledd, første punktum";
    const legalReference1 = add_legal_reference(
      code_paragraph1,
      InheritanceConstants.CODE_PARAGRAPHS,
      InheritanceConstants.LAW_LINKS
    );
    const legalReference2 = add_legal_reference(
      code_paragraph2,
      InheritanceConstants.CODE_PARAGRAPHS,
      InheritanceConstants.LAW_LINKS
    );

    returnValue = (
      <Text>
        <Text>Testator har ingen nære slektninger.</Text>
        <Text>{legalReference1}</Text>
        <Text style={styles.paragraphHeading}>Frivillig arbeid</Text>
        <Text>
          <Bold>${currencyFormatNO(value.genealogy_inheritance_sum)}</Bold>{" "}
          <Text>vil gå til frivillig arbeid til fordel for barn og unge.</Text>
          <Text>{legalReference2}</Text>
        </Text>
      </Text>
    );
  } else {
    let code_paragraph = "";
    let endSentence = "";
    if (value.class_closest === 1) {
      code_paragraph = "4 første og annet ledd";
      endSentence = " (livsarvinger/etterkommere av arvelater).";
    } else if (value.class_closest === 2) {
      code_paragraph = "5 første, andre og tredje ledd";
      endSentence = " (arvelaters foreldre og deres etterkommere).";
    } else if (value.class_closest === 3) {
      code_paragraph = "6 første og annet ledd";
      endSentence = " (arvelaters besteforeldre og deres etterkommere).";
    } else {
      throw new Error("wrong class_closest value");
    }
    const legalReferenceText = add_legal_reference(
      code_paragraph,
      InheritanceConstants.CODE_PARAGRAPHS,
      InheritanceConstants.LAW_LINKS
    );

    const unraveledText = value.genealogy_inheritance.map(
      (genealogy_inheritance_unit) => {
        <Text>
          <Text>Person med person-id</Text>
          <Bold>{genealogy_inheritance_unit.person}</Bold>{" "}
          <Text>arver totalt</Text>{" "}
          <Bold>{genealogy_inheritance_unit.frac}</Bold>
          <Text>
            `${unravel_chains_to_string([genealogy_inheritance_unit.chains])}
            .\n`
          </Text>
        </Text>;
      }
    );

    returnValue = (
      <Text>
        <Text>De gjenværende</Text>{" "}
        <Bold>{currencyFormatNO(value.genealogy_inheritance_sum)}</Bold>{" "}
        <Text>
          fordeles på slekten slik at det blir likt på hver gren i den aktuelle
          arvegangsklasse.
        </Text>{" "}
        <Text>
          `Nærmeste levende slektning er i arvegangsklasse $
          {value.class_closest} ${endSentence}`
        </Text>
        <Text>{legalReferenceText}</Text>
        <Text>{unraveledText}</Text>
      </Text>
    );
  }
  return returnValue;
};

export const getUndividedSummaryTable = (
  value: UndividedCalculation
): JSX.Element => {
  const summaryValues = getSummaryValues(value);
  const table = <TableElement summaryValue={summaryValues} />;
  return table;
};

const getSummaryValues = (
  value: UndividedCalculation
): Array<summaryValueType> => {
  const summaryValue: Array<summaryValueType> = [];
  let survivor_name = "";
  let survivor_type = "";
  let belop_amount = "";
  if (value.survivor) {
    survivor_name = getPerson(
      value.survivor,
      value.state.personsMap
    )._personName;

    survivor_type = value.survivor_type;
    belop_amount = currencyFormatNO(value.genealogy_inheritance_sum);
  }
  summaryValue.push({
    survivorName: survivor_name,
    survivorType: survivor_type,
    belopAmount: belop_amount,
  });

  value.genealogy_inheritance.map((gen_inherit) => {
    summaryValue.push({
      survivorName: gen_inherit.person,
      survivorType: `Slekt i ${value.class_closest}. arvegangsklasse`,
      belopAmount: currencyFormatNO(gen_inherit.frac),
    });
  });

  if (
    value.genealogy_inheritance_sum > 0 &&
    (value.class_closest === undefined ||
      (value.class_closest === 3 &&
        value.distance_closest &&
        value.distance_closest > 2))
  ) {
    summaryValue.push({
      survivorName: `-`,
      survivorType: `Frivillig arbeid`,
      belopAmount: currencyFormatNO(value.genealogy_inheritance_sum),
    });
  }
  return summaryValue;
};

import { Text, View } from "@react-pdf/renderer";
import InheritanceConstants from "../../../../../ChatbotComponent/Helper/Methods/InheritanceConstants";
import { InheritanceCalculation } from "../../../../InheritanceCalculation";
import { styles } from "../../../styles";
import {
  add_legal_reference,
  currencyFormatNO,
  unravel_chains_to_string,
} from "../../../../pdf_utils";
import { Bold } from "../text-styles/Bold";

const GenealogyUtils = (value: InheritanceCalculation) => {
  const genealogy_inheritance_sum = value.genealogy_inheritance_sum;
  const genealogyText = getGenealogyText(genealogy_inheritance_sum, value);
  return (
    <View>
      <Text>{genealogyText}</Text>
    </View>
  );
};

// add_inheritance_calculation_relatives
const getGenealogyText = (
  genealogy_inheritance_sum: number,
  value: InheritanceCalculation
) => {
  if (genealogy_inheritance_sum === 0) {
    return (
      <Text style={styles.paragraph}>
        Det er ingen slektsarv igjen å fordele.
      </Text>
    );
  } else if (
    value.class_closest === undefined ||
    (value.class_closest === 3 &&
      value.distance_closest &&
      value.distance_closest > 2)
  ) {
    let code_paragraph = "6 første ledd, andre punktum";
    const legalReference1 = add_legal_reference(
      code_paragraph,
      InheritanceConstants.CODE_PARAGRAPHS,
      InheritanceConstants.LAW_LINKS
    );

    code_paragraph = "76 første ledd, første punktum";
    const legalReference2 = add_legal_reference(
      code_paragraph,
      InheritanceConstants.CODE_PARAGRAPHS,
      InheritanceConstants.LAW_LINKS
    );
    return (
      <View>
        <Text style={styles.paragraph}>
          "Testator har ingen nære slektninger."
        </Text>
        <Text style={styles.paragraph}>{legalReference1}</Text>
        <View>
          <Text style={styles.subheading}>Frivillig arbeid</Text>
          <Bold>{currencyFormatNO(value.genealogy_inheritance_sum)}</Bold>
          <Text style={styles.paragraph}>
            {" "}
            vil gå til frivillig arbeid til fordel for barn og unge.
          </Text>
          <Text style={styles.paragraph}>{legalReference2}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.paragraph}>
          De gjenværende{" "}
          <Bold>{currencyFormatNO(genealogy_inheritance_sum)}</Bold> fordeles på
          slekten slik at det blir likt på hver gren i den aktuelle
          arvegangsklasse. Nærmeste levende slektning er i arvegangsklasse{" "}
          {value.class_closest}
          {getParagraph(
            value.class_closest,
            InheritanceConstants.CODE_PARAGRAPHS,
            InheritanceConstants.LAW_LINKS
          )}
        </Text>
        <Text style={styles.paragraph}>
          {"\n\n"}
          {genealogy_inheritance_text(value)}
        </Text>
      </View>
    );
  }
};

const getParagraph = (
  class_closest: number,
  CODE_PARAGRAPHS: any,
  LAW_LINKS: any
) => {
  let code_paragraph = "";
  let helpText = "";
  if (class_closest === 1) {
    code_paragraph = "4 første og annet ledd";
    helpText = " (livsarvinger/etterkommere av arvelater).";
  } else if (class_closest === 2) {
    code_paragraph = "5 første, andre og tredje ledd";
    helpText = " (arvelaters foreldre og deres etterkommere).";
  } else if (class_closest === 3) {
    code_paragraph = "6 første og annet ledd";
    helpText = " (arvelaters besteforeldre og deres etterkommere).";
  } else {
    console.log("check for error");
  }
  const legalReferenceText = add_legal_reference(
    code_paragraph,
    CODE_PARAGRAPHS,
    LAW_LINKS
  );
  return (
    <View>
      <Text>{helpText}</Text>
      <Text>{legalReferenceText}</Text>
    </View>
  );
};

const genealogy_inheritance_text = (value: InheritanceCalculation) => {
  let finalGenealogyInheritanceText;
  for (const i of Object.entries(value.genealogy_inheritance)) {
    const tempVar = i[1];
    finalGenealogyInheritanceText = (
      <Text>
        Person med person-id <Bold>{tempVar.person}</Bold> arver totalt{" "}
        <Bold>{currencyFormatNO(tempVar.frac)} </Bold>
        {unravel_chains_to_string([tempVar.chains])}.
      </Text>
    );
  }
  return finalGenealogyInheritanceText;
};

export default GenealogyUtils;

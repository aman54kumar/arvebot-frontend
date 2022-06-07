import { Text, View } from "@react-pdf/renderer";
import { InheritanceCalculation } from "../../../../InheritanceCalculation";
import { styles } from "../../../styles";
import { add_legal_reference, currencyFormatNO } from "../pdf_utils";
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

const getGenealogyText = (
  genealogy_inheritance_sum: number,
  value: InheritanceCalculation
) => {
  if (genealogy_inheritance_sum === 0) {
    return (
      <Text style={styles.paragraph}>
        `Det er ingen slektsarv igjen å fordele.`
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
      value.inheritanceConstants.CODE_PARAGRAPHS
    );
    code_paragraph = "76 første ledd, første punktum";
    const legalReference2 = add_legal_reference(
      code_paragraph,
      value.inheritanceConstants.CODE_PARAGRAPHS
    );
    return (
      <Text>
        "Testator har ingen nære slektninger."
        <Text>{legalReference1}</Text>
        <View>
          <Text style={styles.subheading}>Frivillig arbeid</Text>
          <Bold>{currencyFormatNO(value.genealogy_inheritance_sum)}</Bold>
          <Text style={styles.paragraph}>
            {" "}
            vil gå til frivillig arbeid til fordel for barn og unge.
          </Text>
          <Text>{legalReference2}</Text>
        </View>
      </Text>
    );
  } else {
    <Text style={styles.paragraph}>
      De gjenværende <Bold>{currencyFormatNO(genealogy_inheritance_sum)}</Bold>{" "}
      fordeles på slekten slik at det blir likt på hver gren i den aktuelle
      arvegangsklasse. Nærmeste levende slektning er i arvegangsklasse{" "}
      {value.class_closest}
      {getParagraph(
        value.class_closest,
        value.inheritanceConstants.CODE_PARAGRAPHS
      )}
    </Text>;
  }
};

const getParagraph = (class_closest: number, CODE_PARAGRAPHS: any) => {
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
  return (
    <View>
      <Text>{helpText}</Text>
      <Text>{add_legal_reference(code_paragraph, CODE_PARAGRAPHS)}</Text>
    </View>
  );
};
export default GenealogyUtils;

import { Text, View } from "@react-pdf/renderer";
import { PliktdelsarvCalculation } from "../../../../PliktdelsarvCalculation";
import { styles } from "../../../styles";
import {
  add_legal_reference,
  add_legal_references,
  currencyFormatNO,
} from "../pdf_utils";
import { Bold } from "../text-styles/Bold";

const GenealogyPliktUtils = (value: PliktdelsarvCalculation) => {
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
  genealogyInheritanceSum: number,
  value: PliktdelsarvCalculation
) => {
  const genealogy_inheritance_sum = currencyFormatNO(genealogyInheritanceSum);
  const code_paragraph = "50 første ledd";
  const legal_reference_text = add_legal_reference(
    code_paragraph,
    value.inheritanceConstants.CODE_PARAGRAPHS,
    value.inheritanceConstants.LAW_LINKS
  );
  const genealogyInheritanceText = genealogy_inheritance_text(value);
  if (value.genealogy_inheritance_sum === 0) {
    return (
      <Text style={styles.paragraph}>
        Det er ingen slektsarv igjen å fordele.
      </Text>
    );
  } else {
    return (
      <Text style={styles.paragraph}>
        <Bold>{genealogy_inheritance_sum}</Bold>{" "}
        <Text style={styles.paragraph}>
          fordeles på livsarvingene slik at det blir likt på hver gren.
          (livsarvinger/etterkommere av arvelater).
        </Text>
        <Text style={styles.paragraph}>{legal_reference_text}</Text>
        {"\n\n"}
        <Text style={styles.paragraph}>{genealogyInheritanceText}</Text>
      </Text>
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

const genealogy_inheritance_text = (value: PliktdelsarvCalculation) => {
  let finalGenealogyInheritanceText;
  for (const i of Object.entries(value.genealogy_inheritance)) {
    const tempVar = i[1];
    finalGenealogyInheritanceText = (
      <Text style={styles.paragraph}>
        Person med person-id <Bold>{tempVar.person}</Bold> arver totalt{" "}
        <Bold>{currencyFormatNO(tempVar.frac)} </Bold>.
        {unravel_chains_to_string(tempVar.chains)}
      </Text>
    );
  }
  return finalGenealogyInheritanceText;
};

function enumerate(it: any) {
  const resultArray = [];
  for (const [index, element] of it.entries()) {
    resultArray.push([index, element]);
  }
  return resultArray;
}

const unravel_chain_to_string = (chain: any[]): string[] | undefined => {
  if (chain.length === 0) {
    return undefined;
  }
  let s = chain[0];
  for (const [ind, link] of enumerate(chain)) {
    if (ind !== 0) {
      s = `${s} som er stedfortreder for person med person-id ${link}`;
    }
  }
  return s;
};

const unravel_chains_to_string = (chains: any[]): string => {
  let text = "";
  const chains_unraveled = chains.map((chain) => {
    const unraveled_chains = unravel_chain_to_string(chain);
    if (unraveled_chains !== undefined) {
      return unraveled_chains;
    }
  });

  const n = chains_unraveled.length;

  if (n === 0) {
    text = "";
  } else if (n === 1) {
    text = ` som stedfortreder for ${chains_unraveled[0]}`;
  } else {
    text = ` som stedfortreder for `;
    for (const [ind, unraveled_chain] of enumerate(chains_unraveled)) {
      if (ind === 0) {
        text += `${unraveled_chain}`;
      } else if (ind === n - 1) {
        text += ` og som stedfortreder for ${unraveled_chain}`;
      } else {
        text += `, som stedfortreder for ${unraveled_chain}`;
      }
    }
  }
  return text;
};

export default GenealogyPliktUtils;

import { Text, Link } from "@react-pdf/renderer";
import { Bold } from "./text-styles/Bold";
import { Italic } from "./text-styles/Italic";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";

export const currencyFormatNO = (currencyValue: number): string => {
  return Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
    useGrouping: true,
  })
    .format(currencyValue)
    .replace("kr", "NOK")
    .replace(",", ".");
};

export const add_legal_references = (
  code_paragraphs: string[],
  CODE_PARAGRAPHS: any,
  LAW_LINKS: any
) => {
  const legalReferenceTextArray: any[] = [];
  code_paragraphs.forEach((code_paragraph) => {
    legalReferenceTextArray.push(
      add_legal_reference(code_paragraph, CODE_PARAGRAPHS, LAW_LINKS)
    );
  });
  return legalReferenceTextArray;
};

export const add_legal_reference = (
  code_paragraph: string,
  CODE_PARAGRAPHS: any,
  LAW_LINKS: any
) => {
  const lovdataLink = addLovdataLink(code_paragraph, LAW_LINKS);
  return (
    <Text>
      {"\n\n"}
      <Bold>Arveloven § {code_paragraph}:</Bold>{" "}
      <Italic>{CODE_PARAGRAPHS[code_paragraph]}</Italic>
      {"\n\n"}
      <Text>{lovdataLink}</Text>
    </Text>
  );
};

export const addLovdataLink = (code_paragraph: string, LAW_LINKS: any) => {
  const code_paragraph_code = code_paragraph.replace(/[^\d].*/, "");
  const hyperlinkText = add_hyperlink(LAW_LINKS[code_paragraph_code]);
  return (
    <Text>
      For å lese lovteksten i kontekst hos Lovdata, gå til {hyperlinkText}.
    </Text>
  );
};

const add_hyperlink = (url_text: [string, string]) => {
  return (
    <Link src={url_text[0]}>
      <Text>{url_text[1]}</Text>
    </Link>
  );
};

export const unravel_chain_to_string = (
  chain: Array<string>
): string | null => {
  if (chain.length === 0) {
    return null;
  }
  let s = chain.splice(0, 1)[0];
  chain.map((link) => {
    s = `${s} som er stedfortreder for person med person-id ${link}`;
  });
  return s ? s : "";
};

export const unravel_chains_to_string = (
  chains: Array<Array<string>>
): string => {
  const chains_unraveled: Array<string> = [];
  for (const chain of chains) {
    const unravelOutput: string | null = unravel_chain_to_string(chain);
    if (unravelOutput !== null && unravelOutput.length !== 0) {
      chains_unraveled.push(unravelOutput);
    }
  }
  const n = chains_unraveled.length;
  let text = "";
  if (n === 0) return "";
  else if (n === 1) {
    text = ` som stedfortreder for ${chains_unraveled[0]}`;
    return text;
  } else {
    text = " som stedfortreder for ";
    chains_unraveled.map((ind, unraveled_chain) => {
      if (ind && ind.length === 0) {
        text += `${unraveled_chain}`;
      } else if (ind && ind.length === n - 1) {
        text += ` og som stedfortreder for ${unraveled_chain}`;
      } else {
        text += `, som stedfortreder for ${unraveled_chain}`;
      }
    });
    return text;
  }
};

import { Text, View, Link } from "@react-pdf/renderer";
import { Bold } from "./text-styles/Bold";
import { Italic } from "./text-styles/Italic";
import { styles } from "../../styles";
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
  CODE_PARAGRAPHS: any
) => {
  code_paragraphs.forEach((code_paragraph) => {
    console.log(code_paragraph);

    return (
      <View>
        <Text></Text>
        <Text>
          <Bold> Arveloven § {code_paragraph}:</Bold>
          <Italic>{CODE_PARAGRAPHS[code_paragraph]}</Italic>
        </Text>
      </View>
    );
  });
  //   add lovdata link
};

export const add_legal_reference = (
  code_paragraph: string,
  CODE_PARAGRAPHS: any,
  LAW_LINKS: any
) => {
  const lovdataLink = addLovdataLink(code_paragraph, LAW_LINKS);
  return (
    <View>
      {"\n\n"}
      <Text style={styles.paragraph}>
        Arveloven § <Bold>{code_paragraph}</Bold>:{" "}
        <Italic>{CODE_PARAGRAPHS[code_paragraph]}</Italic>
        {"\n\n"}
        <Text style={styles.paragraph}>{lovdataLink}</Text>
      </Text>
    </View>
  );
};

const addLovdataLink = (code_paragraph: string, LAW_LINKS: any) => {
  const code_paragraph_code = code_paragraph.replace(/[^\d].*/, "");
  const hyperlinkText = add_hyperlink(LAW_LINKS[code_paragraph_code]);
  return (
    <View>
      <Text style={styles.paragraph}>
        For å lese lovteksten i kontekst hos Lovdata, gå til {hyperlinkText}.
      </Text>
    </View>
  );
};

const add_hyperlink = (url_text: [string, string]) => {
  return (
    <Link src={url_text[0]}>
      <Text>{url_text[1]}</Text>
    </Link>
  );
};

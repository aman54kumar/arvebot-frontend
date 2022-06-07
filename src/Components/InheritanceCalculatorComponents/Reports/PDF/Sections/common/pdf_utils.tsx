import { Text, View } from "@react-pdf/renderer";
import { Bold } from "./text-styles/Bold";
import { Italic } from "./text-styles/Italic";
import { styles } from "../../styles";

export const currencyFormatNO = (currencyValue: number): string => {
  return Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
    useGrouping: true,
  })
    .format(currencyValue)
    .replace("kr", "NOK");
};

export const add_legal_references = (
  code_paragraphs: string[],
  CODE_PARAGRAPHS: any
) => {
  console.log(CODE_PARAGRAPHS);

  code_paragraphs.forEach((code_paragraph) => {
    console.log(code_paragraph);

    return (
      <View>
        <Text></Text>
        <Text>
          Arveloven § <Bold>{code_paragraph}</Bold>: $
          {/* <Italic>{CODE_PARAGRAPHS[code_paragraph]}</Italic>` */}
        </Text>
      </View>
    );
  });
  //   add lovdata link
};

export const add_legal_reference = (
  code_paragraph: string,
  CODE_PARAGRAPHS: any
) => {
  console.log(CODE_PARAGRAPHS);
  console.log(code_paragraph);
  return (
    <View></View>
    // <View>
    //   {"\n"}
    //   <Text style={styles.paragraph}>
    //     Arveloven § <Bold>{code_paragraph}</Bold>:
    //     <Italic>{CODE_PARAGRAPHS[code_paragraph]}</Italic>
    //     {"\n"}
    //   </Text>
    // </View>
  );
};

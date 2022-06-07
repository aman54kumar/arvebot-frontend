import { Text } from "@react-pdf/renderer";
import { styles } from "../../../styles";

type ItalicProps = {
  children: React.ReactNode;
};

export const Italic = (props: ItalicProps) => (
  <Text style={styles.italicValue}>{props.children}</Text>
);

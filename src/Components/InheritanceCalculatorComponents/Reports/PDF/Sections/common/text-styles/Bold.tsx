import { Text } from "@react-pdf/renderer";
import { styles } from "../../../styles";

type BoldProps = {
  children: React.ReactNode;
};

export const Bold = (props: BoldProps) => (
  <Text style={styles.boldValue}>{props.children}</Text>
);

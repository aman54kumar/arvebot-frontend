import { Text } from "@react-pdf/renderer";
import { styles } from "../../../styles";

export const Header = (): JSX.Element => {
  return (
    <Text style={styles.header} fixed>
      Arvebot
    </Text>
  );
};

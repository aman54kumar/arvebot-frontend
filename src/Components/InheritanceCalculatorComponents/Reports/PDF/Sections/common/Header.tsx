import {
    Text,
} from "@react-pdf/renderer";
import { styles } from "../../styles";

export const Header = () => {
    return (<Text style={styles.header} fixed>
        Arvebot
    </Text>)
}
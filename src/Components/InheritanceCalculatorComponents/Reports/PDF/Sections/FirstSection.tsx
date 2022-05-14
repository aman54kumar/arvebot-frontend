import {
    Text,
    View,
} from "@react-pdf/renderer";
import { styles } from "../styles";

export const FirstSection = () => {
    return (<View style={styles.section} break>
        <Text style={styles.subheading}>Beregnet arv i fravær av testament</Text>
    </View>)
}
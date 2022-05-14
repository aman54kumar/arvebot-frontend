import {
    Text,
} from "@react-pdf/renderer";
import { styles } from "../../styles";

export const Footer = () => {
    return (<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
    )} fixed />)
}
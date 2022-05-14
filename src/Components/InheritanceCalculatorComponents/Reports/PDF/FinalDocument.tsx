import {
    Document,
    Page,
    Text,
    View,
} from "@react-pdf/renderer";
import { FirstSection } from "./Sections/FirstSection";
import { SecondSection } from "./Sections/SecondSection";
import { ThirdSection } from "./Sections/ThirdSection";
import { FourthSection } from "./Sections/FourthSection";
import { styles } from "./styles";


// Create Document Component
const FinalDocument = (props: any) => {
    console.log(props.inputData);

    return (
        <Document>
            {/*render a single page*/}
            <Page size="A4" style={styles.page}>
                <Text style={styles.header} fixed>
                    Arvebot
                </Text>
                <View style={styles.section}>
                    <Text style={styles.heading}>Beregning av arv</Text>
                    <Text style={styles.paragraph}>Dette dokumentet inneholder en beregning av arv etter arvelater med person-id ff. Boet har en total verdi på  111 234 666 777.00.</Text>
                </View>
                <FirstSection />
                <SecondSection />
                <ThirdSection />
                <FourthSection />





                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>

        </Document>

    );
    // }
    // else return <div>hello</div>
}
export default FinalDocument;
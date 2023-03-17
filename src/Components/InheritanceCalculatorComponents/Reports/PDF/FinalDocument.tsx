import { Document, Page } from '@react-pdf/renderer';
import { FirstSection } from './Sections/firstSection/FirstSection';
import { SecondSection } from './Sections/secondSection/SecondSection';
import { ThirdSection } from './Sections/thirdSection/ThirdSection';
import { FourthSection } from './Sections/fourthSection/FourthSection';
import { styles } from './styles';
import { Footer } from './Sections/common/fixedSection/Footer';
import { Header } from './Sections/common/fixedSection/Header';
import { createContext } from 'react';
import { InheritanceCalculation } from '../InheritanceCalculation';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import { PliktdelsarvCalculation } from '../PliktdelsarvCalculation';
import { UndividedCalculation } from '../UndividedCalculation';
import { FifthSection } from './Sections/fifthSection/fifthSection';

interface FinalObjectInput {
    inheritanceCalculation: InheritanceCalculation;
    pliktdelsarvCalculation: PliktdelsarvCalculation;
    undividedCalculation: UndividedCalculation;
}

export const UserContext = createContext(
    {} as {
        inheritanceCalculation: InheritanceCalculation;
        pliktdelsarvCalculation: PliktdelsarvCalculation;
        undividedCalculation: UndividedCalculation;
    },
);
// First Section - Introduction, Inheritance
// Second Section - Uskiftearv
// Third Section - Pliktdelsarv
// Fourth Section - Merknader og forbehold
const FinalDocument = (props: { inputData: FinalObjectInput }): JSX.Element => {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <UserContext.Provider
                    value={{
                        inheritanceCalculation:
                            props.inputData.inheritanceCalculation,
                        pliktdelsarvCalculation:
                            props.inputData.pliktdelsarvCalculation,
                        undividedCalculation:
                            props.inputData.undividedCalculation,
                    }}
                >
                    <Header />
                    <FirstSection />
                    <SecondSection />
                    <ThirdSection />
                    <FourthSection />
                    <FifthSection />
                    <Footer />
                </UserContext.Provider>
            </Page>
        </Document>
    );
};
export default FinalDocument;

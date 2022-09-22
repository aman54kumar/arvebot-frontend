import { Document, Page } from "@react-pdf/renderer";
import { FirstSection } from "./Sections/firstSection/FirstSection";
import { SecondSection } from "./Sections/secondSection/SecondSection";
import { ThirdSection } from "./Sections/thirdSection/ThirdSection";
import { FourthSection } from "./Sections/fourthSection/FourthSection";
import { styles } from "./styles";
import { IntroductionPage } from "./Sections/common/introSection/IntroductionPage";
import { Footer } from "./Sections/common/Footer";
import { Header } from "./Sections/common/Header";
import { createContext } from "react";
import { InheritanceCalculation } from "../InheritanceCalculation";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";
import { PliktdelsarvCalculation } from "../PliktdelsarvCalculation";
import { UndividedCalculation } from "../UndividedCalculation";
import { FifthSection } from "./Sections/fifthSection/fifthSection";

interface FinalObjectInput {
  inheritanceCalculation: InheritanceCalculation;
  pliktdelsarvCalculation: PliktdelsarvCalculation;
  // undividedCalculation: UndividedCalculation|
}

export const UserContext = createContext(
  {} as {
    inheritanceCalculation: InheritanceCalculation;
    pliktdelsarvCalculation: PliktdelsarvCalculation;
  }
);
// First Section - Introduction, Inheritance
// Second Section - Uskiftearv
// Third Section - Pliktdelsarv
// Fourth Section - Merknader og forbehold
const FinalDocument = (props: { inputData: FinalObjectInput }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <UserContext.Provider
          value={{
            inheritanceCalculation: props.inputData.inheritanceCalculation,
            pliktdelsarvCalculation: props.inputData.pliktdelsarvCalculation,
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

import { Document, Page } from "@react-pdf/renderer";
import { FirstSection } from "./Sections/firstSection/FirstSection";
import { SecondSection } from "./Sections/secondSection/SecondSection";
import { ThirdSection } from "./Sections/thirdSection/ThirdSection";
import { FourthSection } from "./Sections/fourthSection/FourthSection";
import { styles } from "./styles";
import { IntroductionPage } from "./Sections/introSection/IntroductionPage";
import { Footer } from "./Sections/common/Footer";
import { Header } from "./Sections/common/Header";
import { createContext } from "react";
import { InheritanceCalculation } from "../InheritanceCalculation";

export const UserContext = createContext({} as InheritanceCalculation);
// Create Document Component
const FinalDocument = (props: any) => {
  console.log(props.inputData);

  return (
    <Document>
      {/*render a single page*/}
      <Page size="A4" style={styles.page}>
        <UserContext.Provider value={props.inputData}>
          <Header />
          <IntroductionPage />
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
          <Footer />
        </UserContext.Provider>
      </Page>
    </Document>
  );
  // }
  // else return <div>hello</div>
};
export default FinalDocument;

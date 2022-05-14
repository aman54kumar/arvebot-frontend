import { Document, Page } from "@react-pdf/renderer";
import { FirstSection } from "./Sections/firstSection/FirstSection";
import { SecondSection } from "./Sections/secondSection/SecondSection";
import { ThirdSection } from "./Sections/thirdSection/ThirdSection";
import { FourthSection } from "./Sections/fourthSection/FourthSection";
import { styles } from "./styles";
import { IntroductionPage } from "./Sections/introSection/IntroductionPage";
import { Footer } from "./Sections/common/Footer";
import { Header } from "./Sections/common/Header";

// Create Document Component
const FinalDocument = (props: any) => {
  console.log(props.inputData);

  return (
    <Document>
      {/*render a single page*/}
      <Page size="A4" style={styles.page}>
        <Header />
        <IntroductionPage />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <Footer />
      </Page>
    </Document>
  );
  // }
  // else return <div>hello</div>
};
export default FinalDocument;

import { Text, View } from "@react-pdf/renderer";
import { styles } from "../../styles";
import { UndividedEstateCalculation } from "./UndividedEstateCalculation/UndividedEstateCalculation";
import { useContext } from "react";
import { UserContext } from "../../FinalDocument";
export const SecondSection = () => {
  const value = useContext(UserContext).inheritanceCalculation;

  const undividedStateElement = (
    <View style={styles.section}>
      <Text style={styles.subheading}>Uskiftearv</Text>
      <UndividedEstateCalculation />
    </View>
  );
  {
    const secondSectionElement = value.state.undividedEstate
      .undividedEstateChoice ? (
      undividedStateElement
    ) : (
      <Text></Text>
    );
    return secondSectionElement;
  }
};

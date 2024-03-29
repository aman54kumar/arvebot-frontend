import { getPerson } from '../../../../../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods';
import { undividedOwnershipType } from '../../../../../ChatbotComponent/Helper/Enums/ChatStepTypes';
import { InheritanceCalculation } from '../../../../InheritanceCalculation';
import { currencyFormatNO } from '../../../../pdf_utils';

const undivided_estate_results = (value: InheritanceCalculation) => {
    const finalresult = '';
    const first_partly_separate = value.state.undividedEstate.temp_first;
    const testator_name = getPerson(
        value.state.testator._id,
        value.state.personsMap,
    )._personName;
    const second_partly_separate = value.state.undividedEstate.temp_last;
    const undivided_spouse_name = getPerson(
        value.state.undividedSpouseId,
        value.state.personsMap,
    )._personName;
    const testator_wealth = currencyFormatNO(value.state.netWealth);
    const undivided_estate_separate_wealth = currencyFormatNO(
        value.state.undividedEstate.undividedEstateSeparateWealth,
    );
    if (value.state.undividedEstate.undividedEstateChoice) {
        finalresult.concat('<Text>Arvelater satt i uskiftet bo. </Text');
        if (
            value.state.undividedEstate.ownershipType ===
            undividedOwnershipType.felleseie[0]
        ) {
            finalresult.concat(
                `<Text>Det uskiftede boet var utelukkende felleseie. Boet verdier fordeles likt på førstavdødes og sistavdødes arvinger, ${value.state.undividedEstate.undividedEstateSeparateWealth} på hver gruppe.</Text>`,
            );
        } else if (
            value.state.undividedEstate.ownershipType ===
            undividedOwnershipType.delvis[0]
        ) {
            finalresult.concat(
                `<Text>Det uskiftede boet var delvis særeie. Førstavdødes (${undivided_spouse_name}) særeie hadde en verdi på ${first_partly_separate}, mens sistavødedes (${testator_name}) særeie hadde en verdi på ${second_partly_separate}. Verdiene som fordeles blant førstavdødes (${undivided_spouse_name}) arvinger er ${testator_wealth}, mens verdiene som fordeles blant sistavdødes (${testator_name})  arvinger er ${undivided_estate_separate_wealth}.</Text>`,
            );
        } else if (
            value.state.undividedEstate.ownershipType ===
            undividedOwnershipType.fullt[0]
        ) {
            finalresult.concat(
                `<Text>Det uskiftede boet var fullt særeie. Verdiene som fordeles blant førstavdødes (${undivided_spouse_name})  arvinger er ${testator_wealth}, mens verdiene som fordeles blant sistavdødes (${testator_name}) arvinger er ${undivided_estate_separate_wealth}.</Text>`,
            );
        } else {
            console.log('check for problem, untroduction.utils.ts');
        }
    }
    return finalresult;
};

export const IntroductionUtils = (value: InheritanceCalculation) => {
    const currencyFormatted = currencyFormatNO(value.state.netWealth);

    const testatorName = getPerson(1, value.state.personsMap)._personName;
    return {
        currencyFormatted: currencyFormatted,
        testatorName: testatorName,
    };
};

import { Text, View } from '@react-pdf/renderer';
import InheritanceConstants from '../../../../../ChatbotComponent/Helper/Methods/InheritanceConstants';
import { PliktdelsarvCalculation } from '../../../../PliktdelsarvCalculation';
import { styles } from '../../../styles';
import {
    add_legal_reference,
    currencyFormatNO,
    unravel_chains_to_string,
} from '../../../../pdf_utils';
import { Bold } from '../text-styles/Bold';
import { getGenealogyInheritanceText } from './CommonMethods';

const GenealogyPliktUtils = (value: PliktdelsarvCalculation) => {
    const genealogy_inheritance_sum = value.genealogy_inheritance_sum;
    const genealogyText = getGenealogyText(genealogy_inheritance_sum, value);

    return (
        <View>
            <Text>{genealogyText}</Text>
        </View>
    );
};

// add_inheritance_calculation_relatives
const getGenealogyText = (
    genealogyInheritanceSum: number,
    value: PliktdelsarvCalculation,
) => {
    const genealogy_inheritance_sum = currencyFormatNO(genealogyInheritanceSum);
    const code_paragraph = '50 første ledd';
    const legal_reference_text = add_legal_reference(
        code_paragraph,
        InheritanceConstants.CODE_PARAGRAPHS,
        InheritanceConstants.LAW_LINKS,
    );
    const genealogyInheritanceText = getGenealogyInheritanceText(value);
    if (value.genealogy_inheritance_sum === 0) {
        return (
            <Text style={styles.paragraph}>
                Det er ingen slektsarv igjen å fordele.
            </Text>
        );
    } else {
        return (
            <Text style={styles.paragraph}>
                <Bold>{genealogy_inheritance_sum}</Bold>{' '}
                <Text style={styles.paragraph}>
                    fordeles på livsarvingene slik at det blir likt på hver
                    gren. (livsarvinger/etterkommere av arvelater).
                </Text>
                <Text style={styles.paragraph}>{legal_reference_text}</Text>
                {'\n\n'}
                <Text style={styles.paragraph}>{genealogyInheritanceText}</Text>
            </Text>
        );
    }
};

const getParagraph = (
    class_closest: number,
    CODE_PARAGRAPHS: any,
    LAW_LINKS: any,
) => {
    let code_paragraph = '';
    let helpText = '';
    if (class_closest === 1) {
        code_paragraph = '4 første og annet ledd';
        helpText = ' (livsarvinger/etterkommere av arvelater).';
    } else if (class_closest === 2) {
        code_paragraph = '5 første, andre og tredje ledd';
        helpText = ' (arvelaters foreldre og deres etterkommere).';
    } else if (class_closest === 3) {
        code_paragraph = '6 første og annet ledd';
        helpText = ' (arvelaters besteforeldre og deres etterkommere).';
    } else {
        console.log('check for error');
    }
    const legalReferenceText = add_legal_reference(
        code_paragraph,
        CODE_PARAGRAPHS,
        LAW_LINKS,
    );
    return (
        <View>
            <Text>{helpText}</Text>
            <Text>{legalReferenceText}</Text>
        </View>
    );
};

export default GenealogyPliktUtils;

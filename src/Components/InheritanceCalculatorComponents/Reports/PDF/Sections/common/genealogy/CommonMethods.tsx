import { Text } from '@react-pdf/renderer';
import { InheritanceCalculation } from '../../../../InheritanceCalculation';
import {
    currencyFormatNO,
    unravel_chains_to_string,
} from '../../../../pdf_utils';
import { PliktdelsarvCalculation } from '../../../../PliktdelsarvCalculation';
import { Bold } from '../text-styles/Bold';

export const getGenealogyInheritanceText = (
    value: InheritanceCalculation | PliktdelsarvCalculation,
) => {
    const finalGenealogyInheritanceText = [];
    for (const obj of value.genealogy_inheritance) {
        finalGenealogyInheritanceText.push(
            <Text>
                Person med person-id <Bold>{obj.person}</Bold> arver totalt{' '}
                <Bold>{currencyFormatNO(obj.frac)} </Bold>
                {unravel_chains_to_string([obj.chains])}.{'\n'}
            </Text>,
        );
    }
    return finalGenealogyInheritanceText;
};

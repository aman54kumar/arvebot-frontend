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
        const id = Math.random().toString(36).substring(7);
        finalGenealogyInheritanceText.push(
            <Text key={id}>
                Person med person-id <Bold>{obj.person}</Bold> arver totalt{' '}
                <Bold>{currencyFormatNO(obj.frac)} </Bold>
                {unravel_chains_to_string([obj.chains])}.{'\n'}
            </Text>,
        );
    }
    return finalGenealogyInheritanceText;
};

import { Text, View } from '@react-pdf/renderer';
import { styles } from '../../../styles';
import generalReservationsUtils from './GeneralReservationsUtils';

export const GeneralReservations = (): JSX.Element => {
    const generalReservationsText = generalReservationsUtils();
    return (
        <View style={styles.section} wrap={false}>
            <Text>
                {generalReservationsText.uskifteText}
                {'\n\n'}
            </Text>
            <Text>
                {generalReservationsText.testamentText}
                {'\n\n'}
            </Text>
            <Text>
                {generalReservationsText.avkortingText}
                {'\n\n'}
            </Text>
            <Text>
                {generalReservationsText.barnText}
                {'\n\n'}
            </Text>
        </View>
    );
};

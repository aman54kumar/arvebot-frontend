import { Text, View } from '@react-pdf/renderer';
import { styles } from '../../styles';
import { GeneralReservations } from './generalReservations/GeneralReservations';
import { NationalInsurance } from './nationalInsurance/NationalInsurance';

export const FourthSection = (): JSX.Element => {
    return (
        <View style={styles.section}>
            <Text style={styles.subheading}>
                Generelle merknader og forbehold{'\n\n'}
            </Text>
            <NationalInsurance />
            <GeneralReservations />
        </View>
    );
};

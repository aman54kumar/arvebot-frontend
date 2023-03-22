import ReactPDF from '@react-pdf/renderer';
import { ReactElement } from 'react';
import InfoMessagesWidget from '../Widgets/InfoMessagesWidget/InfoMessagesWidget';

const CustomMessage = (props: any) => {
    return <InfoMessagesWidget {...props} />;
};
export default CustomMessage;

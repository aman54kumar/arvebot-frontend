import { Box } from '@mui/material';
import PropTypes, { InferProps } from 'prop-types';
import './InfoMessagesWidget.scss';
import { ReactElement } from 'react';
import ReactPDF from '@react-pdf/renderer';

// const InfoMessageTypes = {
//     label: ReactElement,
// };
// type InfoMessageTypes = InferProps<typeof InfoMessageTypes>;

const InfoMessagesWidget = (label: typeof ReactPDF.PDFDownloadLink) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            component="span"
            className="InfoMessage"
            sx={{ backgroundColor: '#FFCBA4' }}
        >
            {label}
        </Box>
    );
};
// color: #FFCBA4

export default InfoMessagesWidget;

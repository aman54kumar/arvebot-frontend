import { Box, Tooltip } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import './CustomFinalMessage.scss';

const CustomFinalMessage = (props: any) => {
    return (
        <Tooltip title="Click to Download Report">
            <Box className="react-chatbot-kit-custom-chat-message-container">
                <div className="react-chatbot-kit-custom-chat-text-message-container">
                    {props.payload}
                </div>
                <div className="react-chatbot-kit-custom-chat-image-message-container">
                    <FileDownloadOutlinedIcon />
                </div>
            </Box>
        </Tooltip>
    );
};
export default CustomFinalMessage;

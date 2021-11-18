import { Box } from "@mui/material";
import PropTypes, { InferProps } from 'prop-types';
import './InfoMessagesWidget.scss'

const InfoMessageTypes = {
  label: PropTypes.string
}
type InfoMessageTypes = InferProps<typeof InfoMessageTypes>

const InfoMessagesWidget = ({ label }: InfoMessageTypes) => {
  return <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    component="span"
    className="InfoMessage"
  >
    {label}
  </Box>
};


export default InfoMessagesWidget;
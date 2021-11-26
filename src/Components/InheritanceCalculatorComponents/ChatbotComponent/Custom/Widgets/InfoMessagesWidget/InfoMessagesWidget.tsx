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
    sx={{ backgroundColor: "#FFCBA4" }}
  >
    Amount Entered: {label}
  </Box>
};
// color: #FFCBA4

export default InfoMessagesWidget;
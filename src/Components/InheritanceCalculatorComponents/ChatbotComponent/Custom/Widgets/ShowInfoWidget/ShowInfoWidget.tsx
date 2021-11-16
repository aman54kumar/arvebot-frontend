import { ReactElement, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import "./ShowInfoWidget.scss";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from "react-intl";
// import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#e8e4c9",
  },
}));

const ShowInfoWidget = (props: any): ReactElement => {
  const classes = useStyles();
  /*
   used reference to parent element for correcting the scrollbar conflict issue on popover show.
   https://stackoverflow.com/questions/53985436/material-ui-unblock-scrolling-when-popover-is-opened
  */
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className="infoDiv" ref={containerRef}>
      <LiveHelpIcon
        className="InfoWidgetIcon"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
      />

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        container={containerRef.current}
      >
        <FormattedMessage id={props.text} />
      </Popover>
    </div>
  );
};

export default ShowInfoWidget;

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { RestartAlt } from '@mui/icons-material';
import UndoIcon from '@mui/icons-material/Undo';
import { Button, Tooltip, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { focusWritingArea } from '../../ChatbotComponent/Helper/Methods/CommonMethods';

export default function ChatHeader(props: any) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleRevert = () => {
        props.actionProvider.revertLastState();
    };
    const handleCloseNo = () => {
        setOpen(false);
    };

    const handleCloseYes = () => {
        restartBot();
        setOpen(false);
    };

    const restartBot = () => {
        props.actionProvider.resetChatbot();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Conversation with ArveBot
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Tooltip title="Undo">
                            <Button
                                onClick={() => {
                                    handleRevert();
                                    focusWritingArea();
                                }}
                                style={{ backgroundColor: 'rgb(92, 204, 157)' }}
                            >
                                <UndoIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                        <Box sx={{ width: '8px' }} />
                        <Tooltip title="Restart">
                            <Button
                                onClick={handleClickOpen}
                                style={{ backgroundColor: 'rgb(92, 204, 157)' }}
                            >
                                <RestartAlt fontSize="small" />
                            </Button>
                        </Tooltip>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleCloseNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Restart ChatBot?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you really want to finish current session and
                                start over?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNo}>No</Button>
                            <Button onClick={handleCloseYes} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

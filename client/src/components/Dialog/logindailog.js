import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const dailogBox = {
    minWidth: '300px',
    boxShadow: 3
}
const content = { margin: 'auto', padding: 'auto' }
export default function FormDialog({ children, title }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>Login</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div style={dailogBox}>
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent style={content}>
                        {children}
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}
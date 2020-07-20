import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface SetOpenInterface {
    (newOpen: boolean): void
}

interface DialogPropsInterface {
    open: boolean,
    setOpen: SetOpenInterface,
    title: string,
    text: string
}

export default ({open, setOpen, title, text}: DialogPropsInterface) => {
    const handleClose = () => setOpen(false)

    return (
        <Dialog open={open}>
            <DialogTitle id='alert-dialog-title'>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Entendido
                </Button>
            </DialogActions>
        </Dialog>
    )
}
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";


export default class DangerActionConfirmationModal extends Component {
    state = {
        isSubmitting: false,
        error: null,
    };

    get dialogContent() {
        // Preferably overriden by subclass
        return (
            <DialogContentText>
                This action cannot be undone.
            </DialogContentText>
        );
    }

    onConfirmAction = () => {
        // To be implemented by subclass
        console.log("Invoked parent onConfirmAction()");
    };

    closeModal = () => {
        if (this.state.isSubmitting) {
            return;
        }

        this.props.onClose();
    };

    render() {
        const {open, dialogTitle, buttonName} = this.props;
        const {isSubmitting, error} = this.state;

        return (
            <Dialog open={open} onClose={this.closeModal}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {this.dialogContent}
                </DialogContent>
                <DialogActions>
                    <div>
                        <Grid container spacing={8} alignItems="center">
                            {isSubmitting &&
                            <Grid item>
                                <CircularProgress size={24} />
                            </Grid>
                            }

                            {error &&
                            <Grid item>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                            }
                        </Grid>
                    </div>
                    <Button color="primary"
                            disabled={isSubmitting}
                            onClick={this.onConfirmAction}>
                        {buttonName}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
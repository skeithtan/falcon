import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";


export class ConfirmActionModal extends Component {
    state = {
        isSubmitting: false,
        error: null,
    };

    // Preferably overriden by subclass
    get dialogTitle() {
        return "Are you sure you want to perform this action?";
    }

    // Preferably overriden by subclass
    get dialogContent() {
        return (
            <DialogContentText>
                This action cannot be undone.
            </DialogContentText>
        );
    }

    // Preferably overriden by subclass
    get buttonName() {
        return "Confirm Action";
    }

    // To be implemented by subclass
    get toastSuccessMessage() {

    }

    // To be implemented by subclass
    get submitAction() {

    }

    // Can be overriden by subclass
    get submitButtonIsEnabled() {
        return true;
    }

    onConfirmAction = () => {
        const {showToast} = this.props;
        this.setState({isSubmitting: true, error: null});

        this.submitAction()
            .then(() => this.setState({isSubmitting: false}))
            .then(this.closeModal)
            .then(() => {
                if (showToast) {
                    showToast(this.toastSuccessMessage);
                }
            })
            .catch(error => {
                console.log("An error occurred", error);
                this.setState({isSubmitting: false, error: "An error occurred"});
            });
    };

    closeModal = () => {
        if (this.state.isSubmitting) {
            return;
        }

        this.props.onClose();
    };

    render() {
        const open = this.props.open;
        const {isSubmitting, error} = this.state;

        return (
            <Dialog open={open} onClose={this.closeModal}>
                <DialogTitle>{this.dialogTitle}</DialogTitle>
                <DialogContent>
                    {this.dialogContent}
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={8} alignItems="center" justify="flex-end">
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

                        <Grid item>
                            <Button
                                color="primary"
                                disabled={isSubmitting || !this.submitButtonIsEnabled}
                                onClick={this.onConfirmAction}
                            >
                                {this.buttonName}
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        );
    }
}
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import React, { Component, PureComponent } from "react";
import { resetFacultyPassword } from "../../../../../services/faculty/faculty";
import { getPossessivePronoun } from "../../../../../utils/faculty.util";
import {
    generateTemporaryPassword,
    getFullName,
} from "../../../../../utils/user.util";

const steps = [
    {
        label: "Confirmation",
        content: (faculty, errors) => (
            <ResetConfirmation faculty={faculty} errors={errors} />
        ),
    },
    {
        label: "Resetting...",
        content: faculty => <ResettingStep faculty={faculty} />,
    },
    {
        label: "Reset Success",
        content: (faculty, errors, newPassword) => (
            <ResetSuccess faculty={faculty} newPassword={newPassword} />
        ),
    },
];

class ResetConfirmation extends PureComponent {
    render() {
        const { faculty, errors } = this.props;
        const fullName = getFullName(faculty.user);
        const possessivePronoun = getPossessivePronoun(faculty);

        return (
            <DialogContentText>
                Are you sure you want to reset <b>{fullName}</b>'s password?{" "}
                {fullName} won't be able to sign in to {possessivePronoun}{" "}
                account again with {possessivePronoun} old password.
                {errors && (
                    <Typography color="error">
                        An error occurred: {errors}
                    </Typography>
                )}
            </DialogContentText>
        );
    }
}

class ResettingStep extends PureComponent {
    render() {
        const { faculty } = this.props;
        const fullName = getFullName(faculty.user);
        return (
            <Grid container spacing={16} direction="column">
                <Grid item>
                    <DialogContentText>
                        Resetting <b>{fullName}</b>'s password
                    </DialogContentText>
                </Grid>
                <Grid item>
                    <CircularProgress size={50} />
                </Grid>
            </Grid>
        );
    }
}

class ResetSuccess extends PureComponent {
    render() {
        const { faculty, newPassword } = this.props;
        const fullName = getFullName(faculty.user);

        return (
            <DialogContentText>
                <b>{fullName}</b>'s password has been reset. The new password is{" "}
                <b>{newPassword}</b>. Keep this password elsewhere because once
                this dialog is dismissed, it can never be viewed again.
            </DialogContentText>
        );
    }
}

export class ResetPasswordModal extends Component {
    state = {
        activeStep: 0,
        isSubmitting: false,
        doneSubmitting: false,
        newPassword: null,
        errors: null,
    };

    resetForm = () =>
        this.setState({
            isSubmitting: false,
            doneSubmitting: false,
            newPassword: null,
            errors: null,
            activeStep: 0,
        });

    closeModal = () => {
        if (this.state.isSubmitting || this.state.doneSubmitting) {
            return;
        }

        this.resetForm();
        this.props.onClose();
    };

    onResetPasswordClick = () => {
        const { faculty } = this.props;
        const newPassword = generateTemporaryPassword();

        this.setState({
            isSubmitting: true,
            errors: null,
        });

        resetFacultyPassword(faculty._id, newPassword)
            .then(() => {
                this.setState({
                    isSubmitting: false,
                    doneSubmitting: true,
                    newPassword: newPassword,
                    activeStep: 2,
                });
            })
            .catch(error => {
                console.log(
                    "An error occurred while resetting password",
                    error
                );
                this.setState({
                    isSubmitting: false,
                    errors: [error.message],
                    activeStep: 0,
                });
            });
    };

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });

        if (activeStep === 0) {
            this.onResetPasswordClick();
        }

        if (activeStep === 2) {
            this.resetForm();
            this.props.onClose();
        }
    };

    render() {
        const { faculty, open } = this.props;
        const { newPassword, errors, activeStep } = this.state;

        return (
            <Dialog
                open={open}
                onClose={this.closeModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Reset Faculty Password</DialogTitle>

                <DialogContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map(({ label, content }) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {content(faculty, errors, newPassword)}

                                    <DialogActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={activeStep === 1}
                                            onClick={this.handleNext}
                                        >
                                            {activeStep === steps.length - 1
                                                ? "Finish"
                                                : "Next"}
                                        </Button>
                                    </DialogActions>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </DialogContent>
            </Dialog>
        );
    }
}

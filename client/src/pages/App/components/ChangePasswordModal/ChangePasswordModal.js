import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import React from "react";
import zxcvbn from "zxcvbn";
import { ModalFormComponent } from "../../../../components/ModalFormComponent";
import { changeCurrentUserPassword } from "../../../../services/user.service";
import { validateForm } from "../../../../utils/forms.util";


function getFormErrors(form) {
    const result = zxcvbn(form.password);

    return validateForm({
        password: {
            value: form.password,
            customValidators: [{
                isValid(value) {
                    return result.score > 2;
                },
                errorMessage: result.feedback.warning || "This password is too short / easy to guess",
            }],
        },
        confirmPassword: {
            value: form.confirmPassword,
            customValidators: [{
                isValid(value) {
                    return value === form.password;
                },
                errorMessage: "Confirm password must match password",
            }],
        },
    });
}

export class ChangePasswordModal extends ModalFormComponent {
    get initialForm() {
        return {
            password: "",
            confirmPassword: "",
        };
    }

    mapPropsToForm = () => this.initialForm;

    get submitUpdateAction() {
        return () =>
            changeCurrentUserPassword(this.state.form.password)
                .then(this.props.onChangePasswordSuccess);
    }

    get buttonName() {
        return "Change Password";
    }

    render() {
        const {open, classes} = this.props;
        const {form, isSubmitting} = this.state;
        const {hasErrors, fieldErrors} = getFormErrors(form);

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>Change my Password</DialogTitle>
                <DialogContent className={classes.container}>
                    <form>
                        <Grid container className={classes.form} spacing={24} direction="column">

                            <Grid item>
                                <FormControl fullWidth error={fieldErrors.password.length > 0}>
                                    <TextField
                                        label="New Password"
                                        disabled={isSubmitting}
                                        type="password"
                                        autoComplete="on"
                                        onChange={this.handleFormChange("password")}
                                        value={form.password}
                                    />

                                    {fieldErrors.password.length > 0 &&
                                    <FormHelperText>{fieldErrors.password[0]}</FormHelperText>
                                    }
                                </FormControl>
                            </Grid>

                            <Grid item>
                                <FormControl fullWidth error={fieldErrors.confirmPassword.length > 0}>
                                    <TextField
                                        label="Confirm Password"
                                        disabled={isSubmitting}
                                        type="password"
                                        autoComplete="on"
                                        onChange={this.handleFormChange("confirmPassword")}
                                        value={form.confirmPassword}
                                    />

                                    {fieldErrors.confirmPassword.length > 0 &&
                                    <FormHelperText>{fieldErrors.confirmPassword[0]}</FormHelperText>
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>

                {this.renderModalFormDialogActions(hasErrors)}

            </Dialog>
        );
    }
}
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ModalFormComponent } from "../../../../components/ModalFormComponent";
import { changeCurrentUserPassword } from "../../../../services/user.service";
import { validateForm } from "../../../../utils/forms.util";
import { wrap } from "./wrapper";

function getFormErrors(form) {
    return validateForm({
        password: {
            value: form.password,
            customValidators: [
                {
                    isValid(value) {
                        return value.length > 8;
                    },
                    errorMessage: "This password is too short",
                },
            ],
        },
        confirmPassword: {
            value: form.confirmPassword,
            customValidators: [
                {
                    isValid(value) {
                        return value === form.password;
                    },
                    errorMessage: "Confirm password does not match",
                },
            ],
        },
    });
}

class BaseChangePasswordModal extends ModalFormComponent {
    get initialForm() {
        return {
            password: "",
            confirmPassword: "",
        };
    }

    mapPropsToForm = () => this.initialForm;

    get submitUpdateAction() {
        return () =>
            changeCurrentUserPassword(this.state.form.password).then(
                this.props.onChangePasswordSuccess
            );
    }

    get modalTitle() {
        return "Change my Password";
    }

    get buttonName() {
        return "Change Password";
    }

    get formErrors() {
        return getFormErrors(this.state.form);
    }

    get dialogActionIsDisabled() {
        return this.formErrors.hasErrors;
    }

    renderDialogContent = () => {
        const { classes } = this.props;
        const { form, isSubmitting } = this.state;
        const { fieldErrors } = this.formErrors;

        return (
            <form className={classes.container}>
                <Grid
                    container
                    className={classes.form}
                    spacing={24}
                    direction="column"
                >
                    <Grid item>
                        <FormControl
                            fullWidth
                            error={fieldErrors.password.length > 0}
                        >
                            <TextField
                                label="New Password"
                                disabled={isSubmitting}
                                type="password"
                                autoComplete="on"
                                onChange={this.handleFormChange("password")}
                                value={form.password}
                            />

                            {fieldErrors.password.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.password[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            fullWidth
                            error={fieldErrors.confirmPassword.length > 0}
                        >
                            <TextField
                                label="Confirm Password"
                                disabled={isSubmitting}
                                type="password"
                                autoComplete="on"
                                onChange={this.handleFormChange(
                                    "confirmPassword"
                                )}
                                value={form.confirmPassword}
                            />

                            {fieldErrors.confirmPassword.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.confirmPassword[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export const ChangePasswordModal = wrap(BaseChangePasswordModal);

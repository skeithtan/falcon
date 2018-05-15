import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { Component } from "react";
import validateForm from "../../../../../../../utils/forms";


function getUserFormErrors(form) {
    return validateForm({
        email: {
            value: form.email,
            customValidators: [{
                isValid(value) {
                    return /\S+@\S+\.\S+/.test(value);
                },
                errorMessage: "Must be a valid email address",
            }],
        },
        firstName: {
            value: form.firstName,
        },
        lastName: {
            value: form.lastName,
        },
        password: {
            value: form.password,
            customValidators: [], //TODO: Add security validation
        },
    });
}

export default class UserForm extends Component {
    render() {
        const {handleFormChange, form, handleNext} = this.props;
        const {hasErrors, fieldErrors} = getUserFormErrors(form);

        return [
            <Grid container spacing={16} key={0}>
                <Grid item xs={6}>
                    <FormControl error={fieldErrors.firstName.length > 0} fullWidth>
                        <InputLabel>First Name</InputLabel>
                        <Input value={form.firstName} onChange={handleFormChange("firstName")} />
                        {fieldErrors.firstName.length > 0 &&
                        <FormHelperText>{fieldErrors.firstName[0]}</FormHelperText>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl error={fieldErrors.lastName.length > 0} fullWidth>
                        <InputLabel>Last Name</InputLabel>
                        <Input value={form.lastName} onChange={handleFormChange("lastName")} type="email" />
                        {fieldErrors.lastName.length > 0 &&
                        <FormHelperText>{fieldErrors.lastName[0]}</FormHelperText>
                        }
                    </FormControl>
                </Grid>
            </Grid>,
            <FormControl key={1} error={fieldErrors.email.length > 0} fullWidth>
                <InputLabel>Email Address</InputLabel>
                <Input value={form.email} onChange={handleFormChange("email")} type="email" />
                {fieldErrors.email.length > 0 &&
                <FormHelperText>{fieldErrors.email[0]}</FormHelperText>
                }
            </FormControl>,
            <FormControl key={2} error={fieldErrors.password.length > 0} fullWidth>
                <InputLabel>Temporary Password</InputLabel>
                <Input value={form.password} onChange={handleFormChange("password")}/>
                {fieldErrors.password.length > 0 &&
                <FormHelperText>{fieldErrors.password[0]}</FormHelperText>
                }
            </FormControl>,
            <Button
                key={4}
                disabled={hasErrors}
                variant="raised"
                color="primary"
                onClick={handleNext}>
                Next
            </Button>,
        ];
    }
}
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import React, { PureComponent, Fragment } from "react";
import { Uploader } from "../../../../../../../components/Uploader";
import { validateForm } from "../../../../../../../utils/forms.util";
import { wrap } from "./wrapper";


function getUserFormErrors(form, existingFaculties) {
    return validateForm({
        email: {
            value: form.email,
            customValidators: [
                {
                    isValid(value) {
                        return /\S+@\S+\.\S+/.test(value);
                    },
                    errorMessage: "Must be a valid email address",
                },
                {
                    isValid(value) {
                        return existingFaculties.every(faculty => faculty.user.email !== value);
                    },
                    errorMessage: "A faculty with this email already exists",
                },
            ],
        },
        firstName: {
            value: form.firstName,
        },
        lastName: {
            value: form.lastName,
        },
    });
}

class BaseUserForm extends PureComponent {
    render() {
        const {handleFormChange, form, handleNext} = this.props;
        const {hasErrors, fieldErrors} = getUserFormErrors(form, this.props.faculties);

        return (

            <Fragment>
                <Grid container spacing={16}>
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
                </Grid>

                <FormControl error={fieldErrors.email.length > 0} fullWidth>
                    <InputLabel>Email Address</InputLabel>
                    <Input value={form.email} onChange={handleFormChange("email")} type="email" />
                    {fieldErrors.email.length > 0 &&
                    <FormHelperText>{fieldErrors.email[0]}</FormHelperText>
                    }
                </FormControl>

                <div>
                    <Uploader onUploadComplete={url => {
                        form.photo = url;
                    }} />
                </div>

                <Button
                    disabled={hasErrors}
                    variant="raised"
                    color="primary"
                    onClick={handleNext}>
                    Next
                </Button>
            </Fragment>
        );
    }
}

export const UserForm = wrap(BaseUserForm);
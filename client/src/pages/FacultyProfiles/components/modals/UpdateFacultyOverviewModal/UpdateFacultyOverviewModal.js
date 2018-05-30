import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { ModalFormDialogActions } from "../../../../../components/ModalFormDialogActions";
import { Uploader } from "../../../../../components/Uploader";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { getPossessivePronoun } from "../../../../../utils/faculty.util";
import { dateToFormInputValue, validateForm } from "../../../../../utils/forms.util";
import { getFullName } from "../../../../../utils/user.util";


function getFormErrors(form, existingFaculties, currentFaculty) {
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
                        return existingFaculties.every(faculty => {
                            // Check if every OTHER faculty has this email, but skip the current one
                            if (faculty._id === currentFaculty._id) {
                                return true;
                            }

                            return faculty.user.email !== value;
                        });
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
        birthDate: {
            value: form.birthDate,
        },
    });
}

export class UpdateFacultyOverviewModal extends ModalFormComponent {
    mapPropsToForm = ({faculty}) => ({
        _id: faculty._id,
        firstName: faculty.user.name.first,
        lastName: faculty.user.name.last,
        email: faculty.user.email,
        photo: faculty.user.photo,
        sex: faculty.sex,
        employment: faculty.employment,
        birthDate: dateToFormInputValue(faculty.birthDate),
    });

    get initialForm() {
        return {
            _id: "",
            firstName: "",
            lastName: "",
            email: "",
            photo: null,
            sex: SEX.M.identifier,
            employment: EMPLOYMENT.FULL_TIME_PERMANENT.identifier,
            birthDate: "",
        };

    }

    get submitUpdateAction() {
        const form = this.state.form;
        return () => this.props.submitForm(form);
    }

    render() {
        const {open, faculties, faculty, classes} = this.props;
        const {form, isSubmitting, error} = this.state;
        const fullName = getFullName(faculty.user);
        const pronoun = getPossessivePronoun(faculty);
        const {hasErrors, fieldErrors} = getFormErrors(form, faculties, faculty);

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>Update Faculty Information</DialogTitle>
                <DialogContent className={classes.container}>
                    <Grid container className={classes.form} spacing={24} direction="column">
                        <Grid item>
                            <Grid container spacing={16}>
                                <Grid item xs={6}>
                                    <FormControl error={fieldErrors.firstName.length > 0} fullWidth>
                                        <InputLabel>First Name</InputLabel>
                                        <Input disabled={isSubmitting} value={form.firstName}
                                               onChange={this.handleFormChange("firstName")} />
                                        {fieldErrors.firstName.length > 0 &&
                                        <FormHelperText>{fieldErrors.firstName[0]}</FormHelperText>
                                        }
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl error={fieldErrors.lastName.length > 0} fullWidth>
                                        <InputLabel>Last Name</InputLabel>
                                        <Input disabled={isSubmitting} value={form.lastName}
                                               onChange={this.handleFormChange("lastName")}
                                               type="email" />
                                        {fieldErrors.lastName.length > 0 &&
                                        <FormHelperText>{fieldErrors.lastName[0]}</FormHelperText>
                                        }
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>

                            <Grid container spacing={16} direction="column">
                                <Grid item>
                                    <FormControl error={fieldErrors.email.length > 0} fullWidth>
                                        <InputLabel>Email Address</InputLabel>
                                        <Input disabled={isSubmitting} value={form.email}
                                               onChange={this.handleFormChange("email")} type="email" />
                                        {fieldErrors.email.length > 0 &&
                                        <FormHelperText>{fieldErrors.email[0]}</FormHelperText>
                                        }
                                    </FormControl>
                                </Grid>

                                <Grid item>
                                    <Typography>
                                        Changing {fullName}'s email will also change {pronoun} sign in
                                        credentials.
                                        Make sure you communicate the changes to avoid confusion.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item>
                            <FormControl error={fieldErrors.birthDate.length > 0} fullWidth>
                                <TextField
                                    error={fieldErrors.birthDate.length > 0}
                                    label="Date of Birth"
                                    type="date"
                                    disabled={isSubmitting}
                                    onChange={this.handleFormChange("birthDate")}
                                    value={form.birthDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {fieldErrors.birthDate.length > 0 &&
                                <FormHelperText>{fieldErrors.birthDate[0]}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <Grid container spacing={16} direction="column">
                                <Grid item>
                                    <Typography variant="body2">Set photo</Typography>
                                    {faculty.user.photo &&
                                    <Typography>
                                        {getFullName(faculty.user)} already has a photo.
                                        To change it, upload a new photo. To keep it, do nothing.
                                    </Typography>
                                    }
                                </Grid>

                                <Grid item>
                                    <Uploader
                                        disabled={isSubmitting}
                                        onUploadComplete={url => {
                                            form.photo = url;
                                        }} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <FormLabel>Sex</FormLabel>
                                <RadioGroup value={form.sex} onChange={this.handleFormChange("sex")}>
                                    {Object.entries(SEX).map(([identifier, {name}]) => (
                                        <FormControlLabel key={identifier} value={identifier} label={name}
                                                          disabled={isSubmitting}
                                                          control={<Radio />} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <FormLabel>Employment</FormLabel>
                                <RadioGroup value={form.employment} onChange={this.handleFormChange("employment")}>
                                    {Object.entries(EMPLOYMENT).map(([identifier, {name}]) => (
                                        <FormControlLabel key={identifier} value={identifier} label={name}
                                                          disabled={isSubmitting}
                                                          control={<Radio />} />
                                    ))}

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>

                <ModalFormDialogActions isSubmitting={isSubmitting}
                                        error={error}
                                        disabled={hasErrors}
                                        handleSubmit={this.handleSubmit}
                                        buttonName="Update Faculty" />
            </Dialog>
        );
    }
}
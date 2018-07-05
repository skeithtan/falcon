import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { MonthPicker } from "../../../../../components/MonthPicker";
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import { validateForm, yearValidators } from "../../../../../utils/forms.util";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


function getFormErrors(form) {
    return validateForm({
        title: {
            value: form.title,
        },
        year: {
            value: form.year,
            customValidators: yearValidators,
        },
        sponsor: {
            value: form.sponsor,
        },
    });
}

class BaseRecognitionModal extends ModalFormComponent {
    get initialForm() {
        return {
            title: "",
            basis: RECOGNITION.BASIS.RESEARCH.identifier,
            month: 1,
            year: "",
            sponsor: "",
        };
    }

    mapPropsToForm = ({recognition}) => ({
        title: recognition.title,
        basis: recognition.basis,
        sponsor: recognition.sponsor,
        year: recognition.date.year,
        month: recognition.date.month,
    });

    get buttonName() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add Recognition" : "Update Recognition",
            FACULTY: "Request Add Recognition",
        });
    }

    get modalTitle() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add a Recognition" : "Update Recognition",
            FACULTY: "Request Add Recognition",
        });
    }

    get toastSuccessMessage() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Recognition successfully added" : "Recognition successfully updated",
            FACULTY: "Recognition request successfully added",
        });
    }

    get submitAddAction() {
        const form = this.state.form;
        const {faculty, user, submitAddRecognitionForm, submitRequestAddRecognitionForm} = this.props;
        return getObjectForUserType(user, {
            CLERK: () => submitAddRecognitionForm(form, faculty),
            FACULTY: () => submitRequestAddRecognitionForm(form, faculty),
        });
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {faculty, recognition, submitUpdateRecognitionForm} = this.props;
        return () => submitUpdateRecognitionForm(form, recognition._id, faculty);
    }

    get formErrors() {
        return getFormErrors(this.state.form);
    };

    get dialogActionIsDisabled() {
        return this.formErrors.hasErrors;
    }

    renderDialogContent = () => {
        const {classes} = this.props;
        const {form, isSubmitting} = this.state;
        const {fieldErrors} = this.formErrors;

        return (
            <div className={classes.container}>
                <Grid container className={classes.form} spacing={24} direction="column">

                    <Grid item>
                        <FormControl error={fieldErrors.title.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.title.length > 0}
                                label="Recognition Title"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("title")}
                                value={form.title}
                            />
                            {fieldErrors.title.length > 0 &&
                            <FormHelperText>{fieldErrors.title[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl error={fieldErrors.sponsor.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.sponsor.length > 0}
                                label="Sponsor"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("sponsor")}
                                value={form.sponsor}
                            />
                            {fieldErrors.sponsor.length > 0 &&
                            <FormHelperText>{fieldErrors.sponsor[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={8} direction="column">

                            <Grid item>
                                <FormLabel>Recognition Date</FormLabel>
                            </Grid>

                            <Grid item>
                                <Grid container spacing={16}>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Month</InputLabel>
                                            <MonthPicker
                                                value={form.month}
                                                disabled={isSubmitting}
                                                onChange={this.handleFormChange("month")}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl error={fieldErrors.year.length > 0} fullWidth>
                                            <TextField
                                                error={fieldErrors.year.length > 0}
                                                type="number"
                                                label="Year"
                                                disabled={isSubmitting}
                                                onChange={this.handleFormChange("year")}
                                                value={form.year}
                                            />
                                            {fieldErrors.year.length > 0 &&
                                            <FormHelperText>{fieldErrors.year[0]}</FormHelperText>
                                            }
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Recognition Basis</FormLabel>
                            <RadioGroup value={form.basis} onChange={this.handleFormChange("basis")}>
                                {Object.entries(RECOGNITION.BASIS).map(([identifier, {name}]) =>
                                    <FormControlLabel
                                        key={identifier}
                                        value={identifier}
                                        label={name}
                                        disabled={isSubmitting}
                                        control={<Radio />}
                                    />,
                                )}
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                </Grid>

            </div>
        );
    };
}

export const RecognitionModal = wrap(BaseRecognitionModal);
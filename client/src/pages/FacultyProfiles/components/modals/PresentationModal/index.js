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
import { PRESENTATION } from "../../../../../enums/faculty.enums";
import { mustBeNumberValidator, validateForm, yearValidators } from "../../../../../utils/forms.util";
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
        venue: {
            value: form.venue,
        },
        conference: {
            value: form.conference,
        },
        daysDuration: {
            value: form.daysDuration,
            customValidators: [
                mustBeNumberValidator,
                {
                    isValid(value) {
                        const days = parseInt(value, 10);
                        return days > 0;
                    },
                    errorMessage: "Must be a valid amount of days",
                },
            ],
        },
    });
}

class BasePresentationModal extends ModalFormComponent {
    get initialForm() {
        return {
            title: "",
            category: PRESENTATION.CATEGORY.INSTITUTIONAL.identifier,
            month: 1,
            year: "",
            sponsor: "",
            venue: "",
            conference: "",
            medium: PRESENTATION.MEDIUM.PAPER.identifier,
            daysDuration: "",
        };
    }

    mapPropsToForm = ({presentation}) => ({
        title: presentation.title,
        category: presentation.category,
        month: presentation.date.month,
        year: presentation.date.year,
        sponsor: presentation.sponsor,
        venue: presentation.venue,
        conference: presentation.conference,
        medium: presentation.medium,
        daysDuration: presentation.daysDuration,
    });

    get buttonName() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add Presentation" : "Update Presentation",
            FACULTY: "Request Add Presentation",
        });
    }

    get modalTitle() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add a Presentation" : "Update Presentation",
            FACULTY: "Request Add Presentation",
        });
    }

    get submitAddAction() {
        const form = this.state.form;
        const {submitAddPresentationForm, faculty, user, submitRequestAddPresentationForm} = this.props;
        return getObjectForUserType(user, {
            CLERK: () => submitAddPresentationForm(form, faculty),
            FACULTY: () => submitRequestAddPresentationForm(form, faculty),
        });
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {submitUpdatePresentationForm, presentation, faculty} = this.props;
        return () => submitUpdatePresentationForm(form, presentation._id, faculty);
    }

    get toastSuccessMessage() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Presentation successfully added" : "Presentation successfully updated",
            FACULTY: "Presentation request successfully added",
        });
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
                                label="Presentation Title"
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
                        <FormControl error={fieldErrors.venue.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.venue.length > 0}
                                label="Venue"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("venue")}
                                value={form.venue}
                            />
                            {fieldErrors.venue.length > 0 &&
                            <FormHelperText>{fieldErrors.venue[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl error={fieldErrors.conference.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.conference.length > 0}
                                label="Conference"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("conference")}
                                value={form.conference}
                            />
                            {fieldErrors.conference.length > 0 &&
                            <FormHelperText>{fieldErrors.conference[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={8} direction="column">

                            <Grid item>
                                <FormLabel>Presentation Date</FormLabel>
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
                        <FormControl error={fieldErrors.daysDuration.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.daysDuration.length > 0}
                                label="Duration in Days"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("daysDuration")}
                                value={form.daysDuration}
                            />
                            {fieldErrors.daysDuration.length > 0 &&
                            <FormHelperText>{fieldErrors.daysDuration[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <RadioGroup value={form.category} onChange={this.handleFormChange("category")}>
                                {Object.entries(PRESENTATION.CATEGORY).map(([identifier, {name}]) =>
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

                    <Grid item>
                        <FormControl>
                            <FormLabel>Medium</FormLabel>
                            <RadioGroup value={form.medium} onChange={this.handleFormChange("medium")}>
                                {Object.entries(PRESENTATION.MEDIUM).map(([identifier, {name}]) =>
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

export const PresentationModal = wrap(BasePresentationModal);
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { DEGREE } from "../../../../../enums/faculty.enums";
import { validateForm, yearValidators } from "../../../../../utils/forms.util";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


function getFormErrors(form) {
    return validateForm({
        title: {
            value: form.title,
        },
        completionYear: {
            value: form.completionYear,
            customValidators: yearValidators,
        },
    });
}

class BaseDegreeModal extends ModalFormComponent {
    mapPropsToForm = ({degree}) => ({
        title: degree.title,
        completionYear: degree.completionYear,
        level: degree.level,
    });

    get initialForm() {
        return {
            title: "",
            level: DEGREE.LEVEL.ASSOCIATE.identifier,
            completionYear: "",
        };
    }

    get submitAddAction() {
        const form = this.state.form;
        const {faculty, submitAddDegreeForm, user, submitRequestAddDegreeForm} = this.props;

        return getObjectForUserType(user, {
            CLERK: () => submitAddDegreeForm(form, faculty),
            FACULTY: () => submitRequestAddDegreeForm(form, faculty),
        });
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {faculty, degree, submitUpdateDegreeForm} = this.props;
        return () => submitUpdateDegreeForm(form, degree._id, faculty);
    }

    get toastSuccessMessage() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Degree successfully added" : "Degree successfully updated",
            FACULTY: "Degree request successfully added",
        });
    }

    get buttonName() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add Degree" : "Update Degree",
            FACULTY: "Request Add Degree",
        });
    };

    get modalTitle() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add a Degree" : "Update Degree",
            FACULTY: "Request Add Degree",
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
                                label="Degree Title"
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
                        <FormControl error={fieldErrors.completionYear.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.completionYear.length > 0}
                                label="Completion Year"
                                type="number"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("completionYear")}
                                value={form.completionYear}
                            />
                            {fieldErrors.completionYear.length > 0 &&
                            <FormHelperText>{fieldErrors.completionYear[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Degree Level</FormLabel>
                            <RadioGroup value={form.level} onChange={this.handleFormChange("level")}>
                                {Object.entries(DEGREE.LEVEL).map(([identifier, {name}]) =>
                                    <FormControlLabel key={identifier}
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

export const DegreeModal = wrap(BaseDegreeModal);
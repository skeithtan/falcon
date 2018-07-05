import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { INSTRUCTIONAL_MATERIAL } from "../../../../../enums/faculty.enums";
import { validateForm, yearValidators } from "../../../../../utils/forms.util";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


function isForStudents(form) {
    return form.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.STUDENT.identifier;
}

function getFormErrors(form) {
    const toValidate = {
        title: {
            value: form.title,
        },
        usageYear: {
            value: form.usageYear,
            customValidators: yearValidators,
        },
    };

    if (isForStudents(form)) {
        toValidate.level = {
            value: form.level,
        };
    }

    return validateForm(toValidate);
}

class BaseInstructionalMaterialModal extends ModalFormComponent {
    get initialForm() {
        return {
            title: "",
            medium: INSTRUCTIONAL_MATERIAL.MEDIUM.PRINT.identifier,
            audience: INSTRUCTIONAL_MATERIAL.AUDIENCE.TEACHER.identifier,
            usageYear: "",
            level: "",
        };
    }

    mapPropsToForm = ({instructionalMaterial}) => {
        const form = {
            title: instructionalMaterial.title,
            medium: instructionalMaterial.medium,
            audience: instructionalMaterial.audience,
            usageYear: instructionalMaterial.usageYear,
            level: "",
        };

        const forStudents = instructionalMaterial.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.STUDENT.identifier;
        if (forStudents) {
            form.level = instructionalMaterial.level;
        }

        return form;
    };

    get buttonName() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add Instructional Material" : "Update Instructional Material",
            FACULTY: "Request add Instructional Material",
        });
    }

    get modalTitle() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ? "Add an Instructional Material" : "Update Instructional Material",
            FACULTY: "Request add Instructional Material",
        });
    }

    get toastSuccessMessage() {
        const {action, user} = this.props;
        return getObjectForUserType(user, {
            CLERK: action === "add" ?
                "Instructional material successfully added" :
                "Instructional material successfully updated",
            FACULTY: "Instructional material request successfully added",
        });
    }

    get submitAddAction() {
        const form = this.state.form;
        const {faculty, submitAddInstructionalMaterialForm, user, submitRequestAddInstructionalMaterialForm} = this.props;
        return getObjectForUserType(user, {
            CLERK: () => submitAddInstructionalMaterialForm(form, faculty),
            FACULTY: () => submitRequestAddInstructionalMaterialForm(form, faculty),
        });
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {faculty, instructionalMaterial, submitUpdateInstructionalMaterialForm} = this.props;
        return () => submitUpdateInstructionalMaterialForm(form, instructionalMaterial._id, faculty);
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
                                label="Instructional Material Title"
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
                        <FormControl error={fieldErrors.usageYear.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.usageYear.length > 0}
                                label="Usage year"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("usageYear")}
                                value={form.usageYear}
                            />
                            {fieldErrors.usageYear.length > 0 &&
                            <FormHelperText>{fieldErrors.usageYear[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Audience</FormLabel>
                            <RadioGroup value={form.audience}
                                        onChange={this.handleFormChange("audience")}>
                                {Object.entries(INSTRUCTIONAL_MATERIAL.AUDIENCE).map(([identifier, {name}]) =>
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


                    {isForStudents(form) &&
                    <Grid item>
                        <FormControl error={fieldErrors.level.length > 0}>
                            <FormLabel>Student Level</FormLabel>
                            <Select
                                value={form.level}
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("level")}
                            >
                                {["1", "2", "3", "4"].map(level =>
                                    <MenuItem key={level} value={level}>{level}</MenuItem>,
                                )}
                            </Select>
                            <FormHelperText>{fieldErrors.level[0]}</FormHelperText>
                        </FormControl>
                    </Grid>
                    }

                    <Grid item>
                        <FormControl>
                            <FormLabel>Medium</FormLabel>
                            <RadioGroup value={form.medium} onChange={this.handleFormChange("medium")}>
                                {Object.entries(INSTRUCTIONAL_MATERIAL.MEDIUM).map(([identifier, {name}]) =>
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

export const InstructionalMaterialModal = wrap(BaseInstructionalMaterialModal);
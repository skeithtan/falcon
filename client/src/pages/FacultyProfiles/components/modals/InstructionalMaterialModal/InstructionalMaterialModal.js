import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
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

export class InstructionalMaterialModal extends ModalFormComponent {
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
        return this.props.action === "add" ? "Add Instructional Material" : "Update Instructional Material";
    }

    get modalTitle() {
        return this.props.action === "add" ? "Add an Instructional Material" : "Update Instructional Material";
    }

    get submitAddAction() {
        const form = this.state.form;
        const {faculty, submitAddInstructionalMaterialForm} = this.props;
        return () => submitAddInstructionalMaterialForm(form, faculty);
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {faculty, instructionalMaterial, submitUpdateInstructionalMaterialForm} = this.props;
        return () => submitUpdateInstructionalMaterialForm(form, instructionalMaterial._id, faculty);
    }

    render() {
        const {open, classes} = this.props;
        const {form, isSubmitting} = this.state;
        const {hasErrors, fieldErrors} = getFormErrors(form);

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>{this.modalTitle}</DialogTitle>
                <DialogContent className={classes.container}>
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
                </DialogContent>

                {this.renderModalFormDialogActions(hasErrors)}
            </Dialog>
        );
    }
}
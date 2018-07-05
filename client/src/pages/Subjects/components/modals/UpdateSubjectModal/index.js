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
import { SUBJECT_CATEGORIES } from "../../../../../enums/class.enums";
import { validateForm } from "../../../../../utils/forms.util";
import { wrap } from "./wrapper";


function getFormErrors(form) {
    return validateForm({
        name: {
            value: form.name,
        },
        code: {
            value: form.code,
        },
        description: {
            value: form.description,
        },
    });
}

class BaseUpdateSubjectModal extends ModalFormComponent {
    get initialForm() {
        return {
            name: "",
            code: "",
            description: "",
            category: "PEDAGOGICAL",
        };
    }

    mapPropsToForm = ({subject}) => ({
        name: subject.name,
        code: subject.code,
        description: subject.description,
        category: subject.category,
    });

    get submitUpdateAction() {
        const {subject, submitUpdateSubject} = this.props;
        const {form} = this.state;
        return () => submitUpdateSubject(subject, form);
    }

    get buttonName() {
        return "Update Subject";
    }

    get modalTitle() {
        return "Update Subject";
    }

    get toastSuccessMessage() {
        return "Subject successfully updated";
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
                <Grid
                    container
                    className={classes.form}
                    spacing={24}
                    direction="column">

                    <Grid item>
                        <FormControl error={fieldErrors.name.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.name.length > 0}
                                label="Subject Name"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("name")}
                                value={form.name}
                            />
                            {fieldErrors.name.length > 0 &&
                            <FormHelperText>{fieldErrors.name[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl error={fieldErrors.code.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.code.length > 0}
                                label="Subject Code"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("code")}
                                value={form.code}
                            />
                            {fieldErrors.code.length > 0 &&
                            <FormHelperText>{fieldErrors.code[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl error={fieldErrors.description.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.description.length > 0}
                                label="Description"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("description")}
                                value={form.description}
                            />
                            {fieldErrors.description.length > 0 &&
                            <FormHelperText>{fieldErrors.description[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <RadioGroup value={form.category} onChange={this.handleFormChange("category")}>
                                {Object.entries(SUBJECT_CATEGORIES).map(([identifier, {name}]) =>
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

export const UpdateSubjectModal = wrap(BaseUpdateSubjectModal);
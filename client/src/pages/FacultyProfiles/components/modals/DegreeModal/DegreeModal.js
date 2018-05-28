import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
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
import { validateForm,  yearValidators } from "../../../../../utils/forms.util";


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

// Removes unwanted details like _id and __typename
function mapDegreeToForm(degree) {
    return {
        title: degree.title,
        completionYear: degree.completionYear,
        level: degree.level,
    };
}

const initialForm = {
    title: "",
    level: DEGREE.LEVEL.ASSOCIATE.identifier,
    completionYear: "",
};

export class DegreeModal extends ModalFormComponent {
    get initialForm() {
        return initialForm;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.action === "add") {
            return {
                ...prevState,
                form: {...initialForm},
            };
        }

        return {
            ...prevState,
            form: mapDegreeToForm(nextProps.degree),
        };
    }

    get submitAddAction() {
        const form = this.state.form;
        const {faculty, submitAddDegreeForm} = this.props;
        return () => submitAddDegreeForm(form, faculty);
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {faculty, degree, submitUpdateDegreeForm} = this.props;
        return () => submitUpdateDegreeForm(form, degree._id, faculty);
    }

    get buttonName() {
        return this.props.action === "add" ? "Add Degree" : "Update Degree";
    };

    get modalTitle() {
        return this.props.action === "add" ? "Add a Degree" : "Update Degree";
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
                </DialogContent>

                {this.renderModalFormDialogActions(hasErrors)}
            </Dialog>
        );
    }
}
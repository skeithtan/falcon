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
import ModalFormComponent from "../../../../../components/ModalFormComponent";
import ModalFormDialogActions from "../../../../../components/ModalFormDialogActions/ModalFormDialogActions";
import { DEGREE } from "../../../../../enums/faculty.enums";
import validateForm from "../../../../../utils/forms";


function getFormErrors(form) {
    return validateForm({
        title: {
            value: form.title,
        },
        completionYear: {
            value: form.completionYear,
            customValidators: [
                {
                    isValid(value) {
                        return !isNaN(parseInt(value));
                    },
                    errorMessage: "Must be a number",
                },
                {
                    isValid(value) {
                        const year = parseInt(value);
                        return year > 1900 && year < 2200;
                    },
                    errorMessage: "Must be a valid year",
                },
            ],
        },
    });
}

export default class DegreeModal extends ModalFormComponent {
    get initialForm() {
        return {
            title: "",
            level: DEGREE.LEVEL.ASSOCIATE.identifier,
            completionYear: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.action === "add") {
            return {...prevState};
        }

        return prevState;

        //TODO: Update degree
    }

    handleSubmit = () => {
        const form = this.state.form;
        const {faculty, submitAddDegreeForm, action} = this.props;
        this.setState({isSubmitting: true, error: null});

        if (action === "add") {
            submitAddDegreeForm(form, faculty)
                .then(() => this.setState({isSubmitting: false}, this.closeModal))
                .catch(error => {
                    console.log(error);
                    this.setState({
                        isSubmitting: false,
                        error: error,
                    });
                });
        } else {
            //TODO: Update
        }
    };


    buttonName = this.props.action === "add" ? "Add Degree" : "Update Degree";

    modalTitle = this.props.action === "add" ? "Add a Degree" : "Update Degree";

    render() {
        const {open, classes} = this.props;
        const {form, isSubmitting, error} = this.state;
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
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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

                <ModalFormDialogActions isSubmitting={isSubmitting}
                                        error={error}
                                        disabled={hasErrors}
                                        handleSubmit={this.handleSubmit}
                                        buttonName={this.buttonName} />
            </Dialog>
        );
    }
}
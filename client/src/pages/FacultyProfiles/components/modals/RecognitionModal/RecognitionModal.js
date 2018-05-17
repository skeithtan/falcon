import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React from "react";
import ModalFormComponent from "../../../../../components/ModalFormComponent";
import ModalFormDialogActions from "../../../../../components/ModalFormDialogActions";
import MonthPicker from "../../../../../components/MonthPicker";
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import validateForm, { yearValidators } from "../../../../../utils/forms";


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

function mapRecognitionToForm(recognition) {
    return {
        title: recognition.title,
        basis: recognition.basis,
        sponsor: recognition.sponsor,
        year: recognition.date.year,
        month: recognition.date.month,
    };
}

const initialForm = {
    title: "",
    basis: RECOGNITION.BASIS.RESEARCH.identifier,
    month: 1,
    year: "",
    sponsor: "",
};

export default class RecognitionModal extends ModalFormComponent {

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
            form: mapRecognitionToForm(nextProps.recognition),
        };
    }

    get buttonName() {
        return this.props.action === "add" ? "Add Recognition" : "Update Recognition";
    }

    get modalTitle() {
        return this.props.action === "add" ? "Add a Recognition" : "Update Recognition";
    }

    get submitAddAction() {
        const form = this.state.form;
        const {faculty, submitAddRecognitionForm} = this.props;
        return () => submitAddRecognitionForm(form, faculty);
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {faculty, recognition, submitUpdateRecognitionForm} = this.props;
        return () => submitUpdateRecognitionForm(form, recognition._id, faculty);
    }

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
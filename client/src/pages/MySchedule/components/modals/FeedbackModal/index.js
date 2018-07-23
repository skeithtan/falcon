import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { FACULTY_FEEDBACK } from "../../../../../enums/class.enums";
import { validateForm } from "../../../../../utils/forms.util";
import { wrap } from "./wrapper";

const getFormErrors = form =>
    validateForm({
        rejectionReason: {
            value: form.rejectionReason,
            customValidators: [
                {
                    isValid(value) {
                        if (
                            form.status === FACULTY_FEEDBACK.ACCEPTED.identifier
                        ) {
                            return true;
                        }

                        return String(value).trim().length > 0;
                    },
                    message: "This field is required",
                },
            ],
        },
    });

class BaseFeedbackModal extends ModalFormComponent {
    get initialForm() {
        return {
            status: FACULTY_FEEDBACK.ACCEPTED.identifier,
            rejectionReason: "",
        };
    }

    mapPropsToForm = props => ({
        status: props.status,
        rejectionReason: "",
    });

    get submitUpdateAction() {
        const { termSchedule, submitFeedback } = this.props;
        const { form } = this.state;

        return () => submitFeedback(form, termSchedule);
    }

    get modalTitle() {
        return "Submit schedule feedback";
    }

    get toastSuccessMessage() {
        return "Feedback successfully sent";
    }

    get buttonName() {
        return "Submit feedback";
    }

    get formErrors() {
        return getFormErrors(this.state.form);
    }

    renderDialogContent = () => {
        const { classes } = this.props;
        const { form, isSubmitting } = this.state;
        const { fieldErrors } = this.formErrors;

        return (
            <div className={classes.container}>
                <Grid
                    container
                    className={classes.form}
                    spacing={24}
                    direction="column"
                >
                    <Grid item>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">I am...</FormLabel>
                            <RadioGroup
                                value={form.status}
                                onChange={this.handleFormChange("status")}
                            >
                                <FormControlLabel
                                    value={FACULTY_FEEDBACK.ACCEPTED.identifier}
                                    control={<Radio />}
                                    label="Accepting this schedule"
                                />
                                <FormControlLabel
                                    value={FACULTY_FEEDBACK.REJECTED.identifier}
                                    control={<Radio />}
                                    label="Declining this schedule"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {form.status === FACULTY_FEEDBACK.REJECTED.identifier && (
                        <Grid item>
                            <FormControl
                                error={fieldErrors.rejectionReason.length > 0}
                                fullWidth
                            >
                                <TextField
                                    error={
                                        fieldErrors.rejectionReason.length > 0
                                    }
                                    label="What should be changed?"
                                    multiline
                                    disabled={isSubmitting}
                                    onChange={this.handleFormChange(
                                        "rejectionReason"
                                    )}
                                    value={form.rejectionReason}
                                />
                                {fieldErrors.rejectionReason.length > 0 && (
                                    <FormHelperText>
                                        {fieldErrors.rejectionReason[0]}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    };
}

export const FeedbackModal = wrap(BaseFeedbackModal);

import React from "react";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { FACULTY_FEEDBACK } from "../../../../../enums/class.enums";
import { validateForm } from "../../../../../utils/forms.util";
import { wrap } from "./wrapper";
import { TimeAvailabilityCards } from "../../../../../components/TimeAvailabilityCards";

const getFormErrors = form =>
    validateForm({
        rejectionReason: {
            value: form.rejectionReason,
            optional: true,
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
            newAvailability: {
                M_TH: [],
                T_F: [],
            },
        };
    }

    mapPropsToForm = ({ status, availability }) => ({
        status: status,
        rejectionReason: "",
        newAvailability: {
            M_TH: availability ? availability.M_TH : [],
            T_F: availability ? availability.T_F : [],
        },
    });

    get maxWidth() {
        return "md";
    }

    componentDidUpdate(prevProps, { form: prevForm }, snapshot) {
        // If we switched from rejection to acceptance
        const { form } = this.state;
        if (
            prevForm.status !== form.status &&
            form.status === FACULTY_FEEDBACK.ACCEPTED.identifier
        ) {
            // Reset rejectionReason and newAvailability
            this.setState({
                form: {
                    ...this.mapPropsToForm(prevForm),
                    status: FACULTY_FEEDBACK.ACCEPTED.identifier,
                },
            });
        }
    }

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

    toggleAvailability(meetingDay, meetingHour) {
        const newForm = {
            ...this.state.form,
            newAvailability: {
                // Copy because these are immutable
                M_TH: [...this.state.form.newAvailability.M_TH],
                T_F: [...this.state.form.newAvailability.T_F],
            },
        };

        let meetingHours = newForm.newAvailability[meetingDay];

        if (!meetingHours.includes(meetingHour)) {
            meetingHours.push(meetingHour);
        } else {
            newForm.newAvailability[meetingDay] = meetingHours.filter(
                hour => hour !== meetingHour
            );
        }

        this.setState({ form: newForm });
    }

    renderRejectionForm = () => {
        const { classes, availability } = this.props;
        const { form, isSubmitting } = this.state;
        const { fieldErrors } = this.formErrors;

        return (
            <Collapse in={form.status === FACULTY_FEEDBACK.REJECTED.identifier}>
                <Grid
                    container
                    spacing={24}
                    className={classes.form}
                    direction="column"
                >
                    <Grid item>
                        <FormControl
                            error={fieldErrors.rejectionReason.length > 0}
                            fullWidth
                        >
                            <TextField
                                error={fieldErrors.rejectionReason.length > 0}
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

                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            spacing={16}
                            wrap="nowrap"
                        >
                            <Grid item>
                                {availability !== null && (
                                    <Typography>
                                        <strong>
                                            You can also update your
                                            availability
                                        </strong>{" "}
                                        or leave it unchanged if it looks right
                                    </Typography>
                                )}

                                {availability === null && (
                                    <Typography variant="subheading">
                                        Check the boxes at times when you are
                                        available
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item>
                                <TimeAvailabilityCards
                                    availability={form.newAvailability}
                                    onChange={(day, hour) =>
                                        this.toggleAvailability(day, hour)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        );
    };

    get dialogActionIsDisabled() {
        return this.formErrors.hasErrors;
    }

    renderDialogContent = () => {
        const { classes } = this.props;
        const { form, isSubmitting } = this.state;

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
                                    disabled={isSubmitting}
                                    label="Accepting this schedule"
                                />
                                <FormControlLabel
                                    value={FACULTY_FEEDBACK.REJECTED.identifier}
                                    control={<Radio />}
                                    disabled={isSubmitting}
                                    label="Declining this schedule"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item>{this.renderRejectionForm()}</Grid>
                </Grid>
            </div>
        );
    };
}

export const FeedbackModal = wrap(BaseFeedbackModal);

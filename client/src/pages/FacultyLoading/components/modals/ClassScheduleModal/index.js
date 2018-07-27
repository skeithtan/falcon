import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { MEETING_DAYS, MEETING_HOURS } from "../../../../../enums/class.enums";
import {
    validateForm,
    mustBeNumberValidator,
} from "../../../../../utils/forms.util";
import { wrap } from "./wrapper";
import { getFullName } from "../../../../../utils/user.util";

const getFormErrors = form =>
    validateForm({
        subject: {
            value: form.subject,
        },
        meetingDays: {
            value: form.meetingDays,
        },
        meetingHours: {
            value: form.meetingHours,
        },
        room: {
            value: form.room,
        },
        enrollmentCap: {
            value: form.enrollmentCap,
            customValidators: [mustBeNumberValidator],
        },
        course: {
            value: form.course,
        },
        section: {
            value: form.section,
        },
    });

class BaseClassScheduleModal extends ModalFormComponent {
    get initialForm() {
        return {
            subject: "",
            meetingDays: "",
            meetingHours: "",
            room: "",
            enrollmentCap: "",
            course: "",
            section: "",
        };
    }

    mapPropsToForm = ({ classSchedule }) => ({
        subject: classSchedule.subject,
        meetingDays: classSchedule.meetingDays,
        meetingHours: classSchedule.meetingHours,
        room: classSchedule.room,
        enrollmentCap: classSchedule.enrollmentCap,
        course: classSchedule.course,
        section: classSchedule.section,
    });

    get submitUpdateAction() {
        const {
            submitUpdateClassSchedule,
            termSchedule,
            classSchedule,
        } = this.props;
        const { form } = this.state;

        return () =>
            submitUpdateClassSchedule(form, termSchedule, classSchedule);
    }

    get buttonName() {
        return "Update Class";
    }

    get modalTitle() {
        return "Update Class";
    }

    get toastSuccessMessage() {
        return "Class successfully updated";
    }

    get formErrors() {
        return getFormErrors(this.state.form);
    }

    get dialogActionIsDisabled() {
        return this.formErrors.hasErrors;
    }

    renderSelectSubject = () => {
        const {
            form: { subject: selectedSubject },
            isSubmitting,
        } = this.state;

        const { subjects, classes } = this.props;

        return (
            <Select
                disabled={isSubmitting}
                value={selectedSubject}
                onChange={this.handleFormChange("subject")}
            >
                {subjects.map(subject => (
                    <MenuItem
                        key={subject._id}
                        value={subject._id}
                        className={
                            selectedSubject === subject._id
                                ? classes.activeItem
                                : ""
                        }
                    >
                        {subject.name}
                    </MenuItem>
                ))}
            </Select>
        );
    };

    renderSelectMeetingDays = () => {
        const {
            form: { meetingDays: selectedMeetingDays },
            isSubmitting,
        } = this.state;
        const { classes } = this.props;

        return (
            <Select
                disabled={isSubmitting}
                value={selectedMeetingDays}
                onChange={this.handleFormChange("meetingDays")}
            >
                {Object.values(MEETING_DAYS).map(({ identifier, name }) => (
                    <MenuItem
                        key={identifier}
                        value={identifier}
                        className={
                            selectedMeetingDays === identifier
                                ? classes.activeItem
                                : ""
                        }
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        );
    };

    renderSelectMeetingHours = () => {
        const {
            form: { meetingHours: selectedMeetingHours },
            isSubmitting,
        } = this.state;
        const { classes } = this.props;

        return (
            <Select
                disabled={isSubmitting}
                value={selectedMeetingHours}
                onChange={this.handleFormChange("meetingHours")}
            >
                {Object.values(MEETING_HOURS).map(({ identifier, name }) => (
                    <MenuItem
                        key={identifier}
                        value={identifier}
                        className={
                            selectedMeetingHours === identifier
                                ? classes.activeItem
                                : ""
                        }
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        );
    };

    renderSelectFaculty = () => {
        const {
            form: { faculty: selectedFaculty },
            isSubmitting,
        } = this.state;
        const {
            classes,
            termSchedule: { facultyPool },
            faculties,
        } = this.props;

        return (
            <Select
                disabled={isSubmitting}
                value={selectedFaculty}
                onChange={this.handleFormChange("faculty")}
            >
                <MenuItem value="">No assigned faculty</MenuItem>
                {Object.values(facultyPool)
                    .map(({ faculty }) =>
                        faculties.find(({ _id }) => _id === faculty)
                    )
                    .map(faculty => (
                        <MenuItem
                            key={faculty._id}
                            value={faculty._id}
                            className={
                                selectedFaculty === faculty._id
                                    ? classes.activeItem
                                    : ""
                            }
                        >
                            {getFullName(faculty.user)}
                        </MenuItem>
                    ))}
            </Select>
        );
    };

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
                        <FormControl
                            error={fieldErrors.subject.length > 0}
                            fullWidth
                        >
                            <InputLabel>Subject</InputLabel>
                            {this.renderSelectSubject()}
                            {fieldErrors.subject.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.subject[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            error={fieldErrors.meetingDays.length > 0}
                            fullWidth
                        >
                            <InputLabel>Meeting days</InputLabel>
                            {this.renderSelectMeetingDays()}
                            {fieldErrors.meetingDays.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.meetingDays[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            error={fieldErrors.meetingHours.length > 0}
                            fullWidth
                        >
                            <InputLabel>Meeting hours</InputLabel>
                            {this.renderSelectMeetingHours()}
                            {fieldErrors.meetingHours.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.meetingHours[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            error={fieldErrors.room.length > 0}
                            fullWidth
                        >
                            <TextField
                                error={fieldErrors.room.length > 0}
                                label="Room"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("room")}
                                value={form.room}
                            />
                            {fieldErrors.room.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.room[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            error={fieldErrors.enrollmentCap.length > 0}
                            fullWidth
                        >
                            <TextField
                                type="number"
                                error={fieldErrors.enrollmentCap.length > 0}
                                label="Enrollment cap"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange(
                                    "enrollmentCap"
                                )}
                                value={form.enrollmentCap}
                            />
                            {fieldErrors.enrollmentCap.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.enrollmentCap[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            error={fieldErrors.course.length > 0}
                            fullWidth
                        >
                            <TextField
                                error={fieldErrors.course.length > 0}
                                label="Course"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("course")}
                                value={form.course}
                            />
                            {fieldErrors.course.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.course[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl
                            error={fieldErrors.section.length > 0}
                            fullWidth
                        >
                            <TextField
                                error={fieldErrors.section.length > 0}
                                label="Section"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("section")}
                                value={form.section}
                            />
                            {fieldErrors.section.length > 0 && (
                                <FormHelperText>
                                    {fieldErrors.section[0]}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export const ClassScheduleModal = wrap(BaseClassScheduleModal);

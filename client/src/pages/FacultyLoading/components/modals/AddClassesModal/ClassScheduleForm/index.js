import React, { PureComponent } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { MEETING_HOURS } from "../../../../../../enums/class.enums";
import { wrap } from "./wrapper";

class BaseClassScheduleForm extends PureComponent {
    handleFormChange = fieldName => event => {
        const newClassSchedule = { ...this.props.classSchedule };
        newClassSchedule[fieldName] = event.target.value;
        this.props.onClassSubjectChange(newClassSchedule);
    };

    renderSelectMeetingHours = () => {
        const {
            classSchedule: { meetingHours: selectedMeetingHours },
            disabled,
        } = this.props;
        const { classes } = this.props;

        return (
            <Select
                disabled={disabled}
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

    render() {
        const {
            classSchedule: form,
            formErrors: { fieldErrors },
            disabled,
        } = this.props;

        return (
            <Grid
                container
                spacing={16}
                direction="column"
                justify="space-around"
                style={{ height: "100%" }}
                wrap="nowrap"
            >
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
                    <FormControl error={fieldErrors.room.length > 0} fullWidth>
                        <TextField
                            error={fieldErrors.room.length > 0}
                            label="Room"
                            disabled={disabled}
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
                            disabled={disabled}
                            onChange={this.handleFormChange("enrollmentCap")}
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
                            disabled={disabled}
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
                            disabled={disabled}
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
        );
    }
}

export const ClassScheduleForm = wrap(BaseClassScheduleForm);

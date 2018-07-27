import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Close";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { wrap } from "./wrapper";
import {
    validateForm,
    mustBeNumberValidator,
} from "../../../../../utils/forms.util";
import { ClassScheduleForm } from "./ClassScheduleForm";
import { MEETING_DAYS } from "../../../../../enums/class.enums";

const getFormErrors = form =>
    validateForm({
        subject: {
            value: form.subject,
        },
    });

const getClassScheduleErrors = classSubject =>
    validateForm({
        meetingDays: {
            value: classSubject.meetingDays,
        },
        meetingHours: {
            value: classSubject.meetingHours,
        },
        room: {
            value: classSubject.room,
        },
        enrollmentCap: {
            value: classSubject.enrollmentCap,
            customValidators: [mustBeNumberValidator],
        },
        course: {
            value: classSubject.course,
        },
        section: {
            value: classSubject.section,
        },
    });

class BaseAddClassesModal extends ModalFormComponent {
    get initialForm() {
        return {
            subject: "",
            M_TH: [{ ...this.initialClassSubject }],
            T_F: [{ ...this.initialClassSubject }],
        };
    }

    get initialClassSubject() {
        return {
            meetingHours: "",
            room: "",
            enrollmentCap: "",
            course: "",
            section: "",
        };
    }

    get modalTitle() {
        return "Add classes";
    }

    get submitAddAction() {
        const { form } = this.state;
        const { termSchedule, submitAddClasses } = this.props;
        return () => submitAddClasses(form, termSchedule);
    }

    get buttonName() {
        return "Add classes";
    }

    get toastSuccessMessage() {
        return "Classes successfully added";
    }

    get formErrors() {
        const { form } = this.state;
        return getFormErrors(form);
    }

    get dialogActionIsDisabled() {
        const {
            form: { M_TH, T_F },
        } = this.state;
        const formHasErrors = this.formErrors.hasErrors;

        const classSchedules = M_TH.concat(T_F);
        const hasNoClassSchedules = classSchedules.length === 0;

        const classSchedulesAreValid = classSchedules
            .map(classSchedules => getClassScheduleErrors(classSchedules))
            // !form.hasErrors = form is valid
            .every(form => !form.hasErrors);

        return formHasErrors || hasNoClassSchedules || !classSchedulesAreValid;
    }

    get maxWidth() {
        return "md";
    }

    onClassSubjectChange = (meetingDayIdentifier, index, newClassSchedule) => {
        const { form } = this.state;

        // Do not mutate current form, make a copy
        const newForm = { ...form };

        // Only replace at index
        newForm[meetingDayIdentifier] = form[meetingDayIdentifier].map(
            (classSubject, mapIndex) => {
                if (index === mapIndex) {
                    return newClassSchedule;
                }

                return classSubject;
            }
        );

        this.setState({
            form: newForm,
        });
    };

    onClassSubjectRemove = (meetingDayIdentifier, index) => {
        const { form } = this.state;
        const newClassSchedules = [...this.state.form[meetingDayIdentifier]];
        newClassSchedules.splice(index, 1);

        const newForm = { ...form };
        newForm[meetingDayIdentifier] = newClassSchedules;

        this.setState({
            form: newForm,
        });
    };

    onClassSubjectAdd = meetingDayIdentifier => {
        const { form } = this.state;
        const newForm = { ...form };

        newForm[meetingDayIdentifier] = [
            ...form[meetingDayIdentifier],
            { ...this.initialClassSubject },
        ];

        this.setState({
            form: newForm,
        });
    };

    renderClassScheduleCards = meetingDayIdentifier => {
        const { classes } = this.props;
        const { isSubmitting, form } = this.state;
        const classSchedules = form[meetingDayIdentifier];

        return (
            <div className={classes.cardsContainer}>
                <Grid
                    container
                    spacing={16}
                    direction="row"
                    alignItems="stretch"
                    wrap="nowrap"
                >
                    {classSchedules.map((classSchedule, index) => (
                        <Grid item key={index}>
                            <Card className={classes.classScheduleCard}>
                                <IconButton
                                    className={classes.removeIconButton}
                                    onClick={() =>
                                        this.onClassSubjectRemove(
                                            meetingDayIdentifier,
                                            index
                                        )
                                    }
                                >
                                    <RemoveIcon
                                        className={classes.removeIcon}
                                    />
                                </IconButton>
                                <ClassScheduleForm
                                    classSchedule={classSchedule}
                                    disabled={isSubmitting}
                                    formErrors={getClassScheduleErrors(
                                        classSchedule
                                    )}
                                    onClassSubjectChange={newClassSubject =>
                                        this.onClassSubjectChange(
                                            meetingDayIdentifier,
                                            index,
                                            newClassSubject
                                        )
                                    }
                                />
                            </Card>
                        </Grid>
                    ))}

                    <Grid
                        item
                        onClick={() =>
                            this.onClassSubjectAdd(meetingDayIdentifier)
                        }
                    >
                        <Button className={classes.addClassCard} variant="raised" size="large">
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    };

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

    renderDialogContent = () => {
        const { classes } = this.props;
        const { fieldErrors } = this.formErrors;

        return (
            <div className={classes.container}>
                <Grid
                    container
                    className={classes.form}
                    spacing={24}
                    direction="column"
                    wrap="nowrap"
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

                    {Object.values(MEETING_DAYS).map(({ identifier, name }) => (
                        <Grid item key={identifier}>
                            <div>
                                <Grid container spacing={8} direction="column">
                                    <Grid item>
                                        <Typography variant="title" paragraph>
                                            {name}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        {this.renderClassScheduleCards(
                                            identifier
                                        )}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    };
}

export const AddClassesModal = wrap(BaseAddClassesModal);

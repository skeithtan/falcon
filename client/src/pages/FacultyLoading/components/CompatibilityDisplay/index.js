import React, { Fragment, PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CompatibleIcon from "@material-ui/icons/Check";
import IncompatibleIcon from "@material-ui/icons/ErrorOutline";
import { EMPLOYMENT } from "../../../../enums/faculty.enums";
import { Divider } from "../../../../../node_modules/@material-ui/core";
import { isThirdConsecutive } from "../../../../utils/faculty_loading.util";
import { wrap } from "./wrapper";

class CompatibilityItem extends PureComponent {
    renderIcon = () => {
        const { classes, isCompatible } = this.props;
        return isCompatible ? (
            <CompatibleIcon className={classes.icon} />
        ) : (
            <IncompatibleIcon className={classes.icon} />
        );
    };

    render() {
        const { classes, isCompatible, label } = this.props;
        const rootClasses = [
            classes.item,
            isCompatible ? classes.compatibleItem : classes.incompatibleItem,
        ];

        return (
            <Grid
                container
                spacing={16}
                className={rootClasses.join(" ")}
                direction="row"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item>{this.renderIcon()}</Grid>
                <Grid item>
                    <Typography color="inherit">{label}</Typography>
                </Grid>
            </Grid>
        );
    }
}

class BaseCompatibilityDisplay extends PureComponent {
    get isNotFullLoad() {
        const { faculty, assignedClasses } = this.props;
        const { max } = EMPLOYMENT[faculty.employment].load;
        return assignedClasses.length < max;
    }

    get isExpertise() {
        const { faculty, classSchedule } = this.props;
        return faculty.teachingSubjects.includes(classSchedule.subject);
    }

    get isAvailable() {
        const { classSchedule, availability } = this.props;
        if (!availability) {
            return false;
        }

        return availability[classSchedule.meetingDays].includes(
            classSchedule.meetingHours
        );
    }

    get isNotThirdConsecutive() {
        const { assignedClasses, classSchedule } = this.props;
        return !isThirdConsecutive(assignedClasses, classSchedule);
    }

    get isOnlySubjectForHours() {
        const {
            assignedClasses,
            classSchedule: { meetingHours, meetingDays },
        } = this.props;

        return (
            assignedClasses
                // Get only assigned classes from that day
                .filter(item => item.meetingDays === meetingDays)
                // Ensure it's unique
                .every(item => item.meetingHours !== meetingHours)
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                spacing={8}
                container
                // alignItems="stretch"
                direction="column"
                wrap="nowrap"
            >
                <Grid item>
                </Grid>
                <Grid item>
                    <CompatibilityItem
                        classes={classes}
                        label="Subject is faculty's expertise"
                        isCompatible={this.isExpertise}
                    />
                </Grid>
                <Grid item>
                    <CompatibilityItem
                        classes={classes}
                        label="Faculty is available at this time"
                        isCompatible={this.isAvailable}
                    />
                </Grid>
                <Grid item>
                    <CompatibilityItem
                        classes={classes}
                        label="Faculty is not at full load"
                        isCompatible={this.isNotFullLoad}
                    />
                </Grid>
                <Grid item>
                    <CompatibilityItem
                        classes={classes}
                        label="Class is not the third consecutive"
                        isCompatible={this.isNotThirdConsecutive}
                    />
                </Grid>
                <Grid item>
                    <CompatibilityItem
                        classes={classes}
                        label="Class is the only class for this time slot"
                        isCompatible={this.isOnlySubjectForHours}
                    />
                </Grid>
                <Grid item></Grid>
            </Grid>
        );
    }
}

export const CompatibilityDisplay = wrap(BaseCompatibilityDisplay);

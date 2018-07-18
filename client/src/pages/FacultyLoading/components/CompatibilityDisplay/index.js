import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CompatibleIcon from "@material-ui/icons/Check";
import IncompatibleIcon from "@material-ui/icons/ErrorOutline";
import { EMPLOYMENT } from "../../../../enums/faculty.enums";
import { wrap } from "./wrapper";
import { Divider } from "../../../../../node_modules/@material-ui/core";

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
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item>{this.renderIcon()}</Grid>
                <Grid item>
                    <Typography color="inherit">{label}</Typography>
                </Grid>
                <Divider />
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
        // TODO
        return true;
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                alignItems="stretch"
                direction="column"
                wrap="nowrap"
            >
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
            </Grid>
        );
    }
}

export const CompatibilityDisplay = wrap(BaseCompatibilityDisplay);

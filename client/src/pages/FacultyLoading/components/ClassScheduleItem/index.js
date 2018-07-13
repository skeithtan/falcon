import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { wrap } from "./wrapper";
import { UserChip } from "../../../../components/UserChip";
import { ClassSchedulePopover } from "../ClassSchedulePopover";

class BaseClassScheduleItem extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event =>
        this.setState({
            anchorEl: event.currentTarget,
        });

    handleClose = () =>
        this.setState({
            anchorEl: null,
        });

    render() {
        const { anchorEl } = this.state;
        const { classSchedule, faculty, subject, classes, onRemoveClassSchedule } = this.props;
        let containerClasses = [classes.classScheduleItemContainer];
        containerClasses.push(
            faculty
                ? classes.classScheduleWithFaculty
                : classes.classScheduleWithoutFaculty
        );

        if (anchorEl) {
            containerClasses.push("selected");
        }

        return (
            <div className={containerClasses.join(" ")}>
                <Grid container spacing={16} onClick={this.handleClick}>
                    <Grid item>
                        <Typography variant="subheading" color="inherit">
                            {subject.code} {classSchedule.section}
                        </Typography>
                        <Typography color="inherit">
                            {classSchedule.room}
                        </Typography>
                    </Grid>
                    {faculty && (
                        <Grid item zeroMinWidth>
                            <UserChip user={faculty.user} />
                        </Grid>
                    )}
                </Grid>
                <ClassSchedulePopover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => this.setState({ anchorEl: null })}
                    classSchedule={classSchedule}
                    faculty={faculty}
                    subject={subject}
                    onRemoveClassSchedule={onRemoveClassSchedule}
                />
            </div>
        );
    }
}

export const ClassScheduleItem = wrap(BaseClassScheduleItem);

import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { wrap } from "./wrapper";

class BaseClassScheduleSquare extends PureComponent {
    renderUnoccupied = () => {
        const { classes } = this.props;
        return <div className={classes.classScheduleSquare} />;
    };

    get subjectName() {
        const {
            subject: { name },
        } = this.props;

        const NAME_CHAR_LIMIT = 25;

        if (name.length < NAME_CHAR_LIMIT) {
            return name;
        }

        return name.substring(0, NAME_CHAR_LIMIT) + "...";
    }

    renderOccupied = (classSchedule, subject) => {
        const { classes } = this.props;
        return (
            <div className={`${classes.classScheduleSquare} occupied`}>
                <Grid container spacing={8} direction="column" wrap="nowrap">
                    <Grid item>
                        <Typography variant="body2" color="inherit">
                            {subject.code} {classSchedule.section}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography color="inherit">
                            {this.subjectName}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography color="inherit">
                            {classSchedule.room}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    };

    render() {
        const { classSchedule, subject } = this.props;
        return classSchedule
            ? this.renderOccupied(classSchedule, subject)
            : this.renderUnoccupied();
    }
}

export const ClassScheduleSquare = wrap(BaseClassScheduleSquare);

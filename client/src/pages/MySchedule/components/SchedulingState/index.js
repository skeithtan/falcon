import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { wrap } from "./wrapper";

class BaseSchedulingState extends PureComponent {
    render() {
        const { classes, termSchedule } = this.props;
        return (
            <div className={classes.pageContainer}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            spacing={24}
                            direction="row"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Grid item>
                                <CalendarIcon
                                    className={classes.icon}
                                    color="action"
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={8}
                                direction="column"
                                wrap="nowrap"
                            >
                                <Grid item>
                                    <Typography
                                        variant="headline"
                                        color="textSecondary"
                                    >
                                        Scheduling for{" "}
                                        {termScheduleToString(termSchedule)} is
                                        underway.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subheading"
                                        color="textSecondary"
                                    >
                                        When a schedule for you has been
                                        prepared, you can view and give your
                                        feedback here.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export const SchedulingState = wrap(BaseSchedulingState);

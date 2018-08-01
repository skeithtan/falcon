import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UninvolvedIcon from "@material-ui/icons/NoMeetingRoom";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { wrap } from "./wrapper";
import { TermsModal } from "../../../FacultyLoading/components/modals/TermsModal";

class BaseUninvolvedState extends PureComponent {
    state = {
        termsModalIsShowing: false,
    };

    toggleTermsModal = shouldShow =>
        this.setState({
            termsModalIsShowing: shouldShow,
        });

    render() {
        const { termsModalIsShowing } = this.state;
        const { classes, termSchedule } = this.props;
        return (
            <div className={classes.pageContainer}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            spacing={32}
                            direction="row"
                            alignItems="center"
                            wrap="nowrap"
                        >
                            <Grid item>
                                <UninvolvedIcon
                                    className={classes.icon}
                                    color="action"
                                />
                            </Grid>
                            <Grid item container direction="column" spacing={8}>
                                <Grid item>
                                    <Typography
                                        variant="headline"
                                        color="textSecondary"
                                    >
                                        You were not selected to participate in{" "}
                                        {termScheduleToString(termSchedule)}.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subheading"
                                        color="textSecondary"
                                    >
                                        When you are selected to participate in
                                        a term, you can place your availability
                                        and see your schedule here.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        onClick={() =>
                                            this.toggleTermsModal(true)
                                        }
                                    >
                                        View other terms
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <TermsModal
                    open={termsModalIsShowing}
                    onClose={() => this.toggleTermsModal(false)}
                    activeTermSchedule={termSchedule}
                />
            </div>
        );
    }
}

export const UninvolvedState = wrap(BaseUninvolvedState);

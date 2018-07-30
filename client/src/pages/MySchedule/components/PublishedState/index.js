import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { FacultyScheduleCards } from "../../../../components/FacultyScheduleCards";
import { wrap } from "./wrapper";
import { TermsModal } from "../../../FacultyLoading/components/modals/TermsModal";

class BasePublishedState extends Component {
    state = {
        termsModalIsShowing: false,
        confirmSubmitAvailabilityModalIsShowing: false,
    };

    toggleTermsModal = shouldShow =>
        this.setState({
            termsModalIsShowing: shouldShow,
        });

    renderActions = () => {
        return null; //TODO: Print
    };

    renderToolbar = () => {
        const { termSchedule, classes } = this.props;

        return (
            <Card className={classes.toolbarContainer}>
                <Grid
                    container
                    direction="row"
                    spacing={16}
                    wrap="nowrap"
                    justify="space-between"
                >
                    <Grid
                        item
                        container
                        direction="column"
                        spacing={16}
                        wrap="nowrap"
                    >
                        <Grid item>
                            <Button
                                variant="outlined"
                                size="small"
                                color="primary"
                                onClick={() => this.toggleTermsModal(true)}
                            >
                                View other terms
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="title">
                                Your schedule for{" "}
                                {termScheduleToString(termSchedule)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>{this.renderActions()}</Grid>
                </Grid>
            </Card>
        );
    };

    render() {
        const { termsModalIsShowing } = this.state;
        const { classes, termSchedule } = this.props;
        return (
            <div className={classes.cardsContainer}>
                <Grid
                    spacing={16}
                    container
                    direction="column"
                    justify="center"
                    wrap="nowrap"
                >
                    <Grid item>{this.renderToolbar()}</Grid>

                    <Grid item>
                        <FacultyScheduleCards
                            assignedClasses={termSchedule.classes}
                        />
                    </Grid>
                </Grid>
                <TermsModal
                    open={termsModalIsShowing}
                    onClose={() => this.toggleTermsModal(false)}
                    activeTermSchedule={termSchedule}
                />
            </div>
        );
    }
}

export const PublishedState = wrap(BasePublishedState);

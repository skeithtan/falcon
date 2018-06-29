import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AcceptIcon from "@material-ui/icons/Check";
import RejectIcon from "@material-ui/icons/Close";
import React, { Component } from "react";


export class ChangeRequestReviewActions extends Component {
    state = {
        isSubmitting: false,
        error: null,
    };

    submitAction = action => {
        this.setState({
            isSubmitting: true,
        });

        action().catch(error => {
            this.setState({
                isSubmitting: false,
                error: error.message,
            });
            console.log("An error occurred while reviewing change request", error);
        });
    };

    approveChangeRequest = () => {
        const {approveChangeRequest} = this.props;
        this.submitAction(approveChangeRequest);
    };

    rejectChangeRequest = () => {
        const {rejectChangeRequest} = this.props;
        this.submitAction(rejectChangeRequest);
    };

    renderButtons = () => (
        <Grid container spacing={32} justify="flex-end">
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.rejectChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            Reject
                        </Grid>
                        <Grid item>
                            <RejectIcon />
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.approveChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            Accept
                        </Grid>
                        <Grid item>
                            <AcceptIcon />
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        </Grid>
    );

    render() {
        const {isSubmitting, error} = this.state;

        return (
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">

                    <Grid item>
                        <Grid container spacing={8} alignItems="center">
                            {isSubmitting &&
                            <Grid item>
                                <CircularProgress size={24} />
                            </Grid>
                            }

                            {isSubmitting &&
                            <Grid item>
                                <Typography color="primary">
                                    Submitting...
                                </Typography>
                            </Grid>
                            }

                            {error &&
                            <Grid item>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                            }
                        </Grid>
                    </Grid>

                    <Grid item>
                        {this.renderButtons()}
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}
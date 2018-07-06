import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RejectIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import { CHANGE_REQUEST_STATUSES } from "../../../../../../../enums/review_profile_change.enums";


export class ChangeRequestFacultyFooter extends Component {
    state = {
        isSubmitting: false,
        error: null,
    };

    deleteChangeRequest = () => {
        const {deleteChangeRequest} = this.props;
        this.setState({
            isSubmitting: true,
        });

        deleteChangeRequest()
            .catch(error => {
                this.setState({
                    isSubmitting: false,
                    error: error.message,
                });
                console.log("An error occurred while withdrawing change request", error);
            });
    };

    renderButtons = () => (
        <Grid container spacing={32} justify="flex-end" wrap="nowrap">
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.deleteChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center" wrap="nowrap">
                        <Grid item>
                            {
                                this.props.changeRequestStatus === CHANGE_REQUEST_STATUSES.PENDING.identifier ?
                                    "Withdraw" : "Dismiss"
                            }
                        </Grid>

                        <Grid item>
                            <RejectIcon />
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
                <Grid container alignItems="center" justify="space-between" wrap="nowrap">

                    <Grid item>
                        <Grid container spacing={8} alignItems="center" wrap="nowrap">
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

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RejectIcon from "@material-ui/icons/Close";
import React, { Component } from "react";


export class ChangeRequestRescindAction extends Component {
    state = {
        isSubmitting: false,
        error: null,
    };

    rescindChangeRequest = () => {
        const {rescindChangeRequest} = this.props;
        this.setState({
            isSubmitting: true,
        });

        rescindChangeRequest()
            .catch(error => {
                this.setState({
                    isSubmitting: false,
                    error: error.message,
                });
                console.log("An error occurred while rescinding change request", error);
            });
    };

    renderButtons = () => (
        <Grid container spacing={32} justify="flex-end">
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.rescindChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            Rescind
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

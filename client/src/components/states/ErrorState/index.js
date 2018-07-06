import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Error from "@material-ui/icons/Error";
import React, { Component, PureComponent } from "react";
import { wrap } from "../common_state_wrapper";


class ErrorDetailsDialog extends PureComponent {
    render() {
        const { open, onClose, debug } = this.props;
        return (
            <Dialog open={open}
                onClose={onClose}>
                <DialogTitle id="alert-dialog-title">Error details</DialogTitle>
                <DialogContent>
                    <DialogContentText>{String(debug)}</DialogContentText>
                </DialogContent>
            </Dialog>
        );

    }
}

class BaseErrorState extends Component {
    state = {
        detailsOpen: false,
    };

    render() {
        const { classes, debug, onRetryButtonClick, message } = this.props;
        return (
            <div className={classes.blankState}>

                <div className={classes.messageWrapper}>
                    <Error className={`${classes.messageColor} ${classes.icon}`} />
                    <Typography variant="headline" className={classes.messageColor}>
                        An Error Occurred
                    </Typography>
                    <Typography variant="subheading" className={classes.messageColor}>
                        {message}
                    </Typography>

                    <Typography variant="caption" className={classes.messageColor}>
                        Tip: Errors can occur when the browser has no connection to the internet. Please check your
                        internet connection and try again.
                    </Typography>

                    {onRetryButtonClick &&
                        <Button color="primary" onClick={onRetryButtonClick} variant="raised">
                            Retry
                    </Button>
                    }

                    {debug &&
                        <Button color="primary" onClick={() => this.setState({ detailsOpen: true })}>
                            View error details
                    </Button>
                    }

                    <ErrorDetailsDialog open={this.state.detailsOpen}
                        onClose={() => this.setState({ detailsOpen: false })}
                        debug={debug} />
                </div>

            </div>
        );
    }
}

export const ErrorState = wrap(BaseErrorState);

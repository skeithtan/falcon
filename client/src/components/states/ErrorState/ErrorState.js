import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Error from "@material-ui/icons/Error";
import React, { Component } from "react";


class ErrorDetailsDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.open}
                    onClose={this.props.onClose}>
                <DialogTitle id="alert-dialog-title">Error details</DialogTitle>
                <DialogContent>
                    <DialogContentText>{String(this.props.debug)}</DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }
}

export class ErrorState extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.blankState}>

                <div className={classes.messageWrapper}>
                    <Error className={`${classes.messageColor} ${classes.icon}`} />
                    <Typography variant="headline" className={classes.messageColor}>
                        An Error Occurred
                    </Typography>
                    <Typography variant="subheading" className={classes.messageColor}>
                        {this.props.message}
                    </Typography>

                    <Typography variant="caption" className={classes.messageColor}>
                        Tip: Errors can occur when the browser has no connection to the internet. Please check your
                        internet connection and try again.
                    </Typography>

                    {this.props.onRetryButtonClick &&
                    <Button color="primary" onClick={this.props.onRetryButtonClick} variant="raised">
                        Retry
                    </Button>
                    }

                    {this.props.debug &&
                    <Button color="primary" onClick={() => this.setState({detailsOpen: true})}>
                        View error details
                    </Button>
                    }

                    <ErrorDetailsDialog open={this.state.detailsOpen}
                                        onClose={() => this.setState({detailsOpen: false})}
                                        debug={this.props.debug} />
                </div>

            </div>
        );
    }

    state = {
        detailsOpen: false,
    };
}

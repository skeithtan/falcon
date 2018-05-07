import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Error from "@material-ui/icons/Error";
import Button from "material-ui/Button";


export default class ErrorState extends Component {
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
                        {this.props.children}
                    </Typography>
                    {this.props.onRetryButtonClick &&
                    <Button color="primary" onClick={this.props.onRetryButtonClick}>
                        Retry
                    </Button>
                    }
                </div>

            </div>
        );
    }
}

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Folder from "@material-ui/icons/Folder";
import React, { Component } from "react";


export class EmptyState extends Component {
    render() {
        const {classes, onAddButtonClick, addButtonText} = this.props;
        return (
            <div className={classes.blankState}>
                <div className={classes.messageWrapper}>

                    <Folder className={`${classes.messageColor} ${classes.icon}`} />
                    <Typography variant="headline" className={classes.messageColor}>
                        {this.props.bigMessage}
                    </Typography>
                    <Typography variant="subheading" className={classes.messageColor}>
                        {this.props.smallMessage}
                    </Typography>

                    {onAddButtonClick &&
                    <Button color="primary" onClick={this.props.onAddButtonClick}>
                        {addButtonText}
                    </Button>
                    }

                </div>
            </div>
        );
    }
}
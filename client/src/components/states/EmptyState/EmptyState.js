import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Folder from "@material-ui/icons/Folder";
import Button from "material-ui/Button";

export default class EmptyState extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.blankState}>
                <div className={classes.messageWrapper}>

                    <Folder className={`${classes.messageColor} ${classes.icon}`}/>
                    <Typography variant="headline" className={classes.messageColor}>
                        {this.props.bigMessage}
                        </Typography>
                    <Typography variant="subheading" className={classes.messageColor}>
                        {this.props.smallMessage}
                    </Typography>

                    {this.props.onAddButtonClick &&
                        <Button color="primary" onClick={this.props.onAddButtonClick}>
                            {this.props.addButtonText}
                        </Button>
                    }

                </div>
            </div>
        );
    }
}
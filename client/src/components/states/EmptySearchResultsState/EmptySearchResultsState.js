import Search from "@material-ui/icons/Search";
import Typography from "material-ui/Typography";
import React, { Component } from "react";


class EmptySearchResultsState extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.blankState}>
                <div className={classes.messageWrapper}>

                    <Search className={`${classes.messageColor} ${classes.icon}`} />
                    <Typography variant="headline" className={classes.messageColor}>
                        No Results Found
                    </Typography>
                    <div className={classes.wordWrapContainer}>
                        <Typography variant="subheading" className={classes.messageColor}>
                            Your search <b className={classes.breakWord}>{this.props.searchKeyword}</b> did not match
                            any
                            documents.
                        </Typography>
                    </div>

                </div>
            </div>
        );
    }
}

export default EmptySearchResultsState;

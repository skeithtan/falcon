import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from "react";


export class FullPageLoadingIndicator extends Component {
    render() {
        return (
            <div className={this.props.classes.loadingIndicatorWrapper}>
                <CircularProgress size={this.props.size} />
            </div>
        );
    }
}
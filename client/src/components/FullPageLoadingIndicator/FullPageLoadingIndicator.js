import React, { Component } from "react";
import { CircularProgress } from "material-ui/Progress";

export default class FullPageLoadingIndicator extends Component {
    render() {
        return (
            <div className={this.props.classes.loadingIndicatorWrapper}>
                <CircularProgress size={this.props.size} />
            </div>
        );
    }
}
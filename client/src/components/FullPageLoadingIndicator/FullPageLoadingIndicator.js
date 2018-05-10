import { CircularProgress } from "material-ui/Progress";
import React, { Component } from "react";


export default class FullPageLoadingIndicator extends Component {
    render() {
        return (
            <div className={this.props.classes.loadingIndicatorWrapper}>
                <CircularProgress size={this.props.size} />
            </div>
        );
    }
}
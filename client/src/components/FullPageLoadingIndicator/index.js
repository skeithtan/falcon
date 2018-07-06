import CircularProgress from "@material-ui/core/CircularProgress";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseFullPageLoadingIndicator extends PureComponent {
    render() {
        const {classes, size} = this.props;
        return (
            <div className={classes.loadingIndicatorWrapper}>
                <CircularProgress size={size} />
            </div>
        );
    }
}

export const FullPageLoadingIndicator = wrap(BaseFullPageLoadingIndicator);
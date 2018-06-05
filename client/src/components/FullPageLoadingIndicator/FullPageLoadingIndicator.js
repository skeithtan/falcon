import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";


export const FullPageLoadingIndicator = ({classes, size}) => (
    <div className={classes.loadingIndicatorWrapper}>
        <CircularProgress size={size} />
    </div>
);
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { wrap } from "./wrapper";


const BaseFullPageLoadingIndicator = ({classes, size}) => (
    <div className={classes.loadingIndicatorWrapper}>
        <CircularProgress size={size} />
    </div>
);

export const FullPageLoadingIndicator = wrap(BaseFullPageLoadingIndicator);
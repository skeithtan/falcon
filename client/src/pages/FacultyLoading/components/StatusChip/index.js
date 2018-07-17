import Chip from "@material-ui/core/Chip";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";

class BaseStatusChip extends PureComponent {
    render() {
        const { label, color, classes } = this.props;

        return <Chip label={label} className={classes[color]} />;
    }
}

export const StatusChip = wrap(BaseStatusChip);

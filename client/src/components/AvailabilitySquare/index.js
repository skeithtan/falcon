import React, { PureComponent } from "react";
import CheckedIcon from "@material-ui/icons/CheckBox";
import UncheckedIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Grid from "@material-ui/core/Grid";
import { wrap } from "./wrapper";

class BaseAvailabilitySquare extends PureComponent {
    renderIcon = () => {
        const { checked, classes } = this.props;
        const iconClasses = [classes.icon];

        if (checked) {
            iconClasses.push("checked");
            return <CheckedIcon className={iconClasses.join(" ")} />;
        }

        return <UncheckedIcon className={iconClasses.join(" ")} />;
    };

    render() {
        const { checked, classes, ...props } = this.props;
        const rootClasses = [classes.availabilitySquare];

        if (checked) {
            rootClasses.push("checked");
        }

        if (props.onClick) {
            rootClasses.push("clickable");
        }

        return (
            <Grid
                {...props}
                container
                alignItems="center"
                justify="center"
                className={rootClasses.join(" ")}
            >
                <Grid item>{this.renderIcon()}</Grid>
            </Grid>
        );
    }
}

export const AvailabilitySquare = wrap(BaseAvailabilitySquare);

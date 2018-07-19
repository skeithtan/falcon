import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CompatibleIcon from "@material-ui/icons/Check";
import IncompatibleIcon from "@material-ui/icons/ErrorOutline";
import { wrap } from "./wrapper";

class CompatibilityItem extends PureComponent {
    renderIcon = () => {
        const { classes, isCompatible } = this.props;
        return isCompatible ? (
            <CompatibleIcon className={classes.icon} />
        ) : (
            <IncompatibleIcon className={classes.icon} />
        );
    };

    render() {
        const { classes, isCompatible, label } = this.props;
        const rootClasses = [
            classes.item,
            isCompatible ? classes.compatibleItem : classes.incompatibleItem,
        ];

        return (
            <Grid
                container
                spacing={16}
                className={rootClasses.join(" ")}
                direction="row"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item>{this.renderIcon()}</Grid>
                <Grid item>
                    <Typography color="inherit">{label}</Typography>
                </Grid>
            </Grid>
        );
    }
}

class BaseCompatibilityDisplay extends PureComponent {
    render() {
        const { classes, compatibility } = this.props;
        return (
            <Grid
                spacing={8}
                container
                alignItems="stretch"
                direction="column"
                wrap="nowrap"
            >
                {compatibility.map(item => (
                    <Grid item key={item.criteria}>
                        <CompatibilityItem
                            classes={classes}
                            label={item.criteria}
                            isCompatible={item.verdict}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export const CompatibilityDisplay = wrap(BaseCompatibilityDisplay);

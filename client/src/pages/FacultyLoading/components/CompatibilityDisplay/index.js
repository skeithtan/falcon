import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CompatibleIcon from "@material-ui/icons/Check";
import UnknownCompatibilityIcon from "@material-ui/icons/Warning";
import IncompatibleIcon from "@material-ui/icons/ErrorOutline";
import { wrap } from "./wrapper";

class CompatibilityItem extends PureComponent {
    renderIcon = () => {
        const { classes, isCompatible } = this.props;
        if (isCompatible) {
            return <CompatibleIcon className={classes.icon} />;
        } else if (isCompatible === null) {
            return <UnknownCompatibilityIcon className={classes.icon} />;
        } else {
            return <IncompatibleIcon className={classes.icon} />;
        }
    };

    render() {
        const { classes, isCompatible, label } = this.props;
        const rootClasses = [classes.root];

        if (isCompatible) {
            rootClasses.push(classes.compatibleItem);
        } else if (isCompatible === null) {
            rootClasses.push(classes.unknownCompatibilityItem);
        } else {
            rootClasses.push(classes.incompatibleItem);
        }

        return (
            <div className={rootClasses.join(" ")}>
                <Grid
                    container
                    spacing={16}
                    direction="row"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <Grid item>{this.renderIcon()}</Grid>
                    <Grid item xs>
                        <Typography color="inherit">{label}</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

class BaseCompatibilityDisplay extends PureComponent {
    render() {
        const { classes, compatibility } = this.props;
        return (
            <Grid
                container
                alignItems="stretch"
                direction="column"
                wrap="nowrap"
            >
                {compatibility.map(item => (
                    <Grid item key={item.criteria}>
                        <CompatibilityItem
                            classes={classes}
                            label={item.message}
                            isCompatible={item.isCompatible}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export const CompatibilityDisplay = wrap(BaseCompatibilityDisplay);

import React, { PureComponent } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { wrap } from "./wrapper";

class WarningItem extends PureComponent {
    render() {
        const { classes, children } = this.props;

        return (
            <ListItem className={classes.warningItemContainer}>
                <ListItemIcon>
                    <WarningIcon className={classes.warningIcon} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography variant="subheading" color="inherit">
                            {children}
                        </Typography>
                    }
                />
            </ListItem>
        );
    }
}

class BaseWarningList extends PureComponent {
    render() {
        const { warnings, classes } = this.props;
        return (
            <List disablePadding>
                {warnings.map(warning => (
                    <WarningItem classes={classes} key={warning}>
                        {warning}
                    </WarningItem>
                ))}
            </List>
        );
    }
}

export const WarningList = wrap(BaseWarningList);

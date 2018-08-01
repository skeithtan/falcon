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
        const { classes, children, severe } = this.props;
        const iconClasses = [classes.warningIcon];
        const rootClasses = [classes.warningItemContainer];

        if (severe) {
            iconClasses.push("severe");
            rootClasses.push("severe");
        }

        return (
            <ListItem className={rootClasses.join(" ")}>
                <ListItemIcon>
                    <WarningIcon className={iconClasses.join(" ")} />
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
                {warnings.map(({ message, isSevere }) => (
                    <WarningItem
                        classes={classes}
                        key={message}
                        severe={isSevere}
                    >
                        {message}
                    </WarningItem>
                ))}
            </List>
        );
    }
}

export const WarningList = wrap(BaseWarningList);

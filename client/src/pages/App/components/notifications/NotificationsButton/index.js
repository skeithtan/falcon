import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { Component, Fragment } from "react";
import { NotificationsTray } from "../NotificationsTray";
import { wrap } from "./wrapper";


class BaseNotificationsButton extends Component {
    state = {
        anchor: null,
    };

    toggleNotificationTray = event => this.setState({
        anchor: event === null ? null : event.currentTarget,
    });

    renderNotificationButton = () => (
        <Tooltip disableFocusListener title="Notifications">
            <IconButton
                color="inherit"
                onClick={this.toggleNotificationTray}
            >
                <NotificationsIcon />
            </IconButton>
        </Tooltip>
    );

    render() {
        const {anchor} = this.state;
        const {
            classes,
            notifications,
        } = this.props;

        const withBadge = notifications.notifications.length > 0;

        return (
            <Fragment>
                {withBadge ?
                    <Badge badgeContent={notifications.notifications.length} classes={{badge: classes.badge}}>
                        {this.renderNotificationButton()}
                    </Badge> :
                    this.renderNotificationButton()
                }

                <NotificationsTray
                    open={Boolean(anchor)}
                    onClose={() => this.toggleNotificationTray(null)}
                    anchorEl={anchor}
                    notifications={notifications}
                />
            </Fragment>
        );
    }
}

export const NotificationsButton = wrap(BaseNotificationsButton);
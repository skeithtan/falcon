import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { wrap } from "./wrapper";


const BaseNotificationsTray = ({
    classes,
    open,
    onClose,
    anchorEl,
}) => (
    <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
    >
        <div className={classes.notificationsTray}>
            <div className={classes.notificationsTrayTitle}>
                <Typography variant="body2">
                    Notifications
                </Typography>
            </div>
            <Divider />
        </div>
    </Popover>
);

export const NotificationsTray = wrap(BaseNotificationsTray);
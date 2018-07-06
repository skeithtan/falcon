import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator/index";
import { wrap } from "./wrapper";


class BaseNotificationsTray extends Component {
    componentDidMount() {
        const {
            faculties,
            changeRequests,
            fetchAllFaculties,
            fetchChangeRequests,
        } = this.props;

        if (!faculties.faculties && !faculties.isLoading) {
            fetchAllFaculties();
        }

        if (!changeRequests.changeRequests && !changeRequests.changeRequests) {
            fetchChangeRequests();
        }
    }

    render() {
        const {
            classes,
            open,
            onClose,
            anchorEl,
            notifications: {
                notifications,
                isLoading,
            },
        } = this.props;

        return (
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
                    <div className={classes.notificationsTrayBody}>

                        {isLoading &&
                        <Grid container style={{height: "100%"}}>
                            <FullPageLoadingIndicator size={60} />
                        </Grid>
                        }

                        {!isLoading && notifications.map(notification => notification(onClose))}
                    </div>
                </div>
            </Popover>
        );
    }
}

export const NotificationsTray = wrap(BaseNotificationsTray);
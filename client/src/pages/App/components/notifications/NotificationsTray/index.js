import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


class BaseNotificationsTray extends PureComponent {
    componentDidMount() {
        const {
            user,
            faculties,
            changeRequests,
            fetchAllFaculties,
            fetchAllChangeRequests,
            fetchMyChangeRequests,
        } = this.props;

        if (!faculties.faculties && !faculties.isLoading) {
            fetchAllFaculties();
        }

        const fetchChangeRequests = getObjectForUserType(user, {
            DEAN: fetchAllChangeRequests,
            ASSOCIATE_DEAN: fetchAllChangeRequests,
            CLERK: fetchAllChangeRequests,
            FACULTY: fetchMyChangeRequests,
        });

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
                        {!isLoading && notifications.length === 0 &&
                        <EmptyState bigMessage="No notifications found" />
                        }
                    </div>
                </div>
            </Popover>
        );
    }
}

export const NotificationsTray = wrap(BaseNotificationsTray);
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FullPageLoadingIndicator } from "../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../components/states/EmptyState";
import { UserAvatar } from "../../../../components/UserAvatar";
import { makeURL } from "../../../../utils/url.util";
import { getFullName } from "../../../../utils/user.util";
import { wrap } from "./wrapper";


const ChangeRequestNotificationItem = ({faculty, changeRequestCount, onClose}) => (
    <ListItem
        button
        component={Link}
        to={makeURL().facultyProfiles().selectFaculty(faculty._id).changeRequests().build()}
        onClick={onClose}
    >
        <Grid container spacing={16} direction="row" wrap="nowrap" alignItems="center">
            <Grid item>
                <UserAvatar user={faculty.user} />
            </Grid>
            <Grid item>
                <Typography>
                    <strong>{getFullName(faculty.user)}</strong> submitted <strong>{changeRequestCount} change
                    requests</strong>
                </Typography>
            </Grid>
        </Grid>
    </ListItem>
);

const ChangeRequestNotifications = ({changeRequests, faculties, onClose}) =>
    Object.entries(changeRequests).map(([facultyId, facultyChangeRequests]) => (
        <ChangeRequestNotificationItem
            key={facultyId}
            faculty={faculties.find(faculty => faculty._id === facultyId)}
            changeRequestCount={facultyChangeRequests.length}
            onClose={onClose}
        />
    ));

const renderNotificationTrayBody = (classes, changeRequests, faculties, onClose) => {
    if (changeRequests.changeRequests &&
        Object.keys(changeRequests.changeRequests).length === 0) {
        return (
            <EmptyState bigMessage="No notifications found" />
        );
    }

    if (changeRequests.isLoading || faculties.isLoading) {
        return (
            <Grid container style={{height: "100%"}}>
                <FullPageLoadingIndicator size={60} />
            </Grid>
        );
    }

    if (changeRequests.changeRequests && faculties.faculties) {
        return (
            <ChangeRequestNotifications
                changeRequests={changeRequests.changeRequests}
                faculties={faculties.faculties}
                onClose={onClose}
            />
        );
    }

    return null;
};

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
            changeRequests,
            faculties,
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
                        {renderNotificationTrayBody(classes, changeRequests, faculties, onClose)}
                    </div>
                </div>
            </Popover>
        );
    }
}

export const NotificationsTray = wrap(BaseNotificationsTray);
import Typography from "@material-ui/core/Typography";
import React from "react";
import { UserAvatar } from "../../../../components/UserAvatar";
import { CHANGE_REQUEST_STATUSES } from "../../../../enums/review_profile_change.enums";
import { makeURL } from "../../../../utils/url.util";
import { getFullName, getObjectForUserType } from "../../../../utils/user.util";
import { NotificationItem } from "./NotificationItem";

const getNotificationsForAdmin = state => {
    const {
        changeRequests: { changeRequests, isLoading: changeRequestsIsLoading },
        faculty: { faculties, isLoading: facultiesIsLoading },
    } = state;
    const notifications = [];

    let key = 0;

    // Gather ChangeRequest notifications
    if (changeRequests && faculties) {
        Object.entries(changeRequests).forEach(
            ([facultyId, facultyChangeRequests]) => {
                const faculty = faculties.find(
                    faculty => faculty._id === facultyId
                );

                const changeRequestCount = facultyChangeRequests.filter(
                    changeRequest =>
                        changeRequest.status ===
                        CHANGE_REQUEST_STATUSES.PENDING.identifier
                ).length;

                // Do not notify if the change requests are already approved
                if (changeRequestCount === 0) {
                    return;
                }

                notifications.push(onClose => (
                    <NotificationItem
                        key={key}
                        renderAvatar={() => <UserAvatar user={faculty.user} />}
                        renderText={() => (
                            <Typography>
                                <strong>{getFullName(faculty.user)}</strong>{" "}
                                submitted{" "}
                                <strong>
                                    {changeRequestCount} change requests
                                </strong>
                            </Typography>
                        )}
                        url={makeURL()
                            .facultyProfiles()
                            .selectFaculty(faculty._id)
                            .changeRequests()
                            .build()}
                        onClose={onClose}
                    />
                ));

                key += 1;
            }
        );
    }

    return {
        notifications,
        isLoading: changeRequestsIsLoading || facultiesIsLoading,
    };
};

const getNotificationsForFaculty = state => {
    const { changeRequests, myProfile } = state;
    const profile = myProfile.profile;
    const notifications = [];
    let key = 0;

    if (
        changeRequests.changeRequests &&
        profile &&
        changeRequests.changeRequests[profile._id]
    ) {
        const myChangeRequests = changeRequests.changeRequests[profile._id];

        // Remove all pending
        myChangeRequests
            .filter(
                changeRequest =>
                    changeRequest.status !==
                    CHANGE_REQUEST_STATUSES.PENDING.identifier
            )
            .forEach(changeRequest => {
                const verb = CHANGE_REQUEST_STATUSES[changeRequest.status].name;

                notifications.push(onClose => (
                    <NotificationItem
                        key={key}
                        renderText={() => (
                            <Typography>
                                A{" "}
                                <strong>
                                    {changeRequests.subdocumentType}
                                </strong>{" "}
                                change request titled{" "}
                                <strong>{changeRequest.title}</strong> has been{" "}
                                <strong>{verb}</strong>.
                            </Typography>
                        )}
                        url={makeURL()
                            .myProfile()
                            .changeRequests()
                            .build()}
                        onClose={onClose}
                    />
                ));

                key += 1;
            });
    }

    return {
        notifications,
        isLoading: changeRequests.isLoading || myProfile.isLoading,
    };
};

export const compileNotificationsFromState = state =>
    getObjectForUserType(state.authentication.user, {
        DEAN: () => getNotificationsForAdmin(state),
        ASSOCIATE_DEAN: () => getNotificationsForAdmin(state),
        CLERK: () => getNotificationsForAdmin(state),
        FACULTY: () => getNotificationsForFaculty(state),
    })();

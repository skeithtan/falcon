import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../../../../components/UserAvatar";
import { getFullName } from "../../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../../..";
import { OVERVIEW_TAB } from "../../faculty_detail_tabs";
import { wrap } from "./wrapper";

class BaseFacultyListItem extends PureComponent {
    render() {
        const {
            activeTab,
            classes,
            faculty,
            active,
            changeRequests: { changeRequests: allChangeRequests },
        } = this.props;

        const listItemClasses = [classes.listItem];

        if (active) {
            listItemClasses.push(classes.activeListItem);
        }

        // Go to where the active tab is if any. If none, go to default overview tab
        const tabPath = activeTab ? activeTab : OVERVIEW_TAB.path;

        const badge =
            allChangeRequests &&
            allChangeRequests[faculty._id] &&
            allChangeRequests[faculty._id].length;

        const withBadge = badge && badge > 0;

        return (
            <ListItem
                button
                component={Link}
                to={`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/${tabPath}`}
                className={listItemClasses.join(" ")}
            >
                {withBadge ? (
                    <Badge
                        badgeContent={badge}
                        classes={{ badge: classes.badge }}
                    >
                        <UserAvatar user={faculty.user} />
                    </Badge>
                ) : (
                    <UserAvatar user={faculty.user} />
                )}

                <ListItemText
                    primary={getFullName(faculty.user)}
                    classes={{ primary: classes.listItemFacultyName }}
                    secondary={`T-${faculty.idNumber}`}
                />
            </ListItem>
        );
    }
}

export const FacultyListItem = wrap(BaseFacultyListItem);

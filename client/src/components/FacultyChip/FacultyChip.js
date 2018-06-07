import Chip from "@material-ui/core/Chip";
import React from "react";
import { FACULTY_PROFILES_PAGE } from "../../pages";
import { getFullName } from "../../utils/user.util";
import { UserAvatar } from "../UserAvatar";


function onChipClick({faculty, clickable, history}) {
    if (!clickable) {
        return null;
    }

    return history.push(`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/overview`);
}

export const FacultyChip = ({faculty, clickable, history}) => (
    <Chip
        avatar={<UserAvatar user={faculty.user} />}
        onClick={() => onChipClick({faculty, clickable, history})}
        label={getFullName(faculty.user)}
    />
);
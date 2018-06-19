import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
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

export const FacultyChip = ({classes, faculty, clickable, history, handleDelete, showDeleteButton}) => (
    <Chip
        className={classes.chip}
        avatar={<UserAvatar user={faculty.user} />}
        onClick={() => onChipClick({faculty, clickable, history})}
        onDelete={showDeleteButton ? handleDelete : null}
        label={
            <Typography
                variant="body2"
                className={classes.chipText}
            >
                {getFullName(faculty.user)}
            </Typography>
        }
    />
);
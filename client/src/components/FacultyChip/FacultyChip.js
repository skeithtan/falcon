import Chip from "@material-ui/core/Chip";
import React from "react";
import { getFullName } from "../../utils/user.util";
import { UserAvatar } from "../UserAvatar";


export const FacultyChip = ({faculty}) => (
    <Chip
        avatar={<UserAvatar user={faculty.user} />}
        label={getFullName(faculty.user)}
    />
);
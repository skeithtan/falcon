import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { getFullName } from "../../utils/user.util";
import { UserAvatar } from "../UserAvatar";
import { wrapper } from "./wrapper";


const BaseUserChip = ({classes, user, onClick, handleDelete, showDeleteButton}) => (
    <Chip
        className={classes.chip}
        avatar={<UserAvatar user={user} />}
        onClick={onClick}
        onDelete={showDeleteButton ? handleDelete : null}
        label={
            <Typography
                variant="body2"
                className={classes.chipText}
            >
                {getFullName(user)}
            </Typography>
        }
    />
);

export const UserChip = wrapper(BaseUserChip);



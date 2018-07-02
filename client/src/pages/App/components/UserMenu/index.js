import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { UserAvatar } from "../../../../components/UserAvatar";
import { USER_TYPES } from "../../../../enums/user.enums";
import { wrap } from "./wrapper";


const BaseUserMenu = ({
    open,
    user,
    onClose,
    anchorEl,
    classes,
    onSignOutClick,
    onChangePasswordClick,
    user: {name: {first, last}, email, authorization},
}) => (
    <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
    >
        <div className={classes.currentUserDisplay}>
            <UserAvatar user={user} />

            <div className={classes.userDetails}>
                <Typography className={classes.userFullName}>{first} {last}</Typography>
                <Typography color="textSecondary">{email}</Typography>
                <Typography color="textSecondary">{USER_TYPES[authorization].name}</Typography>
            </div>
        </div>

        <Divider />

        <MenuItem onClick={onChangePasswordClick}>Change my password</MenuItem>
        <MenuItem onClick={onSignOutClick}>Sign out</MenuItem>
    </Popover>
);

export const UserMenu = wrap(BaseUserMenu);
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { UserAvatar } from "../../../../components/UserAvatar";
import { USER_TYPES } from "../../../../enums/user.enums";


export const UserMenu = ({
    open,
    user,
    onClose,
    anchorEl,
    classes,
    onSignOutClick,
    onChangePasswordClick,
    user: {name: {first, last}, email, authorization},
}) => (
    <Menu
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        MenuListProps={{disablePadding: true}}>
        <div className={classes.currentUserDisplay}>
            <UserAvatar user={user} />

            <div className={classes.userDetails}>
                <Typography className={classes.userFullName}>{first} {last}</Typography>
                <Typography color="textSecondary">{email}</Typography>
                <Typography color="textSecondary">{USER_TYPES[authorization].name}</Typography>
            </div>
        </div>

        <MenuItem onClick={onChangePasswordClick}>Change my password</MenuItem>
        <MenuItem onClick={onSignOutClick}>Sign out</MenuItem>
    </Menu>
);
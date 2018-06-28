import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { getFullName, getInitials } from "../../utils/user.util";
import { wrap } from "./wrapper";


const UserAvatarInitials = ({initials, fullName, className, onClick}) => (
    <Avatar className={className} onClick={onClick} alt={fullName}>{initials}</Avatar>
);

const UserAvatarPhoto = ({photo, fullName, className, onClick}) => (
    <Avatar className={className} onClick={onClick} alt={fullName} src={photo} />
);

const BaseUserAvatar = ({classes, user, className, onClick}) => {
    const fullName = getFullName(user);
    const initials = getInitials(user);
    const photo = user.photo;

    return photo ?
        <UserAvatarPhoto
            photo={photo}
            fullName={fullName}
            className={`${classes.avatar} ${className}`}
            onClick={onClick}
        /> :
        <UserAvatarInitials
            initials={initials}
            fullName={fullName}
            className={`${classes.avatar} ${className}`}
            onClick={onClick}
        />;
};

export const UserAvatar = wrap(BaseUserAvatar);
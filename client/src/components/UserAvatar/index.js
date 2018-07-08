import Avatar from "@material-ui/core/Avatar";
import React, { PureComponent } from "react";
import { getFullName, getInitials } from "../../utils/user.util";
import { wrap } from "./wrapper";


class BaseUserAvatar extends PureComponent {
    renderUserAvatarInitials = (fullName, initials) => (
        <Avatar
            className={`${this.props.classes.avatar} ${this.props.className}`}
            onClick={this.props.onClick}
            alt={fullName}
        >
            {initials}
        </Avatar>
    );

    renderUserAvatarPhoto = (fullName, photo) => (
        <Avatar
            className={`${this.props.classes.avatar} ${this.props.className}`}
            onClick={this.props.onClick}
            alt={fullName}
            src={photo}
        />
    );

    render() {
        const {user} = this.props;
        const fullName = getFullName(user);
        const initials = getInitials(user);
        const photo = user.photo;
        return photo ?
            this.renderUserAvatarPhoto(fullName, photo) :
            this.renderUserAvatarInitials(fullName, initials);
    }
}

export const UserAvatar = wrap(BaseUserAvatar);
import Avatar from "@material-ui/core/Avatar";
import React, { Component } from "react";
import { getInitials, getFullName } from "../../utils/user.util";


export class UserAvatar extends Component {
    renderInitials = (initials, fullName) => (
        <Avatar className={this.props.className} onClick={this.props.onClick} alt={fullName}>{initials}</Avatar>
    );

    renderPhoto = (photo, fullName) => (
        <Avatar className={this.props.className} onClick={this.props.onClick} alt={fullName} src={photo} />
    );

    render() {
        const user = this.props.user;
        const fullName = getFullName(user);
        const initials = getInitials(user);
        const photo = user.photo;

        if (photo) {
            return this.renderPhoto(photo, fullName);
        }

        return this.renderInitials(initials, fullName);
    }
}
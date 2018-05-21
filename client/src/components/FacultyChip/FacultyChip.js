import Chip from "@material-ui/core/Chip";
import React, { Component } from "react";
import { getFullName } from "../../utils/user.util";
import UserAvatar from "../UserAvatar";


export default class FacultyChip extends Component {
    render() {
        const faculty = this.props.faculty;
        const avatar = <UserAvatar user={faculty.user} />;

        return (
            <Chip
                avatar={avatar}
                label={getFullName(faculty.user)}
            />
        );
    }
}
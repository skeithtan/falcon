import React, { PureComponent } from "react";
import { UserChip } from "../UserChip";
import { wrap } from "./wrapper";
import { makeURL } from "../../utils/url.util";


class BaseFacultyChip extends PureComponent {
    onFacultyChipClick = () => {
        const {faculty, clickable, history} = this.props;
        if (!clickable) {
            return null;
        }

        return history.push(
            makeURL()
                .facultyProfiles()
                .selectFaculty(faculty._id)
                .overview()
                .build()
        );
    };

    render() {
        const {faculty, handleDelete, showDeleteButton} = this.props;
        return (
            <UserChip
                user={faculty.user}
                onClick={this.onFacultyChipClick}
                showDeleteButton={showDeleteButton}
                handleDelete={showDeleteButton ? handleDelete : null}
            />
        );
    }
}

export const FacultyChip = wrap(BaseFacultyChip);
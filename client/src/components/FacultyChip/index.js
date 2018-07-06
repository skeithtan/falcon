import React, { PureComponent } from "react";
import { FACULTY_PROFILES_PAGE } from "../../pages";
import { UserChip } from "../UserChip";
import { wrapper } from "./wrapper";


function onChipClick({faculty, clickable, history}) {
    if (!clickable) {
        return null;
    }

    return history.push(`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/overview`);
}

class BaseFacultyChip extends PureComponent {
    render() {
        const {faculty, clickable, history, handleDelete, showDeleteButton} = this.props;
        return (
            <UserChip
                user={faculty.user}
                onClick={() => onChipClick({faculty, clickable, history})}
                showDeleteButton={showDeleteButton}
                handleDelete={showDeleteButton ? handleDelete : null}
            />
        );
    }
}

export const FacultyChip = wrapper(BaseFacultyChip);
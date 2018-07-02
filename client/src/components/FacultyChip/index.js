import React from "react";
import { FACULTY_PROFILES_PAGE } from "../../pages";
import { UserChip } from "../UserChip";
import { wrapper } from "./wrapper";


function onChipClick({faculty, clickable, history}) {
    if (!clickable) {
        return null;
    }

    return history.push(`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/overview`);
}

const BaseFacultyChip = ({faculty, clickable, history, handleDelete, showDeleteButton}) => (
    <UserChip
        user={faculty.user}
        onClick={() => onChipClick({faculty, clickable, history})}
        onDelete={showDeleteButton ? handleDelete : null}
    />
);

export const FacultyChip = wrapper(BaseFacultyChip);



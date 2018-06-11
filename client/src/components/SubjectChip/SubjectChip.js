import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { SUBJECTS_PAGE } from "../../pages";


function onChipClick({subject, clickable, history}) {
    if (!clickable) {
        return null;
    }

    return history.push(`/${SUBJECTS_PAGE.path}/${subject._id}`);
}

export const SubjectChip = ({subject, clickable, history, handleDelete}) => (
    <Tooltip title={subject.name}>
        <Chip
            onClick={() => onChipClick({subject, clickable, history})}
            onDelete={handleDelete}
            label={subject.code}
        />
    </Tooltip>
);
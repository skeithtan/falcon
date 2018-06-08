import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";


function onChipClick({subject, clickable, history}) {
    if (!clickable) {
        return null;
    }

    return null; // TODO
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
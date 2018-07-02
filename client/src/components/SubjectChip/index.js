import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { SUBJECTS_PAGE } from "../../pages";
import { wrap } from "./wrapper";


function onChipClick({subject, clickable, history}) {
    if (!clickable) {
        return null;
    }

    return history.push(`/${SUBJECTS_PAGE.path}/${subject._id}`);
}

const BaseSubjectChip = ({classes, subject, clickable, history, handleDelete, showDeleteButton}) => (
    <Tooltip disableFocusListener title={subject.name}>
        <Chip
            className={classes.chip}
            onClick={() => onChipClick({subject, clickable, history})}
            onDelete={showDeleteButton ? handleDelete : null}
            label={
                <Typography
                    variant="body2"
                    className={classes.chipText}
                >
                    {subject.code}
                </Typography>
            }
        />
    </Tooltip>
);

export const SubjectChip = wrap(BaseSubjectChip);
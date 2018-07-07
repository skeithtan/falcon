import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";
import { makeURL } from "../../utils/url.util";


class BaseSubjectChip extends PureComponent {
    onSubjectChipClick = () => {
        const { subject, clickable, history } = this.props;
        if (!clickable) {
            return null;
        }

        return history.push(
            makeURL()
                .subjects()
                .selectSubject(subject._id)
                .build()
        );
    }

    render() {
        const {classes, subject, handleDelete, showDeleteButton} = this.props;
        return (
            <Tooltip disableFocusListener title={subject.name}>
                <Chip
                    className={classes.chip}
                    onClick={this.onSubjectChipClick}
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
    }
}

export const SubjectChip = wrap(BaseSubjectChip);
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React, { Component, Fragment } from "react";
import { SubjectPopover } from "./SubjectPopover";
import { wrap } from "./wrapper";
import { makeURL } from "../../utils/url.util";

class BaseSubjectChip extends Component {
    state = {
        popoverAnchorEl: null,
    };

    handlePopoverOpen = event => {
        this.setState({ popoverAnchorEl: event.target });
    };

    handlePopoverClose = () => {
        this.setState({ popoverAnchorEl: null });
    };

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
    };

    render() {
        const { classes, subject, handleDelete, showDeleteButton } = this.props;
        const { popoverAnchorEl } = this.state;
        return (
            <Fragment>
                <div
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                >
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
                </div>

                <SubjectPopover
                    open={Boolean(popoverAnchorEl)}
                    anchorEl={popoverAnchorEl}
                    onClose={this.handlePopoverClose}
                    subject={subject}
                />
            </Fragment>
        );
    }
}

export const SubjectChip = wrap(BaseSubjectChip);

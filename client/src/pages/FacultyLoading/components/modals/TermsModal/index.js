import React, { PureComponent, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { wrap } from "./wrapper";
import { termScheduleToString } from "../../../../../utils/faculty_loading.util";
import { makeURL } from "../../../../../utils/url.util";
import { FACULTY } from "../../../../../enums/user.enums";
import { EmptyState } from "../../../../../components/states/EmptyState";

class TermItem extends PureComponent {
    render() {
        const { classes, termSchedule, active, onClick } = this.props;
        return (
            <ListItem
                button
                onClick={onClick}
                className={active ? classes.activeItem : ""}
            >
                <ListItemText primary={termScheduleToString(termSchedule)} />
            </ListItem>
        );
    }
}

class BaseTermsModal extends PureComponent {
    onTermScheduleClick = termSchedule => {
        const { history, activeTermSchedule, user, onClose } = this.props;
        if (activeTermSchedule._id === termSchedule._id) {
            return;
        }

        const url =
            user.authorization === FACULTY.identifier
                ? makeURL()
                      .mySchedule()
                      .selectTermSchedule(termSchedule._id)
                      .build()
                : makeURL()
                      .facultyLoading()
                      .selectTermSchedule(termSchedule._id)
                      .mondayThursday()
                      .build();

        history.push(url);
        onClose();
    };
    render() {
        const {
            open,
            onClose,
            classes,
            termSchedules: { current, archived },
            activeTermSchedule,
        } = this.props;

        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Terms</DialogTitle>
                {current && (
                    <Fragment>
                        <ListSubheader>Current</ListSubheader>
                        <TermItem
                            onClick={() => this.onTermScheduleClick(current)}
                            classes={classes}
                            termSchedule={current}
                            active={activeTermSchedule._id === current._id}
                        />
                    </Fragment>
                )}

                <List subheader={<ListSubheader>Archived</ListSubheader>}>
                    {archived.map(termSchedule => (
                        <TermItem
                            onClick={() =>
                                this.onTermScheduleClick(termSchedule)
                            }
                            classes={classes}
                            key={termSchedule._id}
                            termSchedule={termSchedule}
                            active={activeTermSchedule._id === termSchedule._id}
                        />
                    ))}

                    {archived.length === 0 && (
                        <EmptyState bigMessage="There are no archived terms" />
                    )}
                </List>
            </Dialog>
        );
    }
}

export const TermsModal = wrap(BaseTermsModal);

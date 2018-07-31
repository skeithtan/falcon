import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React, { Component, PureComponent } from "react";
import { Link } from "react-router-dom";
import { EmptySearchResultsState } from "../../../../components/states/EmptySearchResultsState";
import { EmptyState } from "../../../../components/states/EmptyState";
import { makeURL } from "../../../../utils/url.util";
import { AddSubjectModal } from "../modals/AddSubjectModal";
import { wrap } from "./wrapper";


class SubjectItem extends PureComponent {
    render() {
        const {classes, subject, active} = this.props;
        const {activeListItem, listItem} = classes;
        const className = active ? [activeListItem, listItem].join(" ") : listItem;
        const subjectPageURL = makeURL()
            .subjects()
            .selectSubject(subject._id)
            .build();

        return (
            <ListItem
                button
                component={Link}
                className={className}
                onClick={() => document.title = `${subject.code} (${subject.name}) - Subjects - Falcon`}
                to={subjectPageURL}
            >
                <ListItemText
                    primary={subject.code}
                    secondary={subject.name}
                />
            </ListItem>
        );
    }
}

class BaseSubjectsList extends Component {
    state = {
        addSubjectModalIsShowing: false,
    };

    toggleAddSubjectModal = shouldShow => this.setState({
        addSubjectModalIsShowing: shouldShow,
    });

    renderEmptyState = () => (
        <EmptyState bigMessage="No subjects found"
                    smallMessage="When subjects are added, you can see them here"
                    onAddButtonClick={() => this.toggleAddSubjectModal(true)}
                    addButtonText="Add a subject" />
    );

    renderNoResultsState = () => (
        <EmptySearchResultsState searchKeyword={this.props.searchKeyword} />
    );

    getSubjects = () => {
        let {subjects, searchKeyword} = this.props;
        searchKeyword = searchKeyword.toLowerCase().trim();
        if (!searchKeyword) {
            return subjects;
        }

        return subjects.filter(subject =>
            subject.code.toLowerCase().includes(searchKeyword) ||
            subject.name.toLowerCase().includes(searchKeyword),
        );
    };

    renderList = subjects => {
        const {
            subjectId,
            classes,
            searchKeyword,
        } = this.props;

        const isSearching = searchKeyword.length > 0;

        if (subjects.length === 0) {
            return isSearching ? this.renderNoResultsState() : this.renderEmptyState();
        }

        return (
            <List className={classes.subjectsList}>
                {subjects.map(subject => (
                    <SubjectItem
                        classes={classes}
                        subject={subject}
                        active={subjectId === subject._id}
                        key={subject._id}
                    />
                ))}
            </List>
        );
    };

    render() {
        const {classes, user} = this.props;
        const subjects = this.getSubjects();
        const {addSubjectModalIsShowing} = this.state;

        return (
            <Grid container className={classes.subjectsListContainer}>
                {this.renderList(subjects)}

                {user.permissions.MUTATE_FACULTY_PROFILES &&
                <Tooltip disableFocusListener title="Add a subject" placement="top">
                    <Button variant="fab" color="primary" className={classes.addButton}
                            onClick={() => this.toggleAddSubjectModal(true)}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                }

                <AddSubjectModal
                    action="add"
                    open={addSubjectModalIsShowing}
                    onClose={() => this.toggleAddSubjectModal(false)}
                />
            </Grid>
        );

    }
}

export const SubjectsList = wrap(BaseSubjectsList);
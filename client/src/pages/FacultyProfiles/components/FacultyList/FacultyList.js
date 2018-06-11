import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { EmptySearchResultsState } from "../../../../components/states/EmptySearchResultsState";
import { EmptyState } from "../../../../components/states/EmptyState";
import { UserAvatar } from "../../../../components/UserAvatar";
import { getFullName } from "../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../../index";
import { OVERVIEW_TAB } from "../faculty_detail_tabs";
import { AddFacultyModal } from "../modals/AddFacultyModal";


const FacultyItem = ({activeTab, classes, faculty, active}) => {
    const {activeListItem, listItem} = classes;
    const className = active ? [activeListItem, listItem].join(" ") : listItem;

    // Go to where the active tab is if any. If none, go to default overview tab
    const tabPath = activeTab ? activeTab : OVERVIEW_TAB.path;
    const fullName = getFullName(faculty.user);

    return (
        <ListItem
            button
            component={Link}
            to={`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/${tabPath}`}
            className={className}
            onClick={() => document.title = `${fullName}'s Profile - Faculty Profiles - Falcon`}
        >
            <UserAvatar user={faculty.user} />
            <ListItemText primary={getFullName(faculty.user)} />
        </ListItem>
    );
};

export class FacultyList extends Component {
    state = {
        addFacultyModalIsShowing: false,
    };

    toggleAddFacultyModal = shouldShow => this.setState({
        addFacultyModalIsShowing: shouldShow,
    });

    renderEmptyState = () => (
        <EmptyState bigMessage="No faculties found"
                    smallMessage="When faculties are added, you can see them here"
                    onAddButtonClick={() => this.toggleAddFacultyModal(true)}
                    addButtonText="Add a faculty" />
    );

    renderNoResultsState = () => (
        <EmptySearchResultsState searchKeyword={this.props.searchKeyword} />
    );

    getFaculties = () => {
        let {searchKeyword, faculties} = this.props;
        searchKeyword = searchKeyword.toLowerCase().trim();
        if (searchKeyword.length === 0) {
            return faculties;
        }
        return faculties.filter(faculty => {
            const fullName = `${faculty.user.name.first} ${faculty.user.name.last}`.toLowerCase();
            const email = faculty.user.email.toLowerCase();
            return fullName.includes(searchKeyword) || email.includes(searchKeyword);
        });
    };

    renderList = faculties => {
        const {
            match: {params: {facultyId, activeTab}},
            classes,
            searchKeyword,
        } = this.props;

        const isSearching = searchKeyword.length > 0;

        if (faculties.length === 0) {
            return isSearching ? this.renderNoResultsState() : this.renderEmptyState();
        }

        return (
            <List className={classes.facultyList}>
                {faculties.map(faculty =>
                    <FacultyItem
                        activeTab={activeTab}
                        classes={classes}
                        faculty={faculty}
                        active={facultyId === faculty._id}
                        key={faculty._id} />,
                )}
            </List>
        );
    };

    render() {
        const {classes} = this.props;
        const faculties = this.getFaculties();
        const {addFacultyModalIsShowing} = this.state;

        return (
            <Grid container className={classes.facultyListContainer}>
                {this.renderList(faculties)}

                <Tooltip title="Add a faculty" placement="top">
                    <Button variant="fab" color="primary" className={classes.addButton}
                            onClick={() => this.toggleAddFacultyModal(true)}>
                        <AddIcon />
                    </Button>
                </Tooltip>

                {addFacultyModalIsShowing &&
                <AddFacultyModal open={addFacultyModalIsShowing}
                                 onClose={() => this.toggleAddFacultyModal(false)} />
                }
            </Grid>
        );
    }
}
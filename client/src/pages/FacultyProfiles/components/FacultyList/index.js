import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import { EmptySearchResultsState } from "../../../../components/states/EmptySearchResultsState";
import { EmptyState } from "../../../../components/states/EmptyState";
import { AddFacultyModal } from "../modals/AddFacultyModal";
import { FacultyListItem } from "./FacultyListItem";
import { wrap } from "./wrapper";


class BaseFacultyList extends Component {
    state = {
        addFacultyModalIsShowing: false,
    };

    toggleAddFacultyModal = shouldShow => this.setState({
        addFacultyModalIsShowing: shouldShow,
    });

    renderEmptyState = () => (
        <EmptyState
            bigMessage="No faculties found"
            smallMessage="When faculties are added, you can see them here"
            onAddButtonClick={() => this.toggleAddFacultyModal(true)}
            addButtonText="Add a faculty"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
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
            const idNumber = `T-${faculty.idNumber}`.toLowerCase();
            return fullName.includes(searchKeyword) || email.includes(searchKeyword) || idNumber.includes(searchKeyword);
        });
    };

    renderList = faculties => {
        const {
            facultyId,
            activeTabPath,
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
                    <FacultyListItem
                        key={faculty._id}
                        activeTab={activeTabPath}
                        faculty={faculty}
                        active={facultyId === faculty._id}
                    />,
                )}
            </List>
        );
    };

    render() {
        const {classes, user} = this.props;
        const faculties = this.getFaculties();
        const {addFacultyModalIsShowing} = this.state;

        return (
            <Grid container className={classes.facultyListContainer}>
                {this.renderList(faculties)}

                {user.permissions.MUTATE_FACULTY_PROFILES &&
                <Tooltip disableFocusListener title="Add a faculty" placement="top">
                    <Button variant="fab" color="primary" className={classes.addButton}
                            onClick={() => this.toggleAddFacultyModal(true)}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                }

                <AddFacultyModal
                    action="add"
                    open={addFacultyModalIsShowing}
                    onClose={() => this.toggleAddFacultyModal(false)}
                />
            </Grid>
        );
    }
}

export const FacultyList = wrap(BaseFacultyList);
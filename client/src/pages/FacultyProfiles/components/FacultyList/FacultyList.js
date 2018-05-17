import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import FullPageLoadingIndicator from "../../../../components/FullPageLoadingIndicator/";
import { EmptySearchResultsState, EmptyState, ErrorState } from "../../../../components/states";
import UserAvatar from "../../../../components/UserAvatar";
import { getFullName } from "../../../../utils/user";
import AddFacultyModal from "../modals/AddFacultyModal";


class FacultyItem extends Component {
    render() {
        const {classes, faculty, active} = this.props;
        const {activeListItem, listItem} = classes;
        const className = active ? [activeListItem, listItem].join(" ") : listItem;
        return (
            <ListItem className={className}
                      onClick={this.props.onClick}
                      button>
                <UserAvatar user={faculty.user} />
                <ListItemText primary={getFullName(faculty.user)} />
            </ListItem>
        );
    }
}

export default class FacultyList extends Component {
    state = {
        addFacultyModalIsShowing: false,
    };

    constructor(props) {
        super(props);
        const {faculties, fetchData} = props;
        if (!faculties) {
            fetchData();
        }
    }

    renderList = faculties => {
        const {activeFacultyId, onFacultyClick, classes} = this.props;
        return (
            <List>
                {faculties.map(faculty =>
                    <FacultyItem classes={classes}
                                 onClick={() => onFacultyClick(faculty)}
                                 faculty={faculty}
                                 active={activeFacultyId && activeFacultyId === faculty._id}
                                 key={faculty._id} />,
                )}
            </List>
        );
    };

    renderLoadingIndicator = () => (
        <FullPageLoadingIndicator size={100} />
    );

    toggleAddFacultyModal = () => this.setState({
        addFacultyModalIsShowing: !this.state.addFacultyModalIsShowing,
    });

    renderEmptyState = () => (
        <EmptyState bigMessage="No faculties found"
                    smallMessage="When faculties are added, you can see them here"
                    onAddButtonClick={this.toggleAddFacultyModal}
                    addButtonText="Add a faculty" />
    );

    renderNoResultsState = () => (
        <EmptySearchResultsState searchKeyword={this.props.searchKeyword} />
    );

    renderErrors = errors => (
        <ErrorState onRetryButtonClick={this.props.fetchData}
                    message="An error occurred while trying to fetch list of faculties."
                    debug={errors[0]}
        />
    );

    getFaculties = () => {
        let {searchKeyword, faculties} = this.props;
        if (!faculties) {
            return null;
        }
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

    render() {
        const {classes, isLoading, errors, searchKeyword} = this.props;
        const faculties = this.getFaculties();
        const isSearching = searchKeyword.length > 0;
        let view;
        if (faculties) {
            if (faculties.length === 0) {
                view = isSearching ? this.renderNoResultsState() : this.renderEmptyState();
            } else {
                view = this.renderList(faculties);
            }
        }
        if (isLoading) {
            view = this.renderLoadingIndicator();
        }
        if (errors) {
            view = this.renderErrors(errors);
        }
        return (
            <div className={classes.facultyList}>

                {view}

                {faculties &&
                <Tooltip title="Add a faculty" placement="top">
                    <Button variant="fab" color="primary" className={classes.addButton}
                            onClick={this.toggleAddFacultyModal}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                }

                <AddFacultyModal open={this.state.addFacultyModalIsShowing} onClose={this.toggleAddFacultyModal} />
            </div>
        );
    }
}
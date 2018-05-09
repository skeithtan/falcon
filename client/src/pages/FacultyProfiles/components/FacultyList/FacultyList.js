import React, { Component } from "react";
import List, { ListItem } from "material-ui/List";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "material-ui/Grid";
import Tooltip from "material-ui/Tooltip";

import FullPageLoadingIndicator from "../../../../components/FullPageLoadingIndicator/";
import { ErrorState, EmptyState, EmptySearchResultsState } from "../../../../components/states";
import FacultyAvatar from "../../../../components/FacultyAvatar";
import { getFullName } from "../../../../utils/faculty";


class FacultyItem extends Component {
    render() {
        const {classes, faculty} = this.props;

        //TODO: Avatar
        return (
            <ListItem className={this.props.active ? classes.activeListItem : null}
                      onClick={this.props.onClick}
                      button>
                <Grid container wrap="nowrap" spacing={16} alignItems="center">
                    <Grid item>
                        <FacultyAvatar faculty={faculty} />
                    </Grid>
                    <Grid item>
                        <Typography className={this.props.active ? classes.activeListItemText : null}
                                    variant="subheading">
                            {getFullName(faculty)}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
}

export default class FacultyList extends Component {

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

    addFaculty = () => {
        //TODO: This
        console.log("Add faculty clicked");
    };

    renderEmptyState = () => (
        <EmptyState bigMessage="No faculties found"
                    smallMessage="When faculties are added, you can see them here"
                    onAddButtonClick={this.addFaculty}
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

    componentDidMount() {
        this.props.fetchData();
    }

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
                    <Button variant="fab" color="primary" className={classes.addButton} onClick={this.addFaculty}>
                        <AddIcon />
                    </Button>
                </Tooltip>
                }
            </div>
        );
    }
}
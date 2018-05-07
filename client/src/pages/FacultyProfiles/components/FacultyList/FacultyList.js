import React, { Component } from "react";
import List, { ListItem } from "material-ui/List";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";

import { ErrorState, EmptyState } from "../../../../components/states";


class FacultyItem extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <ListItem className={this.props.active && classes.activeListItem}
                      button
                      dense>
                <Grid container wrap="nowrap" spacing={16} alignItems="center">
                    <Grid item>
                        <Avatar>PN</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography className={this.props.active && classes.activeListItemText}
                                    variant="subheading">{this.props.children}</Typography>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
}

export default class FacultyList extends Component {

    renderList = () => (
        <List>
            {this.props.faculties.map(faculty =>
                <FacultyItem classes={this.props.classes}
                             key={faculty._id}>
                    {faculty.user.name.first} {faculty.user.name.last}
                </FacultyItem>,
            )}
        </List>
    );

    loadingIndicator = () => (
        <div className={this.props.classes.loadingIndicatorWrapper}>
            <CircularProgress size={100} />
        </div>
    );

    addFaculty = () => {
        //TODO: This
        console.log("Add faculty clicked");
    };

    emptyState = () => (
        <EmptyState bigMessage="No faculties found"
                    smallMessage="When faculties are added, you can see them here"
                    onAddButtonClick={this.addFaculty}
                    addButtonText="Add a faculty" />
    );

    errorState = () => (
        <ErrorState onRetryButtonClick={this.props.fetchData}
                    message="An error occurred while trying to fetch list of faculties."
                    debug={this.props.errors[0]}
        />
    );

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const {classes, isLoading, faculties, errors} = this.props;

        let view;

        if (faculties) {
            view = faculties.length === 0 ? this.emptyState() : this.renderList();
        }

        if (isLoading) {
            view = this.loadingIndicator();
        }

        if (errors) {
            view = this.errorState();
        }

        return (
            <div className={classes.facultyList}>

                {view}

                {faculties &&
                <Button variant="fab" color="primary" className={classes.addButton} onClick={this.addFaculty}>
                    <AddIcon />
                </Button>
                }
            </div>
        );
    }
}
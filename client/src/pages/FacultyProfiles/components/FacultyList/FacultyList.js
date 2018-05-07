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

    renderList = faculties => (
        <List>
            {faculties.map(faculty =>
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

    errorState = () => (
        <ErrorState onRetryButtonClick={this.props.fetchData}>
            An error occurred while trying to fetch list of faculties: {this.props.errors[0]}
        </ErrorState>
    );

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const {classes, isLoading, faculties, errors} = this.props;

        if (errors) {
            console.log(this.props);
        }

        return (
            <div className={classes.facultyList}>

                {faculties && this.renderList(faculties)}
                {isLoading && this.loadingIndicator()}
                {errors && this.errorState()}

                <Button variant="fab" color="primary" className={classes.addButton}>
                    <AddIcon />
                </Button>
            </div>
        );
    }
}
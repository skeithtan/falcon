import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { FacultyChip } from "../../../../components/FacultyChip/index";
import { ErrorState } from "../../../../components/states/ErrorState/index";


export class FacultyChips extends Component {
    constructor(props) {
        super(props);
        const {faculties, isLoading, fetchData} = props;
        if (!faculties && !isLoading) {
            fetchData();
        }
    }

    getFacultyFromId = _id => this.props.faculties.find(faculty => faculty._id === _id);

    renderChips = subjectFaculties => {
        const chips = subjectFaculties
        // Get full faculty details from cached faculties in redux
            .map(facultyId => this.getFacultyFromId(facultyId))
            // Make a chip
            .map(faculty => (
                <Grid item key={faculty._id}>
                    <FacultyChip clickable faculty={faculty} />
                </Grid>
            ));

        return (
            <Grid container spacing={8}>
                {chips}
            </Grid>
        );
    };

    renderLoadingIndicator = () => (
        <CircularProgress color="primary" />
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchData}
            message="An error occurred while trying to fetch faculties"
            debug={errors[0]}
        />
    );

    render() {
        const {isLoading, errors, subjectFaculties, faculties} = this.props;
        return (
            <ListItem divider>
                {
                    // Note faculties && subjectFaculties:
                    // Do not render chips when faculties is not fetched
                    faculties && subjectFaculties &&
                    this.renderChips(subjectFaculties)
                }
                {errors && this.renderErrors(errors)}
                {isLoading && this.renderLoadingIndicator()}
            </ListItem>
        );
    }
}
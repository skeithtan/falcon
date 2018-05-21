import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import ErrorState from "../../../../../../../components/states/ErrorState";
import UserAvatar from "../../../../../../../components/UserAvatar";
import { getFullName } from "../../../../../../../utils/user.util";


class FacultyChip extends Component {
    render() {
        const faculty = this.props.faculty;
        const avatar = <UserAvatar user={faculty.user} />;

        return (
            <Chip
                avatar={avatar}
                label={getFullName(faculty.user)}
            />
        );
    }
}

export default class FacultyChips extends Component {
    constructor(props) {
        super(props);
        const {faculties, isLoading, fetchData} = props;
        console.log(props);
        if (!faculties && !isLoading) {
            fetchData();
        }
    }

    getFacultyFromId = _id => this.props.faculties.find(faculty => faculty._id === _id);

    renderChips = subjectFaculties => {
        if (subjectFaculties.length === 0) {
            return (
                <Typography>
                    <i>There are no faculties set to be capable of teaching this subject</i>
                </Typography>
            );
        }

        const chips = subjectFaculties
        // Get ID from faculty skeleton
            .map(faculty => faculty._id)
            // Get full faculty details from cached faculties in redux
            .map(facultyId => this.getFacultyFromId(facultyId))
            // Make a chip
            .map(faculty => (
                <Grid item key={faculty._id}>
                    <FacultyChip faculty={faculty} />
                </Grid>
            ));

        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Typography variant="body2">
                        Faculties that can teach this subject
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={8}>
                        {chips}
                    </Grid>
                </Grid>
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
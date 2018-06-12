import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { Component } from "react";
import { FacultyChip } from "../../../../components/FacultyChip/index";
import { ErrorState } from "../../../../components/states/ErrorState/index";
import { UnassignSubjectModal } from "../../../../components/UnassignSubjectModal";


export class FacultyChips extends Component {
    state = {
        activeFaculty: null,
        unassignFacultyModalIsShowing: false,
    };

    toggleUnassignFacultyModal = shouldShow => this.setState({
        unassignFacultyModalIsShowing: shouldShow,
    });

    componentDidMount() {
        const {faculties, isLoading, fetchData} = this.props;
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
                    <FacultyChip
                        clickable
                        faculty={faculty}
                        handleDelete={() => this.setState({
                            unassignFacultyModalIsShowing: true,
                            activeFaculty: faculty,
                        })}
                    />
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
        const {isLoading, errors, subject, faculties} = this.props;
        const {activeFaculty, unassignFacultyModalIsShowing} = this.state;
        return (
            <ListItem divider>
                {
                    // Note faculties && subjectFaculties:
                    // Do not render chips when faculties is not fetched
                    faculties && subject &&
                    this.renderChips(subject.faculties)
                }
                {errors && this.renderErrors(errors)}
                {isLoading && this.renderLoadingIndicator()}

                {unassignFacultyModalIsShowing &&
                <UnassignSubjectModal
                    open={unassignFacultyModalIsShowing}
                    onClose={() => this.toggleUnassignFacultyModal(false)}
                    perspective="subject"
                    faculty={activeFaculty}
                    subject={subject}
                />
                }
            </ListItem>
        );
    }
}
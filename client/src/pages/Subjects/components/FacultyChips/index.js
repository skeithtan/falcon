import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { Component } from "react";
import { FacultyChip } from "../../../../components/FacultyChip";
import { UnassignSubjectModal } from "../../../../components/UnassignSubjectModal";


export class FacultyChips extends Component {
    state = {
        activeFaculty: null,
        unassignFacultyModalIsShowing: false,
    };

    toggleUnassignFacultyModal = shouldShow => this.setState({
        unassignFacultyModalIsShowing: shouldShow,
    });

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
                        showDeleteButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
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

    render() {
        const {subject} = this.props;
        const {activeFaculty, unassignFacultyModalIsShowing} = this.state;
        return (
            <ListItem divider>
                {this.renderChips(subject.faculties)}

                {activeFaculty &&
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
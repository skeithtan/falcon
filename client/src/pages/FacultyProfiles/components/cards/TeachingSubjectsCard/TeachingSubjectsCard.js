import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { SubjectChip } from "../../../../../components/SubjectChip";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { fetchTeachingSubjects } from "../../../../../services/faculty/teaching_subjects";
import { getFullName } from "../../../../../utils/user.util";
import { UnassignSubjectModal } from "../../modals/UnassignSubjectModal";


export class TeachingSubjectsCard extends Component {
    state = {
        teachingSubjects: null,
        errors: null,
        isLoading: true,
        activeSubject: null,
        removeSubjectModalIsShowing: false,
    };

    fetchData = () => {
        this.setState({errors: null, isLoading: true, teachingSubjects: null});
        fetchTeachingSubjects(this.props.faculty._id)
        // FIXME: Memory leak in this.setState when different faculty is selected before results arrive
            .then(result => this.setState({
                teachingSubjects: result.data.faculty.teachingSubjects,
                errors: null,
                isLoading: false,
            }))
            .catch(errors => this.setState({
                errors: errors,
                isLoading: false,
            }));
    };

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty.user)} does not have assigned teaching subjects.`}
                    smallMessage="Teaching subjects assigned will be shown here."
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Assign a subject" />
    );

    renderLoading = () => (
        <FullPageLoadingIndicator size={100} />
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.fetchData}
            message="An error occurred while trying to fetch list of teaching subjects"
            debug={errors[0]}
        />
    );

    // Not using redux means we have to take care of removals ourselves
    onSubjectRemoved = subject => this.setState({
        teachingSubjects: this.state.teachingSubjects.filter(teachingSubject => teachingSubject._id !== subject._id),
    });

    toggleRemoveSubjectModal = shouldShow => this.setState({
        removeSubjectModalIsShowing: shouldShow,
    });

    renderTeachingSubjects = teachingSubjects => {
        const teachingSubjectsIsEmpty = teachingSubjects.length === 0;
        const {activeSubject, removeSubjectModalIsShowing} = this.state;
        const {faculty, classes} = this.props;

        return (
            <ListItem>
                {!teachingSubjectsIsEmpty &&
                <Grid container spacing={8} className={classes.subjectList}>
                    {teachingSubjects.map(subject => (
                        <Grid item key={subject._id}>
                            <SubjectChip
                                clickable
                                subject={subject}
                                handleDelete={() => this.setState({
                                    activeSubject: subject,
                                    removeSubjectModalIsShowing: true,
                                })}
                            />
                        </Grid>
                    ))}
                </Grid>

                }

                {teachingSubjectsIsEmpty && this.renderEmptyState()}
                {activeSubject &&
                <UnassignSubjectModal
                    open={removeSubjectModalIsShowing}
                    onClose={() => this.toggleRemoveSubjectModal(false)}
                    subject={activeSubject}
                    faculty={faculty}
                    onSubjectRemoved={() => this.onSubjectRemoved(activeSubject)}
                />
                }
            </ListItem>
        );
    };

    onAddButtonClick = () => {
        //TODO
        console.log("Add teaching subject button clicked");
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.faculty._id !== this.props.faculty._id && !this.state.isLoading) {
            this.fetchData();
        }
    }

    render() {
        const {isLoading, errors, teachingSubjects} = this.state;

        return (
            <DetailCard>
                <TableToolbar tableTitle="Subjects of Expertise"
                              addButtonTooltipTitle="Assign a subject"
                              onAddButtonClick={this.onAddButtonClick} />
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {teachingSubjects && this.renderTeachingSubjects(teachingSubjects)}
            </DetailCard>
        );
    }
}

import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { SubjectChip } from "../../../../../components/SubjectChip";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { UnassignSubjectModal } from "../../../../../components/UnassignSubjectModal";
import { getFullName } from "../../../../../utils/user.util";
import { TeachingSubjectModal } from "../../modals/TeachingSubjectModal";


export class TeachingSubjectsCard extends Component {
    state = {
        activeSubject: null,
        removeSubjectModalIsShowing: false,
        teachingSubjectsModalIsShowing: false,
    };

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(this.props.faculty.user)} does not have assigned teaching subjects.`}
            smallMessage="Teaching subjects assigned will be shown here."
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Assign a subject"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    renderLoading = () => (
        <FullPageLoadingIndicator size={100} />
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchSubjectList}
            message="An error occurred while trying to fetch list of subjects"
            debug={errors[0]}
        />
    );

    toggleRemoveSubjectModal = shouldShow => this.setState({
        removeSubjectModalIsShowing: shouldShow,
    });

    toggleTeachingSubjectsModal = shouldShow => this.setState({
        teachingSubjectsModalIsShowing: shouldShow,
    });

    renderTeachingSubjects = faculty => {
        const teachingSubjectsIds = faculty.teachingSubjects;
        const teachingSubjectsIsEmpty = teachingSubjectsIds.length === 0;
        const {activeSubject, removeSubjectModalIsShowing, teachingSubjectsModalIsShowing} = this.state;
        const {classes, subjects: {subjects: subjectList}, user} = this.props;

        // Transform faculty teaching subject ID to actual subject using subjectList from redux
        const teachingSubjects = teachingSubjectsIds.map(id => subjectList.find(subject => subject._id === id));

        return (
            <ListItem>
                {!teachingSubjectsIsEmpty &&
                <Grid container spacing={8} className={classes.subjectList}>
                    {teachingSubjects.map(subject => (
                        <Grid item key={subject._id}>
                            <SubjectChip
                                clickable
                                subject={subject}
                                showDeleteButton={user.permissions.MUTATE_FACULTY_PROFILES}
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
                    perspective="faculty"
                    open={removeSubjectModalIsShowing}
                    onClose={() => this.toggleRemoveSubjectModal(false)}
                    subject={activeSubject}
                    faculty={faculty}
                />
                }

                <TeachingSubjectModal
                    action="update"
                    open={teachingSubjectsModalIsShowing}
                    onClose={() => this.toggleTeachingSubjectsModal(false)}
                    allSubjects={subjectList}
                    faculty={faculty}
                    teachingSubjects={teachingSubjectsIds}
                />
            </ListItem>
        );
    };

    onAddButtonClick = () => {
        const {subjects: {subjects}} = this.props;

        if (subjects) {
            // Do not show modal if neither is ready
            this.toggleTeachingSubjectsModal(true);
        }
    };

    componentDidMount() {
        const {
            fetchSubjectList,
            subjects: {isLoading, subjects},
        } = this.props;

        if (!subjects && !isLoading) {
            fetchSubjectList();
        }
    }

    render() {
        const {
            subjects: {
                isLoading,
                errors,
                subjects,
            },
            faculty,
        } = this.props;

        return (
            <DetailCard>
                <TableToolbar
                    tableTitle="Subjects of Expertise"
                    addButtonTooltipTitle="Assign a subject"
                    onAddButtonClick={this.onAddButtonClick}
                    showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
                />
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {subjects && this.renderTeachingSubjects(faculty)}
            </DetailCard>
        );
    }
}

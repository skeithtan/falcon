import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { SubjectChip } from "../../../../../components/SubjectChip";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { UnassignSubjectModal } from "../../../../../components/UnassignSubjectModal";
import { getFullName } from "../../../../../utils/user.util";
import { TeachingSubjectModal } from "../../modals/TeachingSubjectModal";
import { wrap } from "./wrapper";

class BaseTeachingSubjectsCard extends Component {
    state = {
        activeSubject: null,
        removeSubjectModalIsShowing: false,
        teachingSubjectsModalIsShowing: false,
    };

    get canMutate() {
        const { user } = this.props;
        return user.permissions.MUTATE_FACULTY_EXPERTISE;
    }

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(
                this.props.faculty.user
            )} does not have assigned teaching subjects.`}
            smallMessage="Teaching subjects assigned will be shown here."
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Assign a subject"
            showAddButton={this.canMutate}
        />
    );

    renderLoading = () => <FullPageLoadingIndicator size={100} />;

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchSubjectList}
            message="An error occurred while trying to fetch list of subjects"
            debug={errors[0]}
        />
    );

    toggleRemoveSubjectModal = shouldShow =>
        this.setState({
            removeSubjectModalIsShowing: shouldShow,
        });

    toggleTeachingSubjectsModal = shouldShow =>
        this.setState({
            teachingSubjectsModalIsShowing: shouldShow,
        });

    renderTeachingSubjects = faculty => {
        const teachingSubjectsIds = faculty.teachingSubjects;
        const teachingSubjectsIsEmpty = teachingSubjectsIds.length === 0;
        const {
            activeSubject,
            removeSubjectModalIsShowing,
            teachingSubjectsModalIsShowing,
        } = this.state;
        const {
            classes,
            subjects: { subjects: subjectList },
            user,
        } = this.props;

        // Transform faculty teaching subject ID to actual subject using subjectList from redux
        const teachingSubjects = teachingSubjectsIds.map(id =>
            subjectList.find(subject => subject._id === id)
        );

        console.log(teachingSubjectsIds, teachingSubjects);

        return (
            <ListItem>
                {!teachingSubjectsIsEmpty && (
                    <Grid container spacing={8} className={classes.subjectList}>
                        {teachingSubjects.map(subject => (
                            <Grid item key={subject._id}>
                                <SubjectChip
                                    clickable={
                                        user.permissions.VIEW_SUBJECTS_PAGE
                                    }
                                    subject={subject}
                                    showDeleteButton={this.canMutate}
                                    handleDelete={() =>
                                        this.setState({
                                            activeSubject: subject,
                                            removeSubjectModalIsShowing: true,
                                        })
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {teachingSubjectsIsEmpty && this.renderEmptyState()}
                {activeSubject && (
                    <UnassignSubjectModal
                        perspective="faculty"
                        open={removeSubjectModalIsShowing}
                        onClose={() => this.toggleRemoveSubjectModal(false)}
                        subject={activeSubject}
                        faculty={faculty}
                    />
                )}

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
        const {
            subjects: { subjects },
        } = this.props;

        if (subjects) {
            // Do not show modal if neither is ready
            this.toggleTeachingSubjectsModal(true);
        }
    };

    componentDidMount() {
        const {
            fetchSubjectList,
            subjects: { isLoading, subjects },
        } = this.props;

        if (!subjects && !isLoading) {
            fetchSubjectList();
        }
    }

    render() {
        const {
            subjects: { isLoading, errors, subjects },
            faculty,
        } = this.props;

        return (
            <Card>
                <TableToolbar
                    tableTitle="Subjects of Expertise"
                    addButtonTooltipTitle="Assign a subject"
                    onAddButtonClick={this.onAddButtonClick}
                    showAddButton={this.canMutate}
                />
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {subjects && this.renderTeachingSubjects(faculty)}
            </Card>
        );
    }
}

export const TeachingSubjectsCard = wrap(BaseTeachingSubjectsCard);

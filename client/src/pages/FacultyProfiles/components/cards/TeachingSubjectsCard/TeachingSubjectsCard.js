import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import FullPageLoadingIndicator from "../../../../../components/FullPageLoadingIndicator";
import EmptyState from "../../../../../components/states/EmptyState";
import ErrorState from "../../../../../components/states/ErrorState";
import TableRowActions from "../../../../../components/TableRowActions";
import TableToolbar from "../../../../../components/TableToolbar";
import { fetchTeachingSubjects } from "../../../../../services/faculty/teaching_subjects";
import { getFullName } from "../../../../../utils/user.util";
import UnassignSubjectModal from "../../modals/UnassignSubjectModal";


class TeachingSubjectRow extends Component {
    render() {
        const {subject, onRemoveButtonClick} = this.props;
        return (
            <TableRow>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableRowActions removeButtonTooltipTitle="Remove this subject"
                                 onRemoveButtonClick={onRemoveButtonClick} />
            </TableRow>
        );
    }
}

export default class TeachingSubjectsCard extends Component {
    state = {
        teachingSubjects: null,
        errors: null,
        isLoading: true,
        activeSubject: null,
        removeSubjectModalIsShowing: false,
    };

    renderRows = teachingSubjects => teachingSubjects.map(subject =>
        <TeachingSubjectRow
            subject={subject}
            key={subject._id}
            onRemoveButtonClick={() => this.setState({
                activeSubject: subject,
                removeSubjectModalIsShowing: true,
            })}
        />,
    );

    fetchData = () => {
        this.setState({errors: null, isLoading: true});
        fetchTeachingSubjects(this.props.faculty._id)
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
        const {faculty} = this.props;

        return (
            <div>
                {!teachingSubjectsIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell padding="none">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.renderRows(teachingSubjects)}
                    </TableBody>
                </Table>
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
            </div>
        );
    };

    onAddButtonClick = () => {
        //TODO
        console.log("Add teaching subject button clicked");
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {isLoading, errors, teachingSubjects} = this.state;

        return (
            <DetailCard>
                <TableToolbar tableTitle="Teaching Subjects Assignment"
                              addButtonTooltipTitle="Assign a teaching subject"
                              onAddButtonClick={this.onAddButtonClick} />
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
                {teachingSubjects && this.renderTeachingSubjects(teachingSubjects)}
            </DetailCard>
        );
    }
}

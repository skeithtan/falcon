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


class TeachingSubjectRow extends Component {
    onRemoveButtonClick = subject => {
        //TODO
        console.log(`Subject ${subject._id} remove button clicked`);
    };

    render() {
        const subject = this.props.subject;
        return (
            <TableRow>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableRowActions removeButtonTooltipTitle="Remove this subject"
                                 onRemoveButtonClick={() => this.onRemoveButtonClick(subject)} />
            </TableRow>
        );
    }
}

export default class TeachingSubjectsCard extends Component {
    state = {
        teachingSubjects: null,
        errors: null,
        isLoading: true,
    };

    renderRows = teachingSubjects => teachingSubjects.map(subject =>
        <TeachingSubjectRow subject={subject} key={subject._id} />,
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

    renderTeachingSubjects = teachingSubjects => {
        const teachingSubjectsIsEmpty = teachingSubjects.length === 0;
        return (
            <div>
                {!teachingSubjectsIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.renderRows(teachingSubjects)}
                    </TableBody>
                </Table>
                }

                {teachingSubjectsIsEmpty && this.renderEmptyState()}
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

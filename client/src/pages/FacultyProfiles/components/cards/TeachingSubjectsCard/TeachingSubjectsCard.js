import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import EmptyState from "../../../../../components/states/EmptyState";
import TableRowActions from "../../../../../components/TableRowActions";
import TableToolbar from "../../../../../components/TableToolbar";
import { getFullName } from "../../../../../utils/faculty";


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
    renderRows = teachingSubjects => teachingSubjects.map(subject =>
        <TeachingSubjectRow subject={subject} key={subject._id} />,
    );

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty)} does not have assigned teaching subjects.`}
                    smallMessage="Teaching subjects assigned will be shown here."
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Assign a subject" />
    );

    onAddButtonClick = () => {
        //TODO
        console.log("Add teaching subject button clicked");
    };

    render() {
        const faculty = this.props.faculty;
        //TODO: Sort by date
        const teachingSubjects = faculty.teachingSubjects;
        const teachingSubjectsIsEmpty = teachingSubjects.length === 0;
        return (
            <DetailCard>
                <TableToolbar tableTitle="Teaching Subjects Assignment"
                              addButtonTooltipTitle="Assign a teaching subject"
                              onAddButtonClick={this.onAddButtonClick} />
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
            </DetailCard>
        );
    }
}

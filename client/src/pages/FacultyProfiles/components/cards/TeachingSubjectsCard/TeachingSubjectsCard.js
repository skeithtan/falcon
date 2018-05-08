import React, { Component } from "react";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "material-ui/Table";

import { getFullName } from "../../../../../utils/faculty";
import DetailCard from "../../DetailCard";
import TableToolbar from "../../TableToolbar";
import EmptyState from "../../../../../components/states/EmptyState";

export default class TeachingSubjectsCard extends Component {

    rows = teachingSubjects => teachingSubjects.map(subject => (
        <TableRow key={subject._id}>
            <TableCell>{subject.code}</TableCell>
            <TableCell>{subject.name}</TableCell>
        </TableRow>
    ));

    emptyState = () => (
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
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.rows(teachingSubjects)}
                    </TableBody>
                </Table>
                }

                {teachingSubjectsIsEmpty && this.emptyState()}
            </DetailCard>
        );
    }
}

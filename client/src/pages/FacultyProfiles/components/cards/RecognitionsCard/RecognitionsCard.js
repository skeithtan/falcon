import React, { Component } from "react";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "material-ui/Table";

import { formatMonthYearDate, getFullName } from "../../../../../utils/faculty";
import DetailCard from "../../../../../components/DetailCard";
import TableToolbar from "../../../../../components/TableToolbar";
import FACULTY_ENUMS from "../../../../../enums/faculty.enums";
import EmptyState from "../../../../../components/states/EmptyState";

export default class RecognitionsCard extends Component {

    rows = recognitions => recognitions.map(recognition => (
        <TableRow key={recognition._id}>
            <TableCell>{recognition.title}</TableCell>
            <TableCell>{FACULTY_ENUMS.RECOGNITION.BASIS[recognition.basis]}</TableCell>
            <TableCell>{recognition.sponsor}</TableCell>
            <TableCell>{formatMonthYearDate(recognition.date)}</TableCell>
        </TableRow>
    ));

    emptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty)} does not have recorded recognitions.`}
                    smallMessage="Recognitions added will be shown here."
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add a recognition" />
    );

    onAddButtonClick = () => {
        //TODO
        console.log("Add recognition button clicked");
    };

    render() {
        const faculty = this.props.faculty;
        //TODO: Sort by date
        const recognitions = faculty.recognitions;
        const recognitionsIsEmpty = recognitions.length === 0;

        return (
            <DetailCard>
                <TableToolbar tableTitle="Recognitions"
                              addButtonTooltipTitle="Add a recognition"
                              onAddButtonClick={this.onAddButtonClick} />
                {!recognitionsIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Basis</TableCell>
                            <TableCell>Sponsor</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.rows(recognitions)}
                    </TableBody>
                </Table>
                }

                {recognitionsIsEmpty && this.emptyState()}
            </DetailCard>
        );
    }
}

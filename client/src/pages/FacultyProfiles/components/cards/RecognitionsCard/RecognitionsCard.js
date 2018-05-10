import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import EmptyState from "../../../../../components/states/EmptyState";
import TableRowActions from "../../../../../components/TableRowActions";
import TableToolbar from "../../../../../components/TableToolbar";
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate, getFullName } from "../../../../../utils/faculty";


class RecognitionRow extends Component {
    onUpdateButtonClick = recognition => {
        //TODO
        console.log(`Recognition ${recognition._id} edit button clicked`);
    };

    onRemoveButtonClick = recognition => {
        //TODO
        console.log(`Recognition ${recognition._id} remove button clicked`);
    };

    render() {
        const recognition = this.props.recognition;
        return (
            <TableRow>
                <TableCell>{recognition.title}</TableCell>
                <TableCell>{RECOGNITION.BASIS[recognition.basis]}</TableCell>
                <TableCell>{recognition.sponsor}</TableCell>
                <TableCell>{formatMonthYearDate(recognition.date)}</TableCell>
                <TableRowActions removeButtonTooltipTitle="Remove this recognition"
                                 updateButtonTooltipTitle="Update this recognition"
                                 onRemoveButtonClick={() => this.onRemoveButtonClick(recognition)}
                                 onUpdateButtonClick={() => this.onUpdateButtonClick(recognition)} />
            </TableRow>
        );
    }
}

export default class RecognitionsCard extends Component {
    renderRows = recognitions => recognitions.map(recognition =>
        <RecognitionRow recognition={recognition} key={recognition._id} />,
    );

    renderEmptyState = () => (
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
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.renderRows(recognitions)}
                    </TableBody>
                </Table>
                }

                {recognitionsIsEmpty && this.renderEmptyState()}
            </DetailCard>
        );
    }
}

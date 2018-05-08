import React, { Component } from "react";
import moment from "moment";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "material-ui/Table";

import { getFullName } from "../../../../../utils/faculty";
import DetailCard from "../../DetailCard";
import TableToolbar from "../../TableToolbar";
import FACULTY_ENUMS from "../../../../../enums/faculty.enums";
import EmptyState from "../../../../../components/states/EmptyState";

export default class RecognitionsCard extends Component {

    static recognitionDateFormatted(recognition) {
        const date = recognition.date;
        const dateString = `${date.month}-${date.year}`;
        return moment(dateString, "MM-YYYY").format("MMMM Y");
    }

    rows = recognitions => recognitions.map(recognition => (
        <TableRow key={recognition._id}>
            <TableCell>{recognition.title}</TableCell>
            <TableCell>{FACULTY_ENUMS.RECOGNITION.BASIS[recognition.basis]}</TableCell>
            <TableCell>{recognition.sponsor}</TableCell>
            <TableCell>{RecognitionsCard.recognitionDateFormatted(recognition)}</TableCell>
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
        const recognitions = faculty.recognitions;
        const recognitionsIsEmpty = recognitions.length === 0;

        return (
            <DetailCard>
                <TableToolbar tableTitle="Degrees"
                              addButtonTooltipTitle="Add a degree"
                              onAddButtonClick={this.onAddButtonClick} />
                {!recognitionsIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Basis</TableCell>
                            <TableCell>Sponsor</TableCell>
                            <TableCell numeric>Date</TableCell>
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

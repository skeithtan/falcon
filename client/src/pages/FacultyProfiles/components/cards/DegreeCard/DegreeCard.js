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
import FACULTY_ENUMS from "../../../../../enums/faculty.enums";
import EmptyState from "../../../../../components/states/EmptyState";

export default class DegreeCard extends Component {

    rows = degrees => degrees.map(degree => (
        //TODO: On click
        <TableRow key={degree._id}>
            <TableCell>{degree.title}</TableCell>
            <TableCell>{FACULTY_ENUMS.DEGREE.LEVEL[degree.level]}</TableCell>
            <TableCell>{degree.completionYear}</TableCell>
        </TableRow>
    ));

    emptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty)} does not have recorded degrees.`}
                    smallMessage="Degrees added will be shown here."
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add a degree" />
    );

    onAddButtonClick = () => {
        //TODO
        console.log("Add degree button clicked");
    };

    render() {
        const faculty = this.props.faculty;
        const degrees = faculty.degrees;
        const degreesIsEmpty = degrees.length === 0;

        return (
            <DetailCard>
                <TableToolbar tableTitle="Degrees"
                              addButtonTooltipTitle="Add a degree"
                              onAddButtonClick={this.onAddButtonClick} />
                {!degreesIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell numeric>Completion Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.rows(degrees)}
                    </TableBody>

                </Table>
                }

                {degreesIsEmpty && this.emptyState()}
            </DetailCard>
        );
    }
}
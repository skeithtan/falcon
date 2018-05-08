import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from "material-ui/Table";

import DetailCard from "../../DetailCard";
import TableToolbar from "../../TableToolbar";


export default class DegreeCard extends Component {

    onAddButtonClick = () => {
        //TODO
        console.log("Add degree button clicked");
    };

    render() {
        return (
            <DetailCard>
                <TableToolbar tableTitle="Degrees"
                              addButtonTooltipTitle="Add a degree"
                              onAddButtonClick={this.onAddButtonClick} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell numeric>Completion Year</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </DetailCard>
        );
    }
}
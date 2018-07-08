import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import React, { PureComponent } from "react";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";


export class OverviewPrintComponent extends PureComponent {
    render() {
        const {faculty} = this.props;
        const birthDate = moment(faculty.birthDate);
        const today = moment();
        const birthDateValue = `${birthDate.format("LL")} (${today.to(birthDate, true)})`;

        return (
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell variant="head" padding="none">ID Number</TableCell>
                        <TableCell padding="none">T-{faculty.idNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Employment Type</TableCell>
                        <TableCell padding="none">{EMPLOYMENT[faculty.employment].name} Faculty</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Email</TableCell>
                        <TableCell padding="none">{faculty.user.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Sex</TableCell>
                        <TableCell padding="none">{SEX[faculty.sex].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Date of Birth</TableCell>
                        <TableCell padding="none">{birthDateValue}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}
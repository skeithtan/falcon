import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React from "react";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";


export const OverviewPrintComponent = ({faculty}) => {
    const birthDate = moment(faculty.birthDate);
    const today = moment();
    const birthDateValue = `${birthDate.format("LL")} (${today.to(birthDate, true)})`;

    return (
        <Grid container spacing={16} direction="column">
            <Grid item>
                <Typography variant="title" component="h1">
                    {getFullName(faculty.user)}
                </Typography>
            </Grid>
            <Grid item>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell padding="none"><b>ID Number</b></TableCell>
                            <TableCell padding="none">T-{faculty.idNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none"><b>Employment Type</b></TableCell>
                            <TableCell padding="none">{EMPLOYMENT[faculty.employment].name} Faculty</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none"><b>Email</b></TableCell>
                            <TableCell padding="none">{faculty.user.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none"><b>Sex</b></TableCell>
                            <TableCell padding="none">{SEX[faculty.sex].name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none"><b>Date of Birth</b></TableCell>
                            <TableCell padding="none">{birthDateValue}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};
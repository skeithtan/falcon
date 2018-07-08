import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty.util";


export class RecognitionsPrintComponent extends PureComponent {
    renderRows = recognitions => recognitions.map(recognition =>
        <TableRow key={recognition._id}>
            <TableCell padding="none">{recognition.title}</TableCell>
            <TableCell>{RECOGNITION.BASIS[recognition.basis].name}</TableCell>
            <TableCell>{recognition.sponsor}</TableCell>
            <TableCell padding="none">{formatMonthYearDate(recognition.date)}</TableCell>
        </TableRow>,
    );

    render() {
        const {faculty} = this.props;
        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Typography variant="subheading">Recognitions</Typography>
                </Grid>

                {faculty.recognitions.length > 0 &&
                <Grid item>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="none">Title</TableCell>
                                <TableCell>Basis</TableCell>
                                <TableCell>Sponsor</TableCell>
                                <TableCell padding="none">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderRows(faculty.recognitions)}
                        </TableBody>
                    </Table>
                </Grid>
                }

                {faculty.recognitions.length === 0 &&
                <Grid item>
                    <Typography variant="caption" color="textSecondary">No recognitions recorded</Typography>
                </Grid>
                }
            </Grid>
        );
    }
}

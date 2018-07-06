import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { PRESENTATION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty.util";


export class PresentationsPrintComponent extends PureComponent {
    renderRows = presentations => presentations.map(presentation => (
        <Grid
            item
            xs={6}
            key={presentation._id}
        >
            <Typography variant="body2">{presentation.title}</Typography>

            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell variant="head" padding="none">Category</TableCell>
                        <TableCell padding="none">{PRESENTATION.CATEGORY[presentation.category].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Date</TableCell>
                        <TableCell padding="none">{formatMonthYearDate(presentation.date)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Sponsor</TableCell>
                        <TableCell padding="none">{presentation.sponsor}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Venue</TableCell>
                        <TableCell padding="none">{presentation.venue}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Conference</TableCell>
                        <TableCell padding="none">{presentation.conference}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Medium</TableCell>
                        <TableCell padding="none">{PRESENTATION.MEDIUM[presentation.medium].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Duration</TableCell>
                        <TableCell padding="none">{`${presentation.daysDuration} Days`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Grid>
    ));

    render() {
        const {faculty} = this.props;
        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Typography variant="subheading">Presentations</Typography>
                </Grid>

                {faculty.presentations.length > 0 &&
                <Grid item>
                    <Grid container spacing={16}>
                        {this.renderRows(faculty.presentations)}
                    </Grid>
                </Grid>
                }

                {faculty.presentations.length === 0 &&
                <Grid item>
                    <Typography variant="caption" color="textSecondary">No presentations recorded</Typography>
                </Grid>
                }
            </Grid>
        );
    }
}
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { DEGREE } from "../../../../../enums/faculty.enums";


export class DegreesPrintComponent extends PureComponent {
    renderRows = degrees => degrees.map(degree =>
        <TableRow key={degree._id}>
            <TableCell padding="none">{degree.title}</TableCell>
            <TableCell padding="none">{DEGREE.LEVEL[degree.level].name}</TableCell>
            <TableCell padding="none" numeric>{degree.completionYear}</TableCell>
        </TableRow>,
    );

    render() {
        const { faculty } = this.props;
        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Typography variant="subheading">Degrees</Typography>
                </Grid>

                {faculty.degrees.length > 0 &&
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="none">Title</TableCell>
                                    <TableCell padding="none">Level</TableCell>
                                    <TableCell padding="none" numeric>Completion Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderRows(faculty.degrees)}
                            </TableBody>
                        </Table>
                    </Grid>
                }

                {faculty.degrees.length === 0 &&
                    <Grid item>
                        <Typography variant="caption" color="textSecondary">No degrees recorded</Typography>
                    </Grid>
                }
            </Grid>
        );
    }
}

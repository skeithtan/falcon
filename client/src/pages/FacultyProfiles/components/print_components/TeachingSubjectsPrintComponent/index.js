import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";


export class TeachingSubjectsPrintComponent extends PureComponent {
    renderRows = (facultySubjects, allSubjects) =>
        facultySubjects
            .map(id => allSubjects.find(subject => subject._id === id))
            .map(subject =>
                <TableRow key={subject._id}>
                    <TableCell padding="none">{subject.code}</TableCell>
                    <TableCell padding="none">{subject.name}</TableCell>
                </TableRow>,
            );

    render() {
        const {faculty, subjects} = this.props;
        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Typography variant="subheading">Subjects of Expertise</Typography>
                </Grid>

                {faculty.teachingSubjects.length > 0 &&
                <Grid item>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="none">Code</TableCell>
                                <TableCell padding="none">Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderRows(faculty.teachingSubjects, subjects)}
                        </TableBody>
                    </Table>
                </Grid>
                }

                {faculty.teachingSubjects.length === 0 &&
                <Grid item>
                    <Typography variant="caption" color="textSecondary">No assigned subjects of expertise</Typography>
                </Grid>
                }
            </Grid>
        );
    }
}
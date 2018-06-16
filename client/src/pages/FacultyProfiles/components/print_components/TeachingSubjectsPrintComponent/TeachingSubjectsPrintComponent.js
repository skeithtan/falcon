import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";


const renderRows = (facultySubjects, allSubjects) =>
    facultySubjects
        .map(id => allSubjects.find(subject => subject._id === id))
        .map(subject =>
            <TableRow key={subject._id}>
                <TableCell padding="none">{subject.code}</TableCell>
                <TableCell padding="none">{subject.name}</TableCell>
            </TableRow>,
        );

export const TeachingSubjectsPrintComponent = ({faculty, subjects}) => (
    <div>
        <Typography variant="subheading">Subjects of Expertise</Typography>

        {faculty.teachingSubjects.length > 0 &&
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="none">Code</TableCell>
                    <TableCell padding="none">Title</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {renderRows(faculty.teachingSubjects, subjects)}
            </TableBody>
        </Table>
        }

        {faculty.teachingSubjects.length === 0 &&
        <Typography variant="caption" color="textSecondary">No assigned subjects of expertise</Typography>
        }
    </div>
);
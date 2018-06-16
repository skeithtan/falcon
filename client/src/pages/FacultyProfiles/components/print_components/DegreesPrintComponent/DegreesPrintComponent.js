import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { DEGREE } from "../../../../../enums/faculty.enums";


const renderRows = degrees => degrees.map(degree =>
    <TableRow key={degree._id}>
        <TableCell padding="none">{degree.title}</TableCell>
        <TableCell padding="none">{DEGREE.LEVEL[degree.level].name}</TableCell>
        <TableCell padding="none" numeric>{degree.completionYear}</TableCell>
    </TableRow>,
);

export const DegreesPrintComponent = ({faculty}) => (
    <div>
        <Typography variant="subheading">Degrees</Typography>

        {faculty.degrees.length > 0 &&
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="none">Title</TableCell>
                    <TableCell padding="none">Level</TableCell>
                    <TableCell padding="none" numeric>Completion Year</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {renderRows(faculty.degrees)}
            </TableBody>
        </Table>
        }

        {faculty.degrees.length === 0 &&
        <Typography variant="caption" color="textSecondary">No degrees recorded</Typography>
        }
    </div>
);
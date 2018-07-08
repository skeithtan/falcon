import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { INSTRUCTIONAL_MATERIAL } from "../../../../../enums/faculty.enums";


export class InstructionalMaterialsPrintComponent extends PureComponent {
    renderRows = instructionalMaterials => instructionalMaterials.map(instructionalMaterial => (
        <Grid
            item
            xs={6}
            key={instructionalMaterial._id}
        >
            <Typography variant="body2">{instructionalMaterial.title}</Typography>

            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell variant="head" padding="none">Medium</TableCell>
                        <TableCell
                            padding="none">{INSTRUCTIONAL_MATERIAL.MEDIUM[instructionalMaterial.medium].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Audience</TableCell>
                        <TableCell
                            padding="none">{INSTRUCTIONAL_MATERIAL.AUDIENCE[instructionalMaterial.audience].name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell variant="head" padding="none">Sponsor</TableCell>
                        <TableCell padding="none">{instructionalMaterial.usageYear}</TableCell>
                    </TableRow>

                    {instructionalMaterial.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.STUDENT.identifier &&
                    <TableRow>
                        <TableCell variant="head" padding="none">Student Level</TableCell>
                        <TableCell padding="none">{instructionalMaterial.level}</TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
        </Grid>
    ));

    render() {
        const {faculty} = this.props;
        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Typography variant="subheading">Instructional Materials</Typography>
                </Grid>

                {faculty.instructionalMaterials.length > 1 &&
                <Grid item>
                    <Grid container spacing={16}>
                        {this.renderRows(faculty.instructionalMaterials)}
                    </Grid>
                </Grid>
                }

                {faculty.instructionalMaterials.length === 0 &&
                <Grid item>
                    <Typography variant="caption" color="textSecondary">No instructional materials recorded</Typography>
                </Grid>
                }
            </Grid>
        );
    }
}


import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { EXTENSION_WORK } from "../../../../../enums/faculty.enums";


const extensionWorkRoles = roles => {
    return roles.length > 0 ?
        roles
            .map(role => EXTENSION_WORK.ROLES[role].name)
            .reduce((accumulator, currentValue) => `${accumulator}, ${currentValue}`) :
        <i>No extension work role recorded</i>;
};

const renderRows = extensionWorks => extensionWorks.map(extensionWork => (
    <Grid
        item
        xs={6}
        key={extensionWork._id}
    >
        <Typography variant="body2">{extensionWork.title}</Typography>

        <Table>
            <TableBody>
                <TableRow>
                    <TableCell variant="head" padding="none">Venue</TableCell>
                    <TableCell padding="none">{extensionWork.venue}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell variant="head" padding="none">Roles</TableCell>
                    <TableCell padding="none">{extensionWorkRoles(extensionWork.roles)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Grid>
));

export const ExtensionWorksPrintComponent = ({faculty}) => (
    <Grid container spacing={8} direction="column">
        <Grid item>
            <Typography variant="subheading">Extension Works</Typography>
        </Grid>

        {faculty.extensionWorks.length > 0 &&
        <Grid item>
            <Grid container spacing={16}>
                {renderRows(faculty.extensionWorks)}
            </Grid>
        </Grid>
        }

        {faculty.extensionWorks.length === 0 &&
        <Grid item>
            <Typography variant="caption" color="textSecondary">No extension works recorded.</Typography>
        </Grid>
        }
    </Grid>
);
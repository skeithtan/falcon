import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { PureComponent } from "react";

export class TableRowActions extends PureComponent {
    render() {
        const {
            onRemoveButtonClick,
            onUpdateButtonClick,
            removeButtonTooltipTitle,
            updateButtonTooltipTitle,
        } = this.props;

        return (
            <TableCell padding="none">
                <Grid container wrap="nowrap">
                    {onUpdateButtonClick &&
                        <Grid item>
                            <Tooltip disableFocusListener title={updateButtonTooltipTitle}>
                                <IconButton aria-label="update" onClick={onUpdateButtonClick}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    }

                    {onRemoveButtonClick &&
                        <Grid item>
                            <Tooltip disableFocusListener title={removeButtonTooltipTitle}>
                                <IconButton aria-label="remove" onClick={onRemoveButtonClick}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    }
                </Grid>
            </TableCell>
        );

    }
}

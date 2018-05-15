import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { Component } from "react";


class TableRowActions extends Component {
    render() {
        const {
            onRemoveButtonClick,
            onUpdateButtonClick,
            removeButtonTooltipTitle,
            updateButtonTooltipTitle,
        } = this.props;

        return (
            <TableCell>
                {onUpdateButtonClick &&
                <Tooltip title={updateButtonTooltipTitle}>
                    <IconButton aria-label="update" onClick={onUpdateButtonClick}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                }

                {onRemoveButtonClick &&
                <Tooltip title={removeButtonTooltipTitle}>
                    <IconButton aria-label="remove" onClick={onRemoveButtonClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                }
            </TableCell>
        );
    }
}

export default TableRowActions;

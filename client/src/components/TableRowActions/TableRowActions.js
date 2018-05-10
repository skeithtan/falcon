import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "material-ui/IconButton";
import { TableCell } from "material-ui/Table";
import Tooltip from "material-ui/Tooltip";
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
                {onRemoveButtonClick &&
                <Tooltip title={removeButtonTooltipTitle}>
                    <IconButton aria-label="remove" onClick={onRemoveButtonClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                }

                {onUpdateButtonClick &&
                <Tooltip title={updateButtonTooltipTitle}>
                    <IconButton aria-label="update" onClick={onUpdateButtonClick}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                }
            </TableCell>
        );
    }
}

export default TableRowActions;

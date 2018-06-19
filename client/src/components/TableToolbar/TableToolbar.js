import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";


export const TableToolbar = ({
    classes,
    tableTitle,
    onAddButtonClick,
    addButtonTooltipTitle,
    showAddButton,
}) => (
    <Toolbar>
        <div className={classes.titleWrapper}>
            <Typography variant="title">{tableTitle}</Typography>
        </div>
        <div>
            {showAddButton &&
            <Tooltip title={addButtonTooltipTitle} placement="left">
                <IconButton onClick={onAddButtonClick}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            }
        </div>
    </Toolbar>
);

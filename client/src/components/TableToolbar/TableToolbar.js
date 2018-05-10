import AddIcon from "@material-ui/icons/Add";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import React, { Component } from "react";


class TableToolbar extends Component {
    render() {
        const {classes, tableTitle, onAddButtonClick, addButtonTooltipTitle} = this.props;
        return (
            <Toolbar>
                <div className={classes.titleWrapper}>
                    <Typography variant="title">{tableTitle}</Typography>
                </div>
                <div>
                    <Tooltip title={addButtonTooltipTitle} placement="left">
                        <IconButton onClick={onAddButtonClick}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        );
    }
}

export default TableToolbar;

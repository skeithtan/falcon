import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseTableToolbar extends PureComponent {
    render() {
        const {
            classes,
            tableTitle,
            onAddButtonClick,
            addButtonTooltipTitle,
            showAddButton,
        } = this.props;

        return (
            <Toolbar>
                <div className={classes.titleWrapper}>
                    <Typography variant="title">{tableTitle}</Typography>
                </div>
                <div>
                    {showAddButton &&
                        <Tooltip disableFocusListener title={addButtonTooltipTitle} placement="left">
                            <IconButton onClick={onAddButtonClick}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </div>
            </Toolbar>
        );
    }
}

export const TableToolbar = wrap(BaseTableToolbar);
import { ListItem } from "material-ui/List";
import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

class DetailExpansionCardActions extends Component {
    render() {
        const {
            classes,
            onRemoveButtonClick,
            onUpdateButtonClick,
            removeButtonTooltipTitle,
            updateButtonTooltipTitle,
        } = this.props;

        return (
            <ListItem className={classes.actionButtonsWrapper}>
                <Tooltip title={removeButtonTooltipTitle}>
                    <IconButton aria-label="remove" onClick={onRemoveButtonClick}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={updateButtonTooltipTitle}>
                    <IconButton aria-label="update" onClick={onUpdateButtonClick}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
        );
    }
}

export default DetailExpansionCardActions;

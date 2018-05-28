import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { Component } from "react";


export class DetailExpansionCardActions extends Component {
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

            </ListItem>
        );
    }
}
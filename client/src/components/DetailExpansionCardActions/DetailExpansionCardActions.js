import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "material-ui/IconButton";
import { ListItem } from "material-ui/List";
import Tooltip from "material-ui/Tooltip";
import React, { Component } from "react";


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
            </ListItem>
        );
    }
}

export default DetailExpansionCardActions;

import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


export class BaseExpansionPanelActions extends PureComponent {
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
                    <Tooltip disableFocusListener title={updateButtonTooltipTitle}>
                        <IconButton aria-label="update" onClick={onUpdateButtonClick}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                }

                {onRemoveButtonClick &&
                    <Tooltip disableFocusListener title={removeButtonTooltipTitle}>
                        <IconButton aria-label="remove" onClick={onRemoveButtonClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }

            </ListItem>
        );
    }
}

export const ExpansionPanelActions = wrap(BaseExpansionPanelActions);
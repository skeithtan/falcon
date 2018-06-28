import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Folder from "@material-ui/icons/Folder";
import React from "react";
import { wrap } from "../common_state_wrapper";


const BaseEmptyState = ({
    classes,
    onAddButtonClick,
    addButtonText,
    bigMessage,
    smallMessage,
    showAddButton,
}) => (
    <div className={classes.blankState}>
        <div className={classes.messageWrapper}>
            <Folder className={`${classes.messageColor} ${classes.icon}`} />
            <Typography variant="headline" className={classes.messageColor}>
                {bigMessage}
            </Typography>
            <Typography variant="subheading" className={classes.messageColor}>
                {smallMessage}
            </Typography>

            {onAddButtonClick && showAddButton &&
            <Button color="primary" onClick={onAddButtonClick}>
                {addButtonText}
            </Button>
            }
        </div>
    </div>
);

export const EmptyState = wrap(BaseEmptyState);
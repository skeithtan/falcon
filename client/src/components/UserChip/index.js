import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { getFullName } from "../../utils/user.util";
import { UserAvatar } from "../UserAvatar";
import { wrap } from "./wrapper";


class BaseUserChip extends PureComponent {
    render() {
        const {classes, user, onClick, handleDelete, showDeleteButton} = this.props;
        return (
            <Chip
                className={classes.chip}
                classes={{label: classes.chipText}}
                avatar={<UserAvatar user={user} />}
                onClick={onClick}
                onDelete={showDeleteButton ? handleDelete : null}
                label={
                    <Typography
                        variant="body2"
                        className={classes.chipText}
                    >
                        {getFullName(user)}
                    </Typography>
                }
            />
        );
    }
}

export const UserChip = wrap(BaseUserChip);

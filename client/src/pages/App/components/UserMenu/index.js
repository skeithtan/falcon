import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import React, {PureComponent} from "react";
import { UserAvatar } from "../../../../components/UserAvatar";
import { USER_TYPES } from "../../../../enums/user.enums";
import { wrap } from "./wrapper";


const menuItemClickHandler = (onClick, onClose) => () => {
    onClick();
    onClose();
};

class BaseUserMenu extends PureComponent {
    render() {
        const {
            open,
            user,
            onClose,
            anchorEl,
            classes,
            onSignOutClick,
            onChangePasswordClick,
            user: {name: {first, last}, email, authorization},
        } = this.props;

        return (
            <Popover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
            >
                <div className={classes.currentUserDisplay}>
                    <UserAvatar user={user} />
        
                    <div className={classes.userDetails}>
                        <Typography className={classes.userFullName}>{first} {last}</Typography>
                        <Typography color="textSecondary">{email}</Typography>
                        <Typography color="textSecondary">{USER_TYPES[authorization].name}</Typography>
                    </div>
                </div>
        
                <Divider />
        
                <MenuItem onClick={menuItemClickHandler(onChangePasswordClick, onClose)}>Change my password</MenuItem>
                <MenuItem onClick={menuItemClickHandler(onSignOutClick, onClose)}>Sign out</MenuItem>
            </Popover>
        );
    }
}


export const UserMenu = wrap(BaseUserMenu);
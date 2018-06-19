import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { UserAvatar } from "../../../../components/UserAvatar/index";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { UserMenu } from "../UserMenu";


export class UserButton extends Component {
    state = {
        anchor: null,
        changePasswordModalIsShowing: false,
    };

    toggleMenu = (event) => this.setState({
        anchor: event === null ? null : event.currentTarget,
    });

    toggleChangePasswordModal = shouldShow => this.setState({
        changePasswordModalIsShowing: shouldShow,
    });

    renderAvatar = (user) => (
        <UserAvatar user={user} className={this.props.classes.avatar} onClick={this.toggleMenu} />
    );

    render() {
        const {anchor, changePasswordModalIsShowing} = this.state;
        const {classes, user} = this.props;
        const avatar = this.renderAvatar(user);
        return (
            <div className={classes.userButton}>
                <Typography className={classes.userNameDisplay}>{user.name.first}</Typography>

                {avatar}

                <UserMenu
                    user={user}
                    open={Boolean(anchor)}
                    anchorEl={anchor}
                    onChangePasswordClick={() => this.toggleChangePasswordModal(true)}
                    onSignOutClick={this.props.signOut}
                    onClose={() => this.toggleMenu(null)}
                />

                <ChangePasswordModal
                    action="update"
                    open={changePasswordModalIsShowing}
                    onClose={() => this.toggleChangePasswordModal(false)}
                />
            </div>
        );
    }
}
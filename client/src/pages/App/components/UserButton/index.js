import React, { Component } from "react";
import { UserChip } from "../../../../components/UserChip";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { UserMenu } from "../UserMenu";
import { wrap } from "./wrapper";


class BaseUserButton extends Component {
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

    render() {
        const {anchor, changePasswordModalIsShowing} = this.state;
        const {classes, user} = this.props;
        return (
            <div className={classes.userButton}>
                <UserChip user={user} onClick={this.toggleMenu} />

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

export const UserButton = wrap(BaseUserButton);
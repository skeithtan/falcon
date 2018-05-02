import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Menu, { MenuItem } from "material-ui/Menu";

import style from "./UserButton.css";

class UserMenu extends Component {
    render() {
        const {open, onClose, anchorEl, avatar} = this.props;
        const {name: {first, last}, email} = this.props.user;

        return (
            <Menu open={open} onClose={onClose} anchorEl={anchorEl}>

                <div id={style.currentUserDisplay}>
                    {avatar}

                    <div id={style.userDetails}>
                        <Typography id={style.userFullName}>{first} {last}</Typography>
                        <Typography id={style.userEmail}>{email}</Typography>
                    </div>
                </div>

                <MenuItem>Change Password</MenuItem>
                <MenuItem onClick={this.props.signOut}>Sign Out</MenuItem>
            </Menu>
        );
    }
}

export default class UserButton extends Component {
    state = {
        anchor: null,
    };

    toggleMenu = (event) => {
        this.setState({
            anchor: event === null ? null : event.currentTarget,
        });
    };

    //FIXME: Get real avatar
    avatar = (user) => {
        return <Avatar className={style.avatar} onClick={this.toggleMenu}>{user.name.first[0]}</Avatar>;
    };

    render() {
        const anchor = this.state.anchor;
        const user = this.props.user;
        const avatar = this.avatar(user);

        return (
            <div id={style.userButton}>
                <Typography id={style.userNameDisplay}>{user.name.first}</Typography>

                {avatar}

                <UserMenu user={user}
                          avatar={avatar}
                          open={Boolean(anchor)}
                          anchorEl={anchor}
                          signOut={this.props.signOut}
                          onClose={() => this.toggleMenu(null)} />
            </div>
        );
    }
}
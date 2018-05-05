import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import Typography from "material-ui/Typography";
import Menu, { MenuItem } from "material-ui/Menu";

class UserMenu extends Component {
    render() {
        const {open, onClose, anchorEl, avatar, classes} = this.props;
        const {name: {first, last}, email} = this.props.user;

        return (
            <Menu open={open} onClose={onClose} anchorEl={anchorEl}>

                <div className={classes.currentUserDisplay}>
                    {avatar}

                    <div className={classes.userDetails}>
                        <Typography className={classes.userFullName}>{first} {last}</Typography>
                        <Typography className={classes.userEmail}>{email}</Typography>
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
        return <Avatar className={this.props.classes.avatar} onClick={this.toggleMenu}>{user.name.first[0]}</Avatar>;
    };

    render() {
        const anchor = this.state.anchor;
        const {classes, user} = this.props;
        const avatar = this.avatar(user);

        return (
            <div className={classes.userButton}>
                <Typography className={classes.userNameDisplay}>{user.name.first}</Typography>

                {avatar}

                <UserMenu user={user}
                          classes={classes}
                          avatar={avatar}
                          open={Boolean(anchor)}
                          anchorEl={anchor}
                          signOut={this.props.signOut}
                          onClose={() => this.toggleMenu(null)} />
            </div>
        );
    }
}
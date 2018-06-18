import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { UserAvatar } from "../../../../components/UserAvatar/index";
import { UserMenu } from "../UserMenu";


export class UserButton extends Component {
    state = {
        anchor: null,
    };

    toggleMenu = (event) => {
        this.setState({
            anchor: event === null ? null : event.currentTarget,
        });
    };

    renderAvatar = (user) => (
        <UserAvatar user={user} className={this.props.classes.avatar} onClick={this.toggleMenu} />
    );

    render() {
        const anchor = this.state.anchor;
        const {classes, user} = this.props;
        const avatar = this.renderAvatar(user);
        return (
            <div className={classes.userButton}>
                <Typography className={classes.userNameDisplay}>{user.name.first}</Typography>

                {avatar}

                <UserMenu
                    user={user}
                    classes={classes}
                    avatar={avatar}
                    open={Boolean(anchor)}
                    anchorEl={anchor}
                    signOut={this.props.signOut}
                    onClose={() => this.toggleMenu(null)}
                />
            </div>
        );
    }
}
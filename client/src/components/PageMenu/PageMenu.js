import React, { Component } from "react";
import Menu, { MenuItem } from "material-ui/Menu";

import { MODULE_PAGES } from "../../pages/pages";

export default class PageMenu extends Component {
    switchToPage = page => {
        this.props.history.push(page.route);
        this.props.toggle();
    };

    //TODO: Add user permissions
    menuItems = MODULE_PAGES.map(page =>
        <MenuItem onClick={() => this.switchToPage(page)} key={page.identifier}>{page.name}</MenuItem>,
    );

    render() {
        return (
            <Menu open={this.props.open} onClose={this.props.toggle}>
                {this.menuItems}
            </Menu>
        );
    }
}
import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemText } from "material-ui/List";

import { MODULE_PAGES } from "../../pages/pages";
import pnuLogo from "../../images/pnu-logo.png";


export default class PageDrawer extends Component {
    switchToPage = page => {
        this.props.history.push(page.route);
        this.props.onClose();
    };

    pageItems = MODULE_PAGES.map(page =>
        <ListItem button key={page.identifier} onClick={() => this.switchToPage(page)}>
            <ListItemText primary={page.name} />
        </ListItem>,
    );

    render() {

        const {open, onClose, classes} = this.props;

        return (
            <Drawer open={open} onClose={onClose}>
                <div className={classes.drawer}>

                    <div className={classes.drawerHeadWrapper}>
                        <img src={pnuLogo} alt="PNU Logo" className={classes.pnuLogo} />
                    </div>


                    <List>
                        {this.pageItems}
                    </List>
                </div>
            </Drawer>
        );
    }
}
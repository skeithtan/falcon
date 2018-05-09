import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import { Link } from "react-router-dom";
import List, { ListItem, ListItemText } from "material-ui/List";

import { MODULE_PAGES } from "../../pages/pages";
import pnuLogo from "../../images/pnu-logo.png";


export default class PageDrawer extends Component {
    pageItems = MODULE_PAGES.map(page =>
        <Link to={page.path}
              style={{textDecoration: "none"}}
              key={page.identifier}
              onClick={this.props.onClose}>
            <ListItem button >
                <ListItemText primary={page.name} />
            </ListItem>
        </Link>,
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
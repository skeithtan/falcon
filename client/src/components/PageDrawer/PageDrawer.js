import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import pnuLogo from "../../images/pnu-logo.png";
import { getPagesForUserType } from "../../pages";


export class PageDrawer extends Component {
    renderPageItems = pages => pages.map(page => {
        const {classes, onClose, history, activePageIdentifier} = this.props;
        const isActivePage = page.identifier === activePageIdentifier;
        let className = classes.pageItem;

        if (isActivePage) {
            className += " active";
        }

        return (
            <ListItem
                button
                className={className}
                key={page.identifier}
                onClick={() => {
                    history.push("/" + page.path);
                    onClose();
                }}>
                <ListItemText primary={page.name} className={classes.pageItemText}/>
            </ListItem>
        )
    });

    render() {
        const {open, onClose, classes, user} = this.props;
        const pages = getPagesForUserType(user.authorization);

        console.log(user);

        return (
            <Drawer open={open} onClose={onClose}>
                <div className={classes.drawer}>

                    <Grid
                        container
                        className={classes.drawerHeadWrapper}
                        spacing={8}
                        direction="column"
                    >
                        <Grid item>
                            <img src={pnuLogo} alt="PNU Logo" className={classes.pnuLogo} />
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                            >
                                <Grid item>
                                    <Typography className={classes.falconLogo}>Falcon</Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="caption" className={classes.subtitles}>
                                        Philippine Normal University
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="caption" className={classes.subtitles}>
                                        Faculty of Arts and Languages
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <List className={classes.pageItemsContainer}>
                        {this.renderPageItems(pages)}
                    </List>
                </div>
            </Drawer>
        );
    }
}
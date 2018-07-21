import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import pnuLogo from "../../../../images/pnu-logo.png";
import { getPagesForUser } from "../../../../utils/user.util";
import { getPageFromPath } from "../../..";
import { wrap } from "./wrapper";


class PageDrawerPageItems extends PureComponent {
    render() {
        const {pages, classes, onClose, history, match} = this.props;
        return pages.map(page => {
            const activePage = getPageFromPath(match.params.currentPage);
            const isActivePage = page.identifier === activePage.identifier;
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
                    <ListItemText primary={page.name} className={classes.pageItemText} />
                </ListItem>
            );
        });
    }
}

class BasePageDrawer extends PureComponent {
    render() {
        const {open, onClose, classes, user, match, history} = this.props;
        return (
            <Drawer open={open} onClose={onClose}>
                <div className={classes.drawerContent}>
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
                        <PageDrawerPageItems
                            pages={getPagesForUser(user)}
                            match={match}
                            classes={classes}
                            history={history}
                            onClose={onClose}
                        />
                    </List>
                </div>
            </Drawer>
        );
    }
}

export const PageDrawer = wrap(BasePageDrawer);
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export class NotificationItem extends PureComponent {
    render() {
        const { renderText, renderAvatar, url, onClose } = this.props;
        return (
            <ListItem
                button
                component={Link}
                to={url}
                onClick={onClose}
            >
                <Grid container spacing={16} direction="row" wrap="nowrap" alignItems="center">
                    {renderAvatar && <Grid item>
                        {renderAvatar()}
                    </Grid>
                    }
                    <Grid item>
                        {renderText()}
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
}
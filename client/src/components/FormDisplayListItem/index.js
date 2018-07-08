import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";


export class FormDisplayListItem extends PureComponent {
    render() {
        const {field, value} = this.props;
        return (
            <ListItem divider>
                <Grid container>
                    <Grid item sm zeroMinWidth>
                        <Typography variant="body2">{field}</Typography>
                    </Grid>
                    <Grid item sm={9} zeroMinWidth>
                        {typeof value === "object" ?
                            value :
                            <Typography>{value}</Typography>
                        }
                    </Grid>
                </Grid>
            </ListItem>
        );

    }
}

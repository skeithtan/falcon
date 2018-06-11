import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";


export class OverviewCard extends Component {
    render() {
        const {subject, classes} = this.props;
        return (
            <DetailCard>
                <ListItem>
                    <Grid
                        container
                        className={classes.overviewTitleContainer}
                        spacing={8}
                        direction="column"
                    >
                        <Grid item>
                            <Typography variant="title">
                                {subject.code}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading">
                                {subject.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </DetailCard>
        );
    }
}
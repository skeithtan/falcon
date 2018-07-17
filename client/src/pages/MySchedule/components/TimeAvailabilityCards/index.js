import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MEETING_DAYS, MEETING_HOURS } from "../../../../enums/class.enums";
import { wrap } from "./wrapper";
import { AvailabilitySquare } from "../AvailabilitySquare";

class BaseTimeAvailabilityCards extends Component {
    renderCardHeader = () => (
        <Grid
            className={this.props.classes.cardColumnHead}
            container
            direction="row"
            wrap="nowrap"
        >
            {Object.values(MEETING_HOURS).map(({ name, identifier }) => (
                <Grid item xs={2} key={identifier}>
                    <Typography color="textSecondary" align="center">
                        {name}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );

    renderCardBody = meetingDayIdentifier => (
        <Grid
            container
            className={this.props.classes.availabilitySquaresContainer}
            direction="row"
            wrap="nowrap"
        >
            {Object.values(MEETING_HOURS).map(({ identifier }) => (
                <Grid item xs={2} key={identifier}>
                    <AvailabilitySquare
                        checked={this.props.availability[
                            meetingDayIdentifier
                        ].includes(identifier)}
                        onClick={() =>
                            this.props.onChange(
                                meetingDayIdentifier,
                                identifier
                            )
                        }
                    />
                </Grid>
            ))}
        </Grid>
    );

    render() {
        return (
            <Grid
                container
                direction="column"
                spacing={16}
                wrap="nowrap"
                alignItems="stretch"
            >
                {Object.values(MEETING_DAYS).map(({ identifier, name }) => (
                    <Grid item key={identifier}>
                        <Card>
                            <Toolbar>
                                <Typography variant="title">{name}</Typography>
                            </Toolbar>
                            {this.renderCardHeader()}
                            <Divider />
                            {this.renderCardBody(identifier)}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export const TimeAvailabilityCards = wrap(BaseTimeAvailabilityCards);

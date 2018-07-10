import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseFacultiesCard extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.facultiesCardContainer}>
                <Toolbar>
                    <Typography variant="title">
                        Faculties
                    </Typography>
                </Toolbar>
                <CardContent>

                </CardContent>
            </Card>
        )
    }
}
export const FacultiesCard = wrap(BaseFacultiesCard);
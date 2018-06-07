import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { PureComponent } from "react";
import { HOME_PAGE } from "../index";


export class NotFoundPage extends PureComponent {
    componentDidMount() {
        document.title = "Page Not Found - Falcon";
    }

    render() {
        const {classes, history} = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.messageGrid}>
                    <h1 className={classes.sadFace}>:(</h1>
                    <h1 className={classes.bigMessage}>Oopsie Whoopsie</h1>
                    <h1 className={classes.smallMessage}>This page could not be found.</h1>
                    <Grid container spacing={8}>
                        <Grid item>
                            <Button
                                variant="raised"
                                onClick={() => history.goBack()}>
                                Go to previous page
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="raised"
                                onClick={() => history.push(HOME_PAGE.path)}>
                                Take me home
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}


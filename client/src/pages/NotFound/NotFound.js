import Button from "@material-ui/core/Button";
import React from "react";
import { HOME_PAGE } from "../index";


export const NotFoundPage = ({classes, history}) => (
    <div className={classes.container}>
        <div className={classes.messageGrid}>
            <h1 className={classes.sadFace}>:(</h1>
            <h1 className={classes.bigMessage}>Oopsie Whoopsie</h1>
            <h1 className={classes.smallMessage}>This page could not be found.</h1>

            <div>
                <Button variant="raised"
                        onClick={() => history.push(HOME_PAGE.path)}>
                    Take me home
                </Button>
            </div>
        </div>
    </div>
);

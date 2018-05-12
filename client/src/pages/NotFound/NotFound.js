import Button from "material-ui/Button";
import React, { Component } from "react";
import { HOME_PAGE } from "../index";


export default class NotFoundPage extends Component {
    render() {
        const {classes, history} = this.props;
        console.log(this.props);
        return (
            <div className={classes.container}>
                <div className={classes.messageGrid}>
                    <h1 className={classes.emoji}>💩</h1>
                    <h1 className={classes.bigMessage}>Oopsie Whoopsie</h1>
                    <h1 className={classes.smallMessage}>We made a fucky wucky!! A wittle fucko boingo! The code monkeys
                        at
                        our headquarters are working VEWY HAWD to fix this!</h1>

                    <h4>Error: Page not found</h4>
                    <div>
                        <Button variant="raised"
                                onClick={() => history.push(HOME_PAGE.path)}>
                            Take me home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
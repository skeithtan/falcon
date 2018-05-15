import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import FormDisplayListItem from "../../../../../../../components/FormDisplayListItem";


export default class ReviewForm extends Component {
    render() {
        const {firstName, lastName, email, password} = this.props.form;
        const fullName = `${firstName} ${lastName}`;

        return [
            <Typography key={0} variant="body1">
                Upon signing in for the first time, {fullName} will be
                prompted to change their password for security reasons.
            </Typography>,

            <Typography key={1} variant="body1">
                <b>Save this temporary password somewhere else</b> as this will be the last time it will be
                displayed.
            </Typography>,

            <List key={2} className={this.props.classes.reviewForm}>
                <FormDisplayListItem field="Email Address" value={email} />
                <FormDisplayListItem field="Password" value={password} />
            </List>,
        ];
    }
}

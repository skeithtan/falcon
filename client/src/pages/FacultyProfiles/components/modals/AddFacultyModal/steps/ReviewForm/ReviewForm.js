import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormDisplayListItem } from "../../../../../../../components/FormDisplayListItem";
import { SEX } from "../../../../../../../enums/faculty.enums";


export const ReviewForm = ({
    form: {firstName, lastName, email, password, sex},
    classes,
}) => {
    const fullName = `${firstName} ${lastName}`;
    const pronoun = sex === SEX.M.identifier ? "his" : "her";

    return [
        <Typography key={0} variant="body1">
            Upon signing in for the first time, {fullName} will be
            prompted to change {pronoun} password for security reasons.
        </Typography>,

        <Typography key={1} variant="body1">
            <b>Save this temporary password somewhere else</b> as this will be the last time it will be
            displayed.
        </Typography>,

        <List key={2} className={classes.reviewForm}>
            <FormDisplayListItem field="Email Address" value={email} />
            <FormDisplayListItem field="Password" value={password} />
        </List>,
    ];
};

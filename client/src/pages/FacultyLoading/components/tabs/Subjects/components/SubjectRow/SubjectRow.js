import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component } from "react";
import DetailExpansionCard from "../../../../../../../components/DetailExpansionCard";
import DetailExpansionCardActions from "../../../../../../../components/DetailExpansionCardActions";
import FormDisplayExpansionPanelDetails from "../../../../../../../components/FormDisplayExpansionPanelDetails";
import FacultyChips from "../FacultyChips";


export default class SubjectRow extends Component {
    render() {
        const {subject, onUpdateButtonClick} = this.props;
        console.log(subject);
        return (
            <DetailExpansionCard>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            <Typography variant="body2">{subject.code}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">{subject.name}</Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>

                <FormDisplayExpansionPanelDetails>

                    <FacultyChips subjectFaculties={subject.faculties}/>

                    <DetailExpansionCardActions
                        updateButtonTooltipTitle="Update subject"
                        onUpdateButtonClick={onUpdateButtonClick}
                    />

                </FormDisplayExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}
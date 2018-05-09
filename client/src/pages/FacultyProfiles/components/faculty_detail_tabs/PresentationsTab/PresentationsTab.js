import React, { Component } from "react";
import { ExpansionPanelSummary, ExpansionPanelDetails } from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import { ListItem } from "material-ui/List";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import DetailCard from "../../../../../components/DetailCard";
import DetailExpansionCard from "../../../../../components/DetailExpansionCard";
import DetailExpansionCardActions
    from "../../../../../components/DetailExpansionCardActions";
import FormDisplayListItem from "../../../../../components/FormDisplayListItem";
import TableToolbar from "../../../../../components/TableToolbar";
import FACULTY_ENUMS from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty";

class PresentationsTab extends Component {

    onAddButtonClick = () => {
        //TODO
        console.log("Add presentation button clicked");
    };

    rows = presentations => presentations.map(presentation => (
        <DetailExpansionCard key={presentation._id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{presentation.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={this.props.classes.expansionPanelDetails}>
                <FormDisplayListItem field="Category"
                                     value={FACULTY_ENUMS.PRESENTATION.CATEGORY[presentation.category]} />
                <FormDisplayListItem field="Date"
                                     value={formatMonthYearDate(presentation.date)} />
                <FormDisplayListItem field="Sponsor"
                                     value={presentation.sponsor} />
                <FormDisplayListItem field="Venue"
                                     value={presentation.venue} />
                <FormDisplayListItem field="Conference"
                                     value={presentation.conference} />
                <FormDisplayListItem field="Medium"
                                     value={FACULTY_ENUMS.PRESENTATION.MEDIUM[presentation.medium]} />
                <FormDisplayListItem field="Duration"
                                     value={`${presentation.daysDuration} Days`} />
                <DetailExpansionCardActions removeButtonTooltipTitle="Remove presentation"
                                            updateButtonTooltipTitle="Update presentation details" />
            </ExpansionPanelDetails>
        </DetailExpansionCard>
    ));

    render() {
        const {faculty, classes} = this.props;
        const presentations = faculty.presentations;
        const presentationsIsEmpty = presentations.length === 0;

        return (
            <div className={classes.expansionCards}>
                <DetailCard>
                    <TableToolbar tableTitle="Presentations"
                                  addButtonTooltipTitle="Add a presentation"
                                  onAddButtonClick={this.onAddButtonClick} />
                </DetailCard>

                {!presentationsIsEmpty && this.rows(presentations)}
            </div>
        );
    }
}

export default PresentationsTab;

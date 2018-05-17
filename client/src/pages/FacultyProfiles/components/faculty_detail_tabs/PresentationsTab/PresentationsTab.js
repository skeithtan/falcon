import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import DetailExpansionCard from "../../../../../components/DetailExpansionCard";
import DetailExpansionCardActions from "../../../../../components/DetailExpansionCardActions";
import FormDisplayExpansionPanelDetails from "../../../../../components/FormDisplayExpansionPanelDetails";
import FormDisplayListItem from "../../../../../components/FormDisplayListItem";
import EmptyState from "../../../../../components/states/EmptyState";
import TableToolbar from "../../../../../components/TableToolbar";
import { PRESENTATION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty";
import { getFullName } from "../../../../../utils/user";
import PresentationModal from "../../modals/PresentationModal";


class PresentationRow extends Component {
    onUpdateButtonClick = presentation => {
        //TODO
        console.log(`Presentation ${presentation._id} edit button clicked`);
    };

    onRemoveButtonClick = presentation => {
        //TODO
        console.log(`Presentation ${presentation._id} remove button clicked`);
    };

    render() {
        const {presentation} = this.props;
        return (
            <DetailExpansionCard>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{presentation.title}</Typography>
                </ExpansionPanelSummary>

                <FormDisplayExpansionPanelDetails>

                    <FormDisplayListItem field="Category"
                                         value={PRESENTATION.CATEGORY[presentation.category].name} />
                    <FormDisplayListItem field="Date"
                                         value={formatMonthYearDate(presentation.date)} />
                    <FormDisplayListItem field="Sponsor"
                                         value={presentation.sponsor} />
                    <FormDisplayListItem field="Venue"
                                         value={presentation.venue} />
                    <FormDisplayListItem field="Conference"
                                         value={presentation.conference} />
                    <FormDisplayListItem field="Medium"
                                         value={PRESENTATION.MEDIUM[presentation.medium].name} />
                    <FormDisplayListItem field="Duration"
                                         value={`${presentation.daysDuration} Days`} />
                    <DetailExpansionCardActions removeButtonTooltipTitle="Remove presentation"
                                                updateButtonTooltipTitle="Update presentation details"
                                                onRemoveButtonClick={() => this.onRemoveButtonClick(presentation)}
                                                onUpdateButtonClick={() => this.onUpdateButtonClick(presentation)} />

                </FormDisplayExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}

class PresentationsTab extends Component {
    state = {
        presentationModalIsShowing: false,
        activePresentation: null,
        removePresentationIsShowing: false,
    };

    togglePresentationModal = shouldShow => this.setState({
        presentationModalIsShowing: shouldShow,
    });

    toggleRemovePresentation = shouldShow => this.setState({
        removePresentationIsShowing: shouldShow,
    });

    onAddButtonClick = () => this.setState({
        activePresentation: null,
        presentationModalIsShowing: true,
    });

    renderRows = presentations => presentations.map(presentation =>
        <PresentationRow
            presentation={presentation}
            key={presentation._id}

            onUpdateButtonClick={() => this.setState({
                activePresentation: presentation,
                presentationModalIsShowing: true,
            })}

            onRemoveButtonClick={() => this.setState({
                activePresentation: presentation,
                removePresentationIsShowing: true,
            })}
        />,
    );

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded presentations`}
                    smallMessage="Presentations added will be shown here"
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add a presentation" />
    );

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
                    {presentationsIsEmpty && this.renderEmptyState()}
                </DetailCard>

                {!presentationsIsEmpty && this.renderRows(presentations)}

                <PresentationModal
                    action={this.state.activePresentation ? "update" : "add"}
                    open={this.state.presentationModalIsShowing}
                    onClose={() => this.togglePresentationModal(false)}
                    presentation={this.state.activePresentation}
                    faculty={faculty}
                />
            </div>
        );
    }
}

export default PresentationsTab;

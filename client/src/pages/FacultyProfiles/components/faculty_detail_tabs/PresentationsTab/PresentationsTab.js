import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { DetailExpansionCard } from "../../../../../components/DetailExpansionCard";
import { DetailExpansionCardActions } from "../../../../../components/DetailExpansionCardActions";
import { FormDisplayExpansionPanelDetails } from "../../../../../components/FormDisplayExpansionPanelDetails";
import { FormDisplayListItem } from "../../../../../components/FormDisplayListItem";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { PRESENTATION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty.util";
import { getFullName } from "../../../../../utils/user.util";
import { PresentationModal } from "../../modals/PresentationModal";
import { RemovePresentationModal } from "../../modals/RemovePresentationModal";


class PresentationRow extends Component {
    render() {
        const {presentation, onUpdateButtonClick, onRemoveButtonClick} = this.props;
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
                                                onRemoveButtonClick={onRemoveButtonClick}
                                                onUpdateButtonClick={onUpdateButtonClick} />

                </FormDisplayExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}

export class PresentationsTab extends Component {
    state = {
        presentationModalIsShowing: false,
        activePresentation: null,
        removePresentationModalIsShowing: false,
    };

    togglePresentationModal = shouldShow => this.setState({
        presentationModalIsShowing: shouldShow,
    });

    toggleRemovePresentation = shouldShow => this.setState({
        removePresentationModalIsShowing: shouldShow,
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
                removePresentationModalIsShowing: true,
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
        const {activePresentation, presentationModalIsShowing, removePresentationModalIsShowing} = this.state;
        const presentations = faculty.presentations;
        const presentationsIsEmpty = presentations.length === 0;
        return (
            <div className={classes.expansionCardsContainer}>
                <DetailCard>
                    <TableToolbar tableTitle="Presentations"
                                  addButtonTooltipTitle="Add a presentation"
                                  onAddButtonClick={this.onAddButtonClick} />
                    {presentationsIsEmpty && this.renderEmptyState()}
                </DetailCard>

                {!presentationsIsEmpty && this.renderRows(presentations)}

                {presentationModalIsShowing &&
                <PresentationModal
                    action={activePresentation ? "update" : "add"}
                    open={presentationModalIsShowing}
                    onClose={() => this.togglePresentationModal(false)}
                    presentation={activePresentation}
                    faculty={faculty}
                />
                }

                {removePresentationModalIsShowing &&
                <RemovePresentationModal
                    open={removePresentationModalIsShowing}
                    onClose={() => this.toggleRemovePresentation(false)}
                    presentation={activePresentation}
                    faculty={faculty}
                />
                }
            </div>
        );
    }
}

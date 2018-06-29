import Card from "@material-ui/core/Card";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component } from "react";
import { FormDisplayExpansionPanelDetails } from "../../../../../components/FormDisplayExpansionPanelDetails";
import { FormDisplayListItem } from "../../../../../components/FormDisplayListItem";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { PRESENTATION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty.util";
import { getFullName } from "../../../../../utils/user.util";
import { ExpansionPanelActions } from "../../ExpansionPanelActions";
import { PresentationModal } from "../../modals/PresentationModal";
import { RemovePresentationModal } from "../../modals/RemovePresentationModal";
import { wrap } from "./wrapper";


class BasePresentationsTab extends Component {
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
        <ExpansionPanel key={presentation._id}>

            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" color="primary">{presentation.title}</Typography>
            </ExpansionPanelSummary>

            <FormDisplayExpansionPanelDetails>

                <FormDisplayListItem
                    field="Category"
                    value={PRESENTATION.CATEGORY[presentation.category].name}
                />
                <FormDisplayListItem
                    field="Date"
                    value={formatMonthYearDate(presentation.date)}
                />
                <FormDisplayListItem
                    field="Sponsor"
                    value={presentation.sponsor}
                />
                <FormDisplayListItem
                    field="Venue"
                    value={presentation.venue}
                />
                <FormDisplayListItem
                    field="Conference"
                    value={presentation.conference}
                />
                <FormDisplayListItem
                    field="Medium"
                    value={PRESENTATION.MEDIUM[presentation.medium].name}
                />
                <FormDisplayListItem
                    field="Duration"
                    value={`${presentation.daysDuration} Days`}
                />

                {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
                <ExpansionPanelActions
                    removeButtonTooltipTitle="Remove presentation"
                    updateButtonTooltipTitle="Update presentation details"
                    onUpdateButtonClick={() => this.setState({
                        activePresentation: presentation,
                        presentationModalIsShowing: true,
                    })}

                    onRemoveButtonClick={() => this.setState({
                        activePresentation: presentation,
                        removePresentationModalIsShowing: true,
                    })}
                />
                }
            </FormDisplayExpansionPanelDetails>
        </ExpansionPanel>,
    );

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded presentations`}
            smallMessage="Presentations added will be shown here"
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Add a presentation"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    render() {
        const {faculty, classes, user} = this.props;
        const {activePresentation, presentationModalIsShowing, removePresentationModalIsShowing} = this.state;
        const presentations = faculty.presentations;
        const presentationsIsEmpty = presentations.length === 0;
        return (
            <div className={classes.expansionCardsContainer}>
                <Card>
                    <TableToolbar
                        tableTitle="Presentations"
                        addButtonTooltipTitle="Add a presentation"
                        onAddButtonClick={this.onAddButtonClick}
                        showAddButton={user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE}
                    />
                    {presentationsIsEmpty && this.renderEmptyState()}
                </Card>

                {!presentationsIsEmpty && this.renderRows(presentations)}

                {(user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE) &&
                <PresentationModal
                    action={activePresentation ? "update" : "add"}
                    open={presentationModalIsShowing}
                    onClose={() => this.togglePresentationModal(false)}
                    presentation={activePresentation}
                    faculty={faculty}
                />
                }

                {activePresentation &&
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

export const PresentationsTab = wrap(BasePresentationsTab);
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpansionPanelSummary } from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import DetailExpansionCard from "../../../../../components/DetailExpansionCard";
import DetailExpansionCardActions from "../../../../../components/DetailExpansionCardActions";
import FormDisplayExpansionPanelDetails from "../../../../../components/FormDisplayExpansionPanelDetails";
import FormDisplayListItem from "../../../../../components/FormDisplayListItem";
import EmptyState from "../../../../../components/states/EmptyState";
import TableToolbar from "../../../../../components/TableToolbar";
import { EXTENSION_WORK } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user";


class ExtensionWorkRow extends Component {
    onUpdateButtonClick = extensionWork => {
        //TODO
        console.log(`Extension work ${extensionWork._id} edit button clicked`);
    };

    onRemoveButtonClick = extensionWork => {
        //TODO
        console.log(`Extension work ${extensionWork._id} remove button clicked`);
    };

    extensionWorkRolesText = roles => {
        if (roles.length === 0) {
            return "There are no extension roles";
        }

        function reducer(accumulator, currentString) {
            return `${accumulator}, ${currentString}`;
        }

        return roles
            .map(roleCode => EXTENSION_WORK.ROLES[roleCode])
            .reduce(reducer);
    };

    render() {
        const {extensionWork} = this.props;

        return (
            <DetailExpansionCard>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{extensionWork.title}</Typography>
                </ExpansionPanelSummary>

                <FormDisplayExpansionPanelDetails>

                    <FormDisplayListItem field="Venue"
                                         value={extensionWork.venue} />

                    <FormDisplayListItem field="Roles"
                                         value={this.extensionWorkRolesText(extensionWork.roles)} />

                    <DetailExpansionCardActions removeButtonTooltipTitle="Remove instructional material"
                                                updateButtonTooltipTitle="Update instructional material details"
                                                onRemoveButtonClick={() =>
                                                    this.onRemoveButtonClick(extensionWork)}
                                                onUpdateButtonClick={() =>
                                                    this.onUpdateButtonClick(extensionWork)} />

                </FormDisplayExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}

class ExtensionWorksTab extends Component {
    renderRows = extensionWorks => extensionWorks.map(extensionWork =>
        <ExtensionWorkRow extensionWork={extensionWork} key={extensionWork._id} classes={this.props.classes} />,
    );

    onAddButtonClick = () => {
        //TODO
        console.log("Add extension work button clicked");
    };

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded extension works`}
                    smallMessage="Extension works added will be shown here"
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add an extension work" />
    );

    render() {
        const {faculty, classes} = this.props;
        const extensionWorks = faculty.extensionWorks;
        const extensionWorksIsEmpty = extensionWorks.length === 0;
        return (
            <div className={classes.expansionCards}>
                <DetailCard>
                    <TableToolbar tableTitle="Extension Works"
                                  addButtonTooltipTitle="Add an extension work"
                                  onAddButtonClick={this.onAddButtonClick} />
                    {extensionWorksIsEmpty && this.renderEmptyState()}
                </DetailCard>

                {!extensionWorksIsEmpty && this.renderRows(extensionWorks)}
            </div>
        );
    }
}

export default ExtensionWorksTab;

import Chip from "@material-ui/core/Chip";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
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
import { EXTENSION_WORK } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import ExtensionWorkModal from "../../modals/ExtensionWorkModal";
import RemoveExtensionWorkModal from "../../modals/RemoveExtensionWorkModal";


class ExtensionWorkRow extends Component {
    renderExtensionWorkRoles = roles => (
        <Grid container spacing={8}>
            {roles.map(role => (
                <Grid item key={role}>
                    <Chip label={EXTENSION_WORK.ROLES[role].name} />
                </Grid>
            ))}
        </Grid>
    );

    render() {
        const {extensionWork, onRemoveButtonClick, onUpdateButtonClick} = this.props;
        return (
            <DetailExpansionCard>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{extensionWork.title}</Typography>
                </ExpansionPanelSummary>

                <FormDisplayExpansionPanelDetails>

                    <FormDisplayListItem field="Venue"
                                         value={extensionWork.venue} />

                    {extensionWork.roles.length > 0 &&
                    <FormDisplayListItem field="Roles"
                                         value={this.renderExtensionWorkRoles(extensionWork.roles)} />
                    }

                    {extensionWork.roles.length === 0 &&
                    <FormDisplayListItem field="Roles"
                                         value={<i>No roles</i>} />
                    }

                    <DetailExpansionCardActions removeButtonTooltipTitle="Remove instructional material"
                                                updateButtonTooltipTitle="Update instructional material details"
                                                onRemoveButtonClick={onRemoveButtonClick}
                                                onUpdateButtonClick={onUpdateButtonClick} />

                </FormDisplayExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}

class ExtensionWorksTab extends Component {
    state = {
        extensionWorkModalIsShowing: false,
        activeExtensionWork: null,
        removeExtensionWorkModalIsShowing: false,
    };

    toggleExtensionWorkModal = shouldShow => this.setState({
        extensionWorkModalIsShowing: shouldShow,
    });

    toggleRemoveExtensionWorkModal = shouldShow => this.setState({
        removeExtensionWorkModalIsShowing: shouldShow,
    });

    renderRows = extensionWorks => extensionWorks.map(extensionWork =>
        <ExtensionWorkRow
            extensionWork={extensionWork}
            key={extensionWork._id}
            classes={this.props.classes}

            onUpdateButtonClick={() => this.setState({
                activeExtensionWork: extensionWork,
                extensionWorkModalIsShowing: true,
            })}

            onRemoveButtonClick={() => this.setState({
                activeExtensionWork: extensionWork,
                removeExtensionWorkModalIsShowing: true,
            })}
        />,
    );

    onAddButtonClick = () => this.setState({
        activeExtensionWork: null,
        extensionWorkModalIsShowing: true,
    });

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
        const {extensionWorkModalIsShowing, activeExtensionWork, removeExtensionWorkModalIsShowing} = this.state;

        return (
            <div className={classes.expansionCards}>
                <DetailCard>
                    <TableToolbar tableTitle="Extension Works"
                                  addButtonTooltipTitle="Add an extension work"
                                  onAddButtonClick={this.onAddButtonClick} />
                    {extensionWorksIsEmpty && this.renderEmptyState()}
                </DetailCard>

                {!extensionWorksIsEmpty && this.renderRows(extensionWorks)}

                <ExtensionWorkModal
                    action={activeExtensionWork ? "update" : "add"}
                    extensionWork={activeExtensionWork}
                    faculty={faculty}
                    open={extensionWorkModalIsShowing}
                    onClose={() => this.toggleExtensionWorkModal(false)}
                />

                {activeExtensionWork &&
                <RemoveExtensionWorkModal
                    extensionWork={activeExtensionWork}
                    faculty={faculty}
                    open={removeExtensionWorkModalIsShowing}
                    onClose={() => this.toggleRemoveExtensionWorkModal(false)}
                />
                }

            </div>
        );
    }
}

export default ExtensionWorksTab;

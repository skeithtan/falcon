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
import { EXTENSION_WORK } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import ExtensionWorkModal from "../../modals/ExtensionWorkModal";
import RemoveExtensionWorkModal from "../../modals/RemoveExtensionWorkModal";


class ExtensionWorkRow extends Component {
    extensionWorkRolesText = roles => {
        if (roles.length === 0) {
            return <i>No extension work roles</i>;
        }

        function reducer(accumulator, currentString) {
            return `${accumulator}, ${currentString}`;
        }

        return roles
            .map(roleCode => EXTENSION_WORK.ROLES[roleCode].name)
            .reduce(reducer);
    };

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

                    <FormDisplayListItem field="Roles"
                                         value={this.extensionWorkRolesText(extensionWork.roles)} />

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

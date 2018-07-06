import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { Component, PureComponent } from "react";
import { FormDisplayExpansionPanelDetails } from "../../../../../components/FormDisplayExpansionPanelDetails";
import { FormDisplayListItem } from "../../../../../components/FormDisplayListItem";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { EXTENSION_WORK } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import { ExpansionPanelActions } from "../../ExpansionPanelActions";
import { ExtensionWorkModal } from "../../modals/ExtensionWorkModal";
import { RemoveExtensionWorkModal } from "../../modals/RemoveExtensionWorkModal";
import { wrap } from "./wrapper";


export class ExtensionWorkRoles extends PureComponent {
    render() {
        const {roles} = this.props;
        if (roles.length === 0) {
            return (
                <Typography>
                    <i>There are no assigned roles</i>
                </Typography>
            );
        }

        return (
            <Grid container spacing={8}>
                {roles.map(role => (
                    <Grid item key={role}>
                        <Chip label={EXTENSION_WORK.ROLES[role].name} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

class BaseExtensionWorksTab extends Component {
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
        <ExpansionPanel key={extensionWork._id}>

            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" color="primary">{extensionWork.title}</Typography>
            </ExpansionPanelSummary>

            <FormDisplayExpansionPanelDetails>

                <FormDisplayListItem
                    field="Venue"
                    value={extensionWork.venue}
                />

                <FormDisplayListItem
                    field="Roles"
                    value={<ExtensionWorkRoles roles={extensionWork.roles} />}
                />

                {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
                <ExpansionPanelActions
                    removeButtonTooltipTitle="Remove instructional material"
                    updateButtonTooltipTitle="Update instructional material details"

                    onUpdateButtonClick={() => this.setState({
                        activeExtensionWork: extensionWork,
                        extensionWorkModalIsShowing: true,
                    })}

                    onRemoveButtonClick={() => this.setState({
                        activeExtensionWork: extensionWork,
                        removeExtensionWorkModalIsShowing: true,
                    })}
                />
                }

            </FormDisplayExpansionPanelDetails>
        </ExpansionPanel>,
    );

    onAddButtonClick = () => this.setState({
        activeExtensionWork: null,
        extensionWorkModalIsShowing: true,
    });

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded extension works`}
            smallMessage="Extension works added will be shown here"
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Add an extension work"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    render() {
        const {faculty, classes, user} = this.props;
        const extensionWorks = faculty.extensionWorks;
        const extensionWorksIsEmpty = extensionWorks.length === 0;
        const {extensionWorkModalIsShowing, activeExtensionWork, removeExtensionWorkModalIsShowing} = this.state;

        return (
            <div className={classes.expansionCardsContainer}>
                <Card>
                    <TableToolbar
                        tableTitle="Extension Works"
                        addButtonTooltipTitle="Add an extension work"
                        onAddButtonClick={this.onAddButtonClick}
                        showAddButton={user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE}
                    />
                    {extensionWorksIsEmpty && this.renderEmptyState()}
                </Card>

                {!extensionWorksIsEmpty && this.renderRows(extensionWorks)}

                {(user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE) &&
                <ExtensionWorkModal
                    action={activeExtensionWork ? "update" : "add"}
                    extensionWork={activeExtensionWork}
                    faculty={faculty}
                    open={extensionWorkModalIsShowing}
                    onClose={() => this.toggleExtensionWorkModal(false)}
                />
                }

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

export const ExtensionWorksTab = wrap(BaseExtensionWorksTab);
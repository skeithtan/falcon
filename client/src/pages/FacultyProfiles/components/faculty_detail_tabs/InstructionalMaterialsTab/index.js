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
import { INSTRUCTIONAL_MATERIAL } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import { ExpansionPanelActions } from "../../ExpansionPanelActions";
import { InstructionalMaterialModal } from "../../modals/InstructionalMaterialModal";
import { RemoveInstructionalMaterialModal } from "../../modals/RemoveInstructionalMaterialModal";
import { wrap } from "./wrapper";


class BaseInstructionalMaterialsTab extends Component {
    state = {
        instructionalMaterialModalIsShowing: false,
        activeInstructionalMaterial: null,
        removeInstructionalMaterialModalIsShowing: false,
    };

    toggleInstructionalMaterialModal = shouldShow => this.setState({
        instructionalMaterialModalIsShowing: shouldShow,
    });

    toggleRemoveInstructionalMaterialModal = shouldShow => this.setState({
        removeInstructionalMaterialModalIsShowing: shouldShow,
    });

    onAddButtonClick = () => this.setState({
        activeInstructionalMaterial: null,
        instructionalMaterialModalIsShowing: true,
    });

    renderRows = instructionalMaterials => instructionalMaterials.map(instructionalMaterial =>
        <ExpansionPanel key={instructionalMaterial._id}>

            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" color="primary">{instructionalMaterial.title}</Typography>
            </ExpansionPanelSummary>

            <FormDisplayExpansionPanelDetails>

                <FormDisplayListItem
                    field="Medium"
                    value={INSTRUCTIONAL_MATERIAL.MEDIUM[instructionalMaterial.medium].name}
                />
                <FormDisplayListItem
                    field="Audience"
                    value={INSTRUCTIONAL_MATERIAL.AUDIENCE[instructionalMaterial.audience].name}
                />
                <FormDisplayListItem
                    field="Usage Year"
                    value={instructionalMaterial.usageYear}
                />

                {/*Student exclusive stuff*/}
                {instructionalMaterial.audience === INSTRUCTIONAL_MATERIAL.AUDIENCE.STUDENT.identifier &&
                <FormDisplayListItem
                    field="Student Level"
                    value={instructionalMaterial.level}
                />
                }

                {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
                <ExpansionPanelActions
                    removeButtonTooltipTitle="Remove instructional material"
                    updateButtonTooltipTitle="Update instructional material details"
                    onUpdateButtonClick={() => this.setState({
                        activeInstructionalMaterial: instructionalMaterial,
                        instructionalMaterialModalIsShowing: true,
                    })}

                    onRemoveButtonClick={() => this.setState({
                        activeInstructionalMaterial: instructionalMaterial,
                        removeInstructionalMaterialModalIsShowing: true,
                    })}
                />
                }

            </FormDisplayExpansionPanelDetails>
        </ExpansionPanel>,
    );

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded instructional materials`}
            smallMessage="Instructional materials added will be shown here"
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Add an instructional material"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    render() {
        const {faculty, classes, user} = this.props;
        const instructionalMaterials = faculty.instructionalMaterials;
        const instructionalMaterialsIsEmpty = instructionalMaterials.length === 0;

        const {
            activeInstructionalMaterial,
            instructionalMaterialModalIsShowing,
            removeInstructionalMaterialModalIsShowing,
        } = this.state;

        return (
            <div className={classes.expansionCardsContainer}>
                <Card>
                    <TableToolbar
                        tableTitle="Instructional Materials"
                        addButtonTooltipTitle="Add an instructional material"
                        onAddButtonClick={this.onAddButtonClick}
                        showAddButton={user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE}
                    />
                    {instructionalMaterialsIsEmpty && this.renderEmptyState()}
                </Card>

                {!instructionalMaterialsIsEmpty && this.renderRows(instructionalMaterials)}

                {(user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE) &&
                <InstructionalMaterialModal
                    action={activeInstructionalMaterial ? "update" : "add"}
                    open={instructionalMaterialModalIsShowing}
                    onClose={() => this.toggleInstructionalMaterialModal(false)}
                    instructionalMaterial={activeInstructionalMaterial}
                    faculty={faculty}
                />
                }

                {activeInstructionalMaterial &&
                <RemoveInstructionalMaterialModal
                    open={removeInstructionalMaterialModalIsShowing}
                    onClose={() => this.toggleRemoveInstructionalMaterialModal(false)}
                    instructionalMaterial={activeInstructionalMaterial}
                    faculty={faculty}
                />
                }
            </div>
        );
    }
}

export const InstructionalMaterialsTab = wrap(BaseInstructionalMaterialsTab);
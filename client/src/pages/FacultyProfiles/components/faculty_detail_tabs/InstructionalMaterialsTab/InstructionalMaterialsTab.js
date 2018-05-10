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
import { INSTRUCTIONAL_MATERIAL } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/faculty";


class InstructionalMaterialRow extends Component {
    onUpdateButtonClick = instructionalMaterial => {
        //TODO
        console.log(`Instructional material ${instructionalMaterial._id} edit button clicked`);
    };

    onRemoveButtonClick = instructionalMaterial => {
        //TODO
        console.log(`Instructional material ${instructionalMaterial._id} remove button clicked`);
    };

    render() {
        const {instructionalMaterial} = this.props;

        return (
            <DetailExpansionCard>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{instructionalMaterial.title}</Typography>
                </ExpansionPanelSummary>

                <FormDisplayExpansionPanelDetails>

                    <FormDisplayListItem field="Medium"
                                         value={INSTRUCTIONAL_MATERIAL.MEDIUM[instructionalMaterial.medium]} />
                    <FormDisplayListItem field="Classification"
                                         value={INSTRUCTIONAL_MATERIAL.CLASSIFICATION[instructionalMaterial.classification]} />
                    <FormDisplayListItem field="Usage Year"
                                         value={instructionalMaterial.usageYear} />

                    {/*Student exclusive stuff*/}
                    {instructionalMaterial.classification === INSTRUCTIONAL_MATERIAL.CLASSIFICATION.STUDENT &&
                    <FormDisplayListItem field="Level"
                                         value={instructionalMaterial.level} />
                    }

                    {/*Student exclusive stuff*/}
                    {instructionalMaterial.medium === INSTRUCTIONAL_MATERIAL.MEDIUM.NON_PRINT &&
                    <FormDisplayListItem field="Type"
                                         value={INSTRUCTIONAL_MATERIAL.NON_PRINT_TYPES[instructionalMaterial.nonPrintType]} />
                    }

                    <DetailExpansionCardActions removeButtonTooltipTitle="Remove instructional material"
                                                updateButtonTooltipTitle="Update instructional material details"
                                                onRemoveButtonClick={() =>
                                                    this.onRemoveButtonClick(instructionalMaterial)}
                                                onUpdateButtonClick={() =>
                                                    this.onUpdateButtonClick(instructionalMaterial)} />

                </FormDisplayExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}

class InstructionalMaterialsTab extends Component {
    onAddButtonClick = () => {
        //TODO
        console.log("Add instructional material button clicked");
    };

    renderRows = instructionalMaterials => instructionalMaterials.map(instructionalMaterial =>
        <InstructionalMaterialRow instructionalMaterial={instructionalMaterial} key={instructionalMaterial._id} />,
    );

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty)} does not have recorded instructional materials`}
                    smallMessage="Instructional materials added will be shown here"
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add an instructional material" />
    );

    render() {
        const {faculty, classes} = this.props;
        const instructionalMaterials = faculty.instructionalMaterials;
        const instructionalMaterialsIsEmpty = instructionalMaterials.length === 0;
        return (
            <div className={classes.expansionCards}>
                <DetailCard>
                    <TableToolbar tableTitle="Instructional Materials"
                                  addButtonTooltipTitle="Add an instructional material"
                                  onAddButtonClick={this.onAddButtonClick} />
                    {instructionalMaterialsIsEmpty && this.renderEmptyState()}
                </DetailCard>

                {!instructionalMaterialsIsEmpty && this.renderRows(instructionalMaterials)}
            </div>
        );
    }
}

export default InstructionalMaterialsTab;

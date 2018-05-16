import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import EmptyState from "../../../../../components/states/EmptyState";
import TableRowActions from "../../../../../components/TableRowActions";
import TableToolbar from "../../../../../components/TableToolbar";
import { DEGREE } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user";
import DegreeModal from "../../modals/DegreeModal";


class DegreeRow extends Component {
    render() {
        const {degree, onUpdateButtonClick, onRemoveButtonClick} = this.props;
        return (
            <TableRow>
                <TableCell>{degree.title}</TableCell>
                <TableCell>{DEGREE.LEVEL[degree.level].name}</TableCell>
                <TableCell numeric>{degree.completionYear}</TableCell>
                <TableRowActions removeButtonTooltipTitle="Remove this degree"
                                 updateButtonTooltipTitle="Update this degree"
                                 onRemoveButtonClick={onRemoveButtonClick}
                                 onUpdateButtonClick={onUpdateButtonClick} />
            </TableRow>
        );
    }
}

export default class DegreeCard extends Component {
    state = {
        degreeFormModalIsShowing: false,
        activeDegree: null,
    };

    toggleDegreeFormModal = () => {
        this.setState({
            degreeFormModalIsShowing: !this.state.degreeFormModalIsShowing,
        });
    };

    renderRows = degrees => degrees.map(degree =>
        <DegreeRow degree={degree} key={degree._id}
                   onUpdateButtonClick={() => {
                       this.setState({
                           activeDegree: degree,
                       });

                       this.toggleDegreeFormModal();
                   }}
                   onRemoveButtonClick={() => {
                       this.setState({
                           activeDegree: degree,
                       });

                       // TODO
                       console.log("Remove button clicked");
                   }}
        />,
    );

    onAddButtonClick = () => {
        this.setState({
            activeDegree: null,
        });

        this.toggleDegreeFormModal();
    };

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded degrees.`}
                    smallMessage="Degrees added will be shown here."
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add a degree" />
    );

    render() {
        const faculty = this.props.faculty;
        const degrees = faculty.degrees;
        const degreesIsEmpty = degrees.length === 0;
        return (
            <DetailCard>
                <TableToolbar tableTitle="Degrees"
                              addButtonTooltipTitle="Add a degree"
                              onAddButtonClick={this.onAddButtonClick} />
                {!degreesIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell numeric>Completion Year</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRows(degrees)}
                    </TableBody>

                </Table>
                }

                {degreesIsEmpty && this.renderEmptyState()}

                <DegreeModal action={this.state.activeDegree ? "update" : "add"}
                             degree={this.state.activeDegree}
                             open={this.state.degreeFormModalIsShowing}
                             onClose={this.toggleDegreeFormModal}
                             faculty={faculty} />
            </DetailCard>
        );
    }
}
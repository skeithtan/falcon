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
    onUpdateButtonClick = degree => {
        //TODO
        console.log(`Degree ${degree._id} edit button clicked`);
    };

    onRemoveButtonClick = degree => {
        //TODO
        console.log(`Degree ${degree._id} remove button clicked`);
    };

    render() {
        const degree = this.props.degree;
        return (
            <TableRow>
                <TableCell>{degree.title}</TableCell>
                <TableCell>{DEGREE.LEVEL[degree.level].name}</TableCell>
                <TableCell numeric>{degree.completionYear}</TableCell>
                <TableRowActions removeButtonTooltipTitle="Remove this recognition"
                                 updateButtonTooltipTitle="Update this recognition"
                                 onRemoveButtonClick={() => this.onRemoveButtonClick(degree)}
                                 onUpdateButtonClick={() => this.onUpdateButtonClick(degree)} />
            </TableRow>
        );
    }
}

export default class DegreeCard extends Component {
    state = {
        addDegreeModalIsShowing: false,
    };

    toggleAddDegreeModal = () => {
        this.setState({
            addDegreeModalIsShowing: !this.state.addDegreeModalIsShowing,
        });
    };

    renderRows = degrees => degrees.map(degree =>
        <DegreeRow degree={degree} key={degree._id} />,
    );

    renderEmptyState = () => (
        <EmptyState bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded degrees.`}
                    smallMessage="Degrees added will be shown here."
                    onAddButtonClick={this.toggleAddDegreeModal}
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
                              onAddButtonClick={this.toggleAddDegreeModal} />
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

                <DegreeModal action="add"
                             open={this.state.addDegreeModalIsShowing}
                             onClose={this.toggleAddDegreeModal}
                             faculty={faculty} />
            </DetailCard>
        );
    }
}
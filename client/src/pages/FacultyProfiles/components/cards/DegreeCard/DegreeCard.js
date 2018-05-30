import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { TableRowActions } from "../../../../../components/TableRowActions";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { DEGREE } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import { DegreeModal } from "../../modals/DegreeModal";
import { RemoveDegreeModal } from "../../modals/RemoveDegreeModal";


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

export class DegreeCard extends Component {
    state = {
        degreeModalIsShowing: false,
        activeDegree: null,
        removeDegreeModalIsShowing: false,
    };

    toggleDegreeFormModal = shouldShow => {
        this.setState({
            degreeModalIsShowing: shouldShow,
        });
    };

    toggleRemoveDegreeModal = shouldShow => {
        this.setState({
            removeDegreeModalIsShowing: shouldShow,
        });
    };

    renderRows = degrees => degrees.map(degree =>
        <DegreeRow
            degree={degree}
            key={degree._id}

            onUpdateButtonClick={() => this.setState({
                activeDegree: degree,
                degreeModalIsShowing: true,
            })}

            onRemoveButtonClick={() => this.setState({
                activeDegree: degree,
                removeDegreeModalIsShowing: true,
            })}
        />,
    );

    onAddButtonClick = () => this.setState({
        activeDegree: null,
        degreeModalIsShowing: true,
    });

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

        const {activeDegree, degreeModalIsShowing, removeDegreeModalIsShowing} = this.state;

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
                            <TableCell padding="none">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRows(degrees)}
                    </TableBody>

                </Table>
                }

                {degreesIsEmpty && this.renderEmptyState()}

                {degreeModalIsShowing &&
                <DegreeModal
                    action={activeDegree ? "update" : "add"}
                    degree={activeDegree}
                    open={degreeModalIsShowing}
                    onClose={() => this.toggleDegreeFormModal(false)}
                    faculty={faculty}
                />
                }

                {removeDegreeModalIsShowing &&
                <RemoveDegreeModal
                    open={removeDegreeModalIsShowing}
                    onClose={() => this.toggleRemoveDegreeModal(false)}
                    degree={activeDegree}
                    faculty={faculty}
                />
                }
            </DetailCard>
        );
    }
}
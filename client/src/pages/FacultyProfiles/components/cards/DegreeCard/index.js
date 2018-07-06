import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { TableRowActions } from "../../../../../components/TableRowActions";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { DEGREE } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import { DegreeModal } from "../../modals/DegreeModal";
import { RemoveDegreeModal } from "../../modals/RemoveDegreeModal";
import { wrap } from "./wrapper";


class BaseDegreeCard extends Component {
    state = {
        degreeModalIsShowing: false,
        activeDegree: null,
        removeDegreeModalIsShowing: false,
    };

    toggleDegreeFormModal = shouldShow => this.setState({
        degreeModalIsShowing: shouldShow,
    });

    toggleRemoveDegreeModal = shouldShow => this.setState({
        removeDegreeModalIsShowing: shouldShow,
    });

    renderRows = degrees => degrees.map(degree =>
        <TableRow key={degree._id}>
            <TableCell>{degree.title}</TableCell>
            <TableCell>{DEGREE.LEVEL[degree.level].name}</TableCell>
            <TableCell>{degree.completionYear}</TableCell>

            {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
            <TableRowActions removeButtonTooltipTitle="Remove this degree"
                             updateButtonTooltipTitle="Update this degree"
                             onRemoveButtonClick={() => this.setState({
                                 activeDegree: degree,
                                 removeDegreeModalIsShowing: true,
                             })}
                             onUpdateButtonClick={() => this.setState({
                                 activeDegree: degree,
                                 degreeModalIsShowing: true,
                             })} />
            }
        </TableRow>,
    );

    onAddButtonClick = () => this.setState({
        activeDegree: null,
        degreeModalIsShowing: true,
    });

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded degrees.`}
            smallMessage="Degrees added will be shown here."
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Add a degree"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    renderDegreesTable = (degrees, user) => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Completion Year</TableCell>

                    {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
                    <TableCell padding="none">Actions</TableCell>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {this.renderRows(degrees, user)}
            </TableBody>
        </Table>
    );

    render() {
        const {faculty, user} = this.props;
        const degrees = faculty.degrees;
        const degreesIsEmpty = degrees.length === 0;

        const {activeDegree, degreeModalIsShowing, removeDegreeModalIsShowing} = this.state;

        return (
            <Card>
                <TableToolbar
                    tableTitle="Degrees"
                    addButtonTooltipTitle="Add a degree"
                    onAddButtonClick={this.onAddButtonClick}
                    showAddButton={user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE}
                />
                {!degreesIsEmpty && this.renderDegreesTable(degrees, user)}
                {degreesIsEmpty && this.renderEmptyState()}

                {(user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE) &&
                <DegreeModal
                    action={activeDegree ? "update" : "add"}
                    degree={activeDegree}
                    open={degreeModalIsShowing}
                    onClose={() => this.toggleDegreeFormModal(false)}
                    faculty={faculty}
                />
                }

                {activeDegree &&
                <RemoveDegreeModal
                    open={removeDegreeModalIsShowing}
                    onClose={() => this.toggleRemoveDegreeModal(false)}
                    degree={activeDegree}
                    faculty={faculty}
                />
                }
            </Card>
        );
    }
}

export const DegreeCard = wrap(BaseDegreeCard);
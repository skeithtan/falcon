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
import { RECOGNITION } from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty.util";
import { getFullName } from "../../../../../utils/user.util";
import { RecognitionModal } from "../../modals/RecognitionModal";
import { RemoveRecognitionModal } from "../../modals/RemoveRecognitionModal";
import { wrap } from "./wrapper";


class BaseRecognitionsCard extends Component {
    state = {
        recognitionModalIsShowing: false,
        activeRecognition: null,
        removeRecognitionModalIsShowing: false,
    };

    toggleRecognitionModal = shouldShow => this.setState({
        recognitionModalIsShowing: shouldShow,
    });

    toggleRemoveRecognitionModal = shouldShow => this.setState({
        removeRecognitionModalIsShowing: shouldShow,
    });

    renderRows = recognitions => recognitions.map(recognition =>
        <TableRow key={recognition._id}>
            <TableCell>{recognition.title}</TableCell>
            <TableCell>{RECOGNITION.BASIS[recognition.basis].name}</TableCell>
            <TableCell>{recognition.sponsor}</TableCell>
            <TableCell>{formatMonthYearDate(recognition.date)}</TableCell>

            {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
            <TableRowActions
                removeButtonTooltipTitle="Remove this recognition"
                updateButtonTooltipTitle="Update this recognition"
                onUpdateButtonClick={() => this.setState({
                    activeRecognition: recognition,
                    recognitionModalIsShowing: true,
                })}

                onRemoveButtonClick={() => this.setState({
                    activeRecognition: recognition,
                    removeRecognitionModalIsShowing: true,
                })}
            />
            }
        </TableRow>,
    );

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`${getFullName(this.props.faculty.user)} does not have recorded recognitions.`}
            smallMessage="Recognitions added will be shown here."
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Add a recognition"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    onAddButtonClick = () => this.setState({
        activeRecognition: null,
        recognitionModalIsShowing: true,
    });

    render() {
        const {faculty, user} = this.props;
        //TODO: Sort by date
        const recognitions = faculty.recognitions;
        const recognitionsIsEmpty = recognitions.length === 0;

        const {recognitionModalIsShowing, activeRecognition, removeRecognitionModalIsShowing} = this.state;

        return (
            <Card>
                <TableToolbar
                    tableTitle="Recognitions"
                    addButtonTooltipTitle="Add a recognition"
                    onAddButtonClick={this.onAddButtonClick}
                    showAddButton={user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE}
                />
                {!recognitionsIsEmpty &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Basis</TableCell>
                            <TableCell>Sponsor</TableCell>
                            <TableCell>Date</TableCell>

                            {this.props.user.permissions.MUTATE_FACULTY_PROFILES &&
                            <TableCell padding="none">Actions</TableCell>
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.renderRows(recognitions)}
                    </TableBody>
                </Table>
                }

                {recognitionsIsEmpty && this.renderEmptyState()}

                {(user.permissions.MUTATE_FACULTY_PROFILES || user.permissions.REQUEST_PROFILE_CHANGE) &&
                <RecognitionModal
                    action={activeRecognition ? "update" : "add"}
                    recognition={activeRecognition}
                    faculty={faculty}
                    open={recognitionModalIsShowing}
                    onClose={() => this.toggleRecognitionModal(false)}
                />
                }

                {activeRecognition &&
                <RemoveRecognitionModal
                    recognition={activeRecognition}
                    faculty={faculty}
                    open={removeRecognitionModalIsShowing}
                    onClose={() => this.toggleRemoveRecognitionModal(false)}
                />
                }
            </Card>
        );
    }
}

export const RecognitionsCard = wrap(BaseRecognitionsCard);

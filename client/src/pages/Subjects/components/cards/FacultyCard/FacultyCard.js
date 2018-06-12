import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { FacultyChips } from "../../FacultyChips";


export class FacultyCard extends Component {

    onAddButtonClick = () => {
        // TODO
    };

    renderEmptyState = () => (
        <EmptyState bigMessage={`This subject does not have expert faculties`}
                    smallMessage="Faculties that can teach this subject will be shown here"
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add an expert faculty" />
    );

    renderBody = faculties => {
        if (faculties.length === 0) {
            return this.renderEmptyState();
        }

        return (
            <FacultyChips subjectFaculties={faculties} />
        );
    };

    render() {
        const {subject} = this.props;

        return (
            <DetailCard>
                <TableToolbar tableTitle="Expert Faculties"
                              addButtonTooltipTitle="Add an expert faculty"
                              onAddButtonClick={this.onAddButtonClick} />

                {this.renderBody(subject.faculties)}
            </DetailCard>
        );
    }
}
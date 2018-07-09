import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import React, { PureComponent } from "react";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { AdministrativeChangeRequestTopBar } from "./components/AdministrativeChangeRequestTopBar";
import {
    DegreeFields,
    ExtensionWorkFields,
    InstructionalMaterialFields,
    PresentationFields,
    RecognitionFields,
} from "./components/body_components";
import { ChangeRequestAdministrativeFooter } from "./components/ChangeRequestAdministrativeFooter";
import { ChangeRequestFacultyFooter } from "./components/ChangeRequestFacultyFooter";
import { FacultyChangeRequestTopBar } from "./components/FacultyChangeRequestTopBar";
import { wrap } from "./wrapper";


class ChangeRequestBody extends PureComponent {
    render() {
        const { changeRequest } = this.props;
        switch (changeRequest.subdocumentType) {
            case "Degree":
                return <DegreeFields changeRequest={changeRequest} />;
            case "Recognition":
                return <RecognitionFields changeRequest={changeRequest} />;
            case "Presentation":
                return <PresentationFields changeRequest={changeRequest} />;
            case "InstructionalMaterial":
                return <InstructionalMaterialFields changeRequest={changeRequest} />;
            case "ExtensionWork":
                return <ExtensionWorkFields changeRequest={changeRequest} />;
            default:
                throw new Error(`Attempted to render change request body for unknown subdocument type ${changeRequest.subdocumentType}`);
        }
    }
}

class ChangeRequestCardFooter extends PureComponent {
    renderAdministrativeFooter = () => (
        <ChangeRequestAdministrativeFooter
            approveChangeRequest={this.props.approveChangeRequest}
            rejectChangeRequest={this.props.rejectChangeRequest}
            changeRequestStatus={this.props.changeRequestStatus}
        />
    );

    renderFacultyFooter = () => (
        <ChangeRequestFacultyFooter
            changeRequestStatus={this.props.changeRequestStatus}
            deleteChangeRequest={this.props.deleteChangeRequest}
        />
    );

    render() {
        const { user } = this.props;

        return getObjectForUserType(user, {
            CLERK: this.renderAdministrativeFooter,
            DEAN: this.renderAdministrativeFooter,
            ASSOCIATE_DEAN: this.renderAdministrativeFooter,
            FACULTY: this.renderFacultyFooter,
        })();
    }
}


class BaseChangeRequestCard extends PureComponent {
    renderAdministrativeTopBar = () => (
        <AdministrativeChangeRequestTopBar changeRequest={this.props.changeRequest} faculty={this.props.faculty} />
    );

    renderFacultyTopBar = () => (
        <FacultyChangeRequestTopBar changeRequest={this.props.changeRequest} />
    );

    render() {
        const { changeRequest, faculty, user, approveChangeRequest, rejectChangeRequest, onDeleteChangeRequest } = this.props;
        const renderTopBar = getObjectForUserType(user, {
            CLERK: this.renderAdministrativeTopBar,
            DEAN: this.renderAdministrativeTopBar,
            ASSOCIATE_DEAN: this.renderAdministrativeTopBar,
            FACULTY: this.renderFacultyTopBar,
        });

        return (
            <Card>
                {renderTopBar()}
                <Divider />
                <ChangeRequestBody changeRequest={changeRequest} />

                <ChangeRequestCardFooter
                    user={user}
                    changeRequestStatus={changeRequest.status}
                    approveChangeRequest={() => approveChangeRequest()}
                    rejectChangeRequest={rejectionReason => rejectChangeRequest(rejectionReason)}
                    deleteChangeRequest={() => onDeleteChangeRequest(changeRequest, faculty)}
                />
            </Card>
        );
    }
}


export const ChangeRequestCard = wrap(BaseChangeRequestCard);
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { getObjectForUserType } from "../../../../../utils/user.util";
import { AdministrativeChangeRequestTopBar } from "./components/AdministrativeChangeRequestTopBar";
import {
    DegreeFields,
    ExtensionWorkFields,
    InstructionalMaterialFields,
    PresentationFields,
    RecognitionFields,
} from "./components/body_components";
import { ChangeRequestReviewActions } from "./components/ChangeRequestReviewAction";
import { ChangeRequestWithdrawAction } from "./components/ChangeRequestWithdrawActions";
import { FacultyChangeRequestTopBar } from "./components/FacultyChangeRequestTopBar";
import { wrap } from "./wrapper";


const ChangeRequestBody = ({changeRequest}) => {
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
};

const ChangeRequestCardFooter = ({
    user,
    approveChangeRequest,
    rejectChangeRequest,
    deleteChangeRequest,
    changeRequestStatus,
}) => {
    const administrativeActions = (
        <ChangeRequestReviewActions
            approveChangeRequest={approveChangeRequest}
            rejectChangeRequest={rejectChangeRequest}
        />
    );

    const facultyActions = (
        <ChangeRequestWithdrawAction
            changeRequestStatus={changeRequestStatus}
            deleteChangeRequest={deleteChangeRequest}
        />
    );

    return getObjectForUserType(user, {
        CLERK: administrativeActions,
        DEAN: administrativeActions,
        ASSOCIATE_DEAN: administrativeActions,
        FACULTY: facultyActions,
    });
};

const BaseChangeRequestCard = ({
    user,
    faculty,
    changeRequest,
    approveChangeRequest,
    rejectChangeRequest,
    onDeleteChangeRequest,
}) => {
    const administrativeTopBar = (
        <AdministrativeChangeRequestTopBar changeRequest={changeRequest} faculty={faculty} />
    );

    const facultyTopBar = (
        <FacultyChangeRequestTopBar changeRequest={changeRequest} />
    );

    const topBar = getObjectForUserType(user, {
        CLERK: administrativeTopBar,
        DEAN: administrativeTopBar,
        ASSOCIATE_DEAN: administrativeTopBar,
        FACULTY: facultyTopBar,
    });

    return (
        <Card>
            {topBar}
            <Divider />
            <ChangeRequestBody changeRequest={changeRequest} />

            <ChangeRequestCardFooter
                user={user}
                changeRequestStatus={changeRequest.status}
                approveChangeRequest={() => approveChangeRequest()}
                rejectChangeRequest={() => rejectChangeRequest()}
                deleteChangeRequest={() => onDeleteChangeRequest(changeRequest, faculty)}
            />
        </Card>
    );
};

export const ChangeRequestCard = wrap(BaseChangeRequestCard);
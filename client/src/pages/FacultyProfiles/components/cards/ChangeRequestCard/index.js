import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import React from "react";
import { UserAvatar } from "../../../../../components/UserAvatar";
import { SUBDOCUMENT_TYPE } from "../../../../../enums/faculty.enums";
import { getFullName, getObjectForUserType } from "../../../../../utils/user.util";
import { ChangeRequestRescindAction } from "./actions/ChangeRequestRescindActions";
import { ChangeRequestReviewActions } from "./actions/ChangeRequestReviewAction";
import {
    DegreeFields,
    ExtensionWorkFields,
    InstructionalMaterialFields,
    PresentationFields,
    RecognitionFields,
} from "./body_components";
import { wrap } from "./wrapper";


const ChangeRequestTopBar = ({faculty, changeRequest}) => {
    const submitted = moment(changeRequest.submitted).fromNow();
    const subdocumentType = SUBDOCUMENT_TYPE[changeRequest.subdocumentType].name;
    return (
        <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <Grid container direction="row" alignItems="center" spacing={16}>
                        <Grid item>
                            <UserAvatar user={faculty.user} />
                        </Grid>
                        <Grid item>
                            <Typography>
                                <strong>{getFullName(faculty.user)}</strong> wants to add
                                this <strong>{subdocumentType}</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography color="textSecondary">
                        {submitted}
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

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

const ChangeRequestCardFooter = ({user, approveChangeRequest, rejectChangeRequest, rescindChangeRequest}) => {
    const administrativeActions = (
        <ChangeRequestReviewActions
            approveChangeRequest={approveChangeRequest}
            rejectChangeRequest={rejectChangeRequest}
        />
    );

    const facultyActions = (
        <ChangeRequestRescindAction
            rescindChangeRequest={rescindChangeRequest}
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
    onRescindChangeRequest,
}) => (
    <Card>
        <ChangeRequestTopBar faculty={faculty} changeRequest={changeRequest} />
        <Divider />
        <ChangeRequestBody changeRequest={changeRequest} />

        <ChangeRequestCardFooter
            user={user}
            approveChangeRequest={() => approveChangeRequest()}
            rejectChangeRequest={() => rejectChangeRequest()}
            rescindChangeRequest={() => onRescindChangeRequest(changeRequest, faculty)}
        />
    </Card>
);

export const ChangeRequestCard = wrap(BaseChangeRequestCard);
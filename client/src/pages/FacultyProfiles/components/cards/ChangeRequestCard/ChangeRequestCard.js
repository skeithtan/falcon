import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AcceptIcon from "@material-ui/icons/Check";
import RejectIcon from "@material-ui/icons/Close";
import moment from "moment";
import React from "react";
import { UserAvatar } from "../../../../../components/UserAvatar";
import { getFullName } from "../../../../../utils/user.util";
import {
    DegreeFields,
    ExtensionWorkFields,
    InstructionalMaterialFields,
    PresentationFields,
    RecognitionFields,
} from "./body_components";


const subdocumentTypeToWords = subdocumentType => {
    switch(subdocumentType) {
        case "Degree":
            return "Degree";
        case "Recognition":
            return "Recognition";
        case "Presentation":
            return "Presentation";
        case "InstructionalMaterial":
            return "Instructional Material";
        case "ExtensionWork":
            return "Extension Work";
        default:
            return subdocumentType
    }
};

const ChangeRequestTopBar = ({faculty, changeRequest}) => {
    const submitted = moment(changeRequest.submitted).fromNow();
    const subdocumentType = subdocumentTypeToWords(changeRequest.subdocumentType); // TODO: Convert to human readable format
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
                                <strong>{getFullName(faculty.user)}</strong> wants to add this <strong>{subdocumentType}</strong>
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

const ChangeRequestReviewActions = ({user, changeRequest}) => {
    return (
        <Toolbar>
            <Grid container spacing={32} justify="flex-end">
                <Grid item>
                    <Button variant="flat" size="small" color="primary">
                        <Grid container spacing={8} alignItems="center">
                            <Grid item>
                                Reject
                            </Grid>
                            <Grid item>
                                <RejectIcon />
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="flat" size="small" color="primary">
                        <Grid container spacing={8} alignItems="center">
                            <Grid item>
                                Accept
                            </Grid>
                            <Grid item>
                                <AcceptIcon />
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export const ChangeRequestCard = ({user, faculty, changeRequest}) => (
    <Card>
        <ChangeRequestTopBar faculty={faculty} changeRequest={changeRequest} />
        <Divider />
        <ChangeRequestBody changeRequest={changeRequest} />
        <ChangeRequestReviewActions user={user} changeRequest={changeRequest} />
    </Card>
);
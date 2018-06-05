import { Faculty } from "../../models/faculty.model";
import { User } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { DoesNotExistError } from "../errors/does_not_exist.error";
import { ValidationError } from "../errors/validation.error";


function isUpdateOrRemove(request) {
    return ["UPDATE", "REMOVE"].includes(request.action);
}

function onUnknownRequestAction(request) {
    throw new ValidationError(`Could not perform unknown action type ${request.action}`);
}

const reviewOverview = faculty => {
    const overviewChange = faculty.changeRequests.overview;
    if (!overviewChange) {
        throw new DoesNotExistError(`Overview change request for faculty ${faculty._id} does not exist`);
    }

    return {
        async approve() {
            const user = await User.findById(faculty.user).exec();
            user.name = overviewChange.name;
            await user.save();

            faculty.sex = overviewChange.sex;
            faculty.birthDate = overviewChange.birthDate;
            faculty.employment = overviewChange.employment;

            faculty.changeRequests.overview = null;
            await faculty.save();

            return true;
        },

        async reject() {
            faculty.changeRequests.overview = null;
            await faculty.save();
            return true;
        },
    };
};

const reviewDegrees = faculty => ({_id}) => {
    const degreeRequest = faculty.changeRequests.degrees.id(_id);
    if (!degreeRequest) {
        throw new DoesNotExistError(`Degree change request ${_id} for faculty ${faculty._id} does not exist`);
    }

    async function removeRequest() {
        faculty.changeRequests.degrees.pull(degreeRequest);
        await faculty.save();
    }

    return {
        async approve() {
            const oldDegree = faculty.degrees.id(degreeRequest.objectId);
            const newDegree = degreeRequest.object;

            // Update and remove actions require oldDegree
            if (isUpdateOrRemove(degreeRequest) && !oldDegree) {
                await removeRequest();
                throw new DoesNotExistError(`Degree of ID ${degreeRequest.objectId} does not exist.`);
            }

            switch (degreeRequest.action) {
                case "ADD":
                    faculty.degrees.push(newDegree);
                    break;
                case "UPDATE":
                    oldDegree.set(newDegree);
                    break;
                case "REMOVE":
                    faculty.degrees.pull(oldDegree);
                    break;
                default:
                    await removeRequest();
                    onUnknownRequestAction(degreeRequest);
            }

            await removeRequest();
            await faculty.save();
            return true;
        },

        async reject() {
            await removeRequest();
            return true;
        },
    };
};

const reviewExtensionWorks = faculty => ({_id}) => {
    const extensionWorkRequest = faculty.changeRequests.extensionWorks.id(_id);
    if (!extensionWorkRequest) {
        throw new DoesNotExistError(`Extension work change request ${_id} for faculty ${faculty._id} does not exist`);
    }

    async function removeRequest() {
        faculty.changeRequests.extensionWorks.pull(extensionWorkRequest);
        await faculty.save();
    }

    return {
        async approve() {
            const oldExtensionWork = faculty.extensionWorks.id(extensionWorkRequest.objectId);
            const newExtensionWork = extensionWorkRequest.object;

            if (isUpdateOrRemove(extensionWorkRequest) && !oldExtensionWork) {
                await removeRequest();
                throw new DoesNotExistError(`Extension Work of ID ${extensionWorkRequest.objectId} does not exist.`);
            }

            switch (extensionWorkRequest.action) {
                case "ADD":
                    faculty.extensionWorks.push(newExtensionWork);
                    break;
                case "UPDATE":
                    oldExtensionWork.set(newExtensionWork);
                    break;
                case "REMOVE":
                    await removeRequest();
                    onUnknownRequestAction(extensionWorkRequest);
            }

            await removeRequest();
            await faculty.save();
            return true;
        },

        async reject() {
            await removeRequest();
            return true;
        },
    };
};

const reviewInstructionalMaterials = faculty => ({_id}) => {
    // TODO: This
};

const reviewRecognitions = faculty => ({_id}) => {
    // TODO: This
};

const reviewPresentations = faculty => ({_id}) => {
    // TODO: This
};

async function reviewChangeRequest(object, {facultyId}) {
    const faculty = await Faculty.findById(facultyId).exec();
    return {
        overview: reviewOverview(faculty),
        degrees: reviewDegrees(faculty),
        extensionWorks: reviewExtensionWorks(faculty),
        instructionalMaterials: reviewInstructionalMaterials(faculty),
        recognitions: reviewRecognitions(faculty),
        presentations: reviewPresentations(faculty),
    };
}

export const mutationResolvers = {
    reviewChangeRequest: limitAccess(reviewChangeRequest, {allowed: NO_FACULTY, action: "Review change requests"}),
};
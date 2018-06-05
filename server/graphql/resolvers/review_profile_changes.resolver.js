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
    const instructionalMaterialRequest = faculty.changeRequests.instructionalMaterials.id(_id);
    if (!instructionalMaterialRequest) {
        throw new DoesNotExistError(`Instructional Material change request ${_id} for faculty ${faculty._id} does not exist`);
    }

    async function removeRequest() {
        faculty.changeRequests.instructionalMaterials.pull(instructionalMaterialRequest);
        await faculty.save();
    }

    return {
        async approve() {
            const oldInstructionalMaterial = faculty.instructionalMaterials.id(instructionalMaterialRequest.objectId);
            const newInstructionalMaterial = instructionalMaterialRequest.object;

            if (isUpdateOrRemove(instructionalMaterialRequest) && !oldInstructionalMaterial) {
                await removeRequest();
                throw new DoesNotExistError(`Instructional Material of ID ${instructionalMaterialRequest.objectId} does not exist.`);
            }

            switch (instructionalMaterialRequest.action) {
                case "ADD":
                    faculty.instructionalMaterials.push(newInstructionalMaterial);
                    break;
                case "UPDATE":
                    oldInstructionalMaterial.set(newInstructionalMaterial);
                    break;
                case "REMOVE":
                    faculty.instructionalMaterials.pull(oldInstructionalMaterial);
                    break;
                default:
                    await removeRequest();
                    onUnknownRequestAction(instructionalMaterialRequest);
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

const reviewRecognitions = faculty => ({_id}) => {
    const recognitionRequest = faculty.changeRequests.recognitions.id(_id);
    if (!recognitionRequest) {
        throw new DoesNotExistError(`Recognition change request ${_id} for faculty ${faculty._id} does not exist`);
    }

    async function removeRequest() {
        faculty.changeRequests.recognitions.pull(recognitionRequest);
        await faculty.save();
    }

    return {
        async approve() {
            const oldRecognition = faculty.recognitions.id(recognitionRequest.objectId);
            const newRecognition = recognitionRequest.object;

            if (isUpdateOrRemove(recognitionRequest) && !oldRecognition) {
                await removeRequest();
                throw new DoesNotExistError(`Recognition of ID ${recognitionRequest.objectId} does not exist.`);
            }

            switch (recognitionRequest.action) {
                case "ADD":
                    faculty.recognitions.push(newRecognition);
                    break;
                case "UPDATE":
                    oldRecognition.set(newRecognition);
                    break;
                case "REMOVE":
                    faculty.recognitions.pull(oldRecognition);
                    break;
                default:
                    await removeRequest();
                    onUnknownRequestAction(recognitionRequest);
            }

            await removeRequest();
            await faculty.save();
            return true;
        },

        async reject(){
            await removeRequest();
            return true;
        },
    };
};

const reviewPresentations = faculty => ({_id}) => {
    const presentationRequest = faculty.changeRequests.presentations.id(_id);
    if (!presentationRequest) {
        throw new DoesNotExistError(`Presentation change request ${_id} for faculty ${faculty._id} does not exist`);
    }

    async function removeRequest() {
        faculty.changeRequests.presentations.pull(presentationRequest);
        await faculty.save();
    }

    return {
        async approve() {
            const oldPresentation = faculty.presentations.id(presentationRequest.objectId);
            const newPresentation = presentationRequest.object;

            if (isUpdateOrRemove(presentationRequest) && !oldPresentation){
                await removeRequest();
                throw new DoesNotExistError(`Presentation of ID ${presentationRequest.objectId} does not exist.`);
            }
            
            switch (presentationRequest.action) {
                case "ADD":
                    faculty.presentations.push(newPresentation);
                    break;
                case "UPDATE":
                    oldPresentation.set(newPresentation);
                    break;
                case "REMOVE":
                    faculty.presentations.pull(oldPresentation);
                    break;
                default:
                    await removeRequest();
                    onUnknownRequestAction(presentationRequest);
            }
            await removeRequest();
            await faculty.save();
            return true;
        },

        async reject() {
            await removeRequest();
            return true;
        },
    }
};

async function reviewProfileChanges(object, {facultyId}) {
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
    reviewProfileChanges: limitAccess(reviewProfileChanges, {allowed: NO_FACULTY, action: "Review change requests"}),
};
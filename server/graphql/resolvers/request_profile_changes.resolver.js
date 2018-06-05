import { Faculty } from "../../models/faculty.model";
import { FACULTY } from "../../models/user.model";
import { getLastElement } from "../../utils/array";
import { limitAccess } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";
import { DoesNotExistError } from "../errors/does_not_exist.error";


const overviewChanges = faculty => ({
    async update({newOverview}) {
        faculty.changeRequests.overview = newOverview;
        await faculty.save();
        const newFaculty = await Faculty.findById(faculty._id).exec();
        return newFaculty.changeRequests.overview;
    },
});

const degreeChanges = faculty => {
    function getDegree(_id) {
        const degree = faculty.degrees.id(_id);
        if (degree === null) {
            throw new DoesNotExistError(`Degree with id ${_id} for faculty ${faculty._id} was not found`);
        }
        return degree;
    }

    const degreeChanges = faculty.changeRequests.degrees;
    return {
        async add({newDegree}) {
            degreeChanges.push({
                action: "ADD",
                object: newDegree,
            });
            await faculty.save();
            return getLastElement(degreeChanges);
        },

        async update({_id, newDegree}) {
            const oldDegree = getDegree(_id);
            degreeChanges.push({
                action: "UPDATE",
                changeObjectId: oldDegree._id,
                object: {
                    ...oldDegree,
                    ...newDegree,
                },
            });

            await faculty.save();
            return getLastElement(degreeChanges);
        },

        async remove({_id}) {
            const oldDegree = getDegree(_id);
            degreeChanges.push({
                action: "REMOVE",
                changeObjectId: oldDegree._id,
            });

            await faculty.save();
            return getLastElement(degreeChanges);
        },
    };
};

const instructionalMaterialsChanges = faculty => {
    function getInstructionalMaterial(_id) {
        const instructionalMaterial = faculty.instructionalMaterials.id(_id);
        if (instructionalMaterial === null) {
            throw new DoesNotExistError(`Instructional Material with id ${_id} for faculty ${faculty._id} was not found`);
        }
        return instructionalMaterial;
    }

    const instructionalMaterialChanges = faculty.changeRequests.instructionalMaterials;
    return {
        async add({newInstructionalMaterial}) {
            instructionalMaterialChanges.push({
                action: "ADD",
                object: newInstructionalMaterial,
            });
            await faculty.save();
            return getLastElement(instructionalMaterialChanges);
        },

        async update({_id, newInstructionalMaterial}) {
            const oldInstructionalMaterial = getInstructionalMaterial(_id);
            instructionalMaterialChanges.push({
                action: "UPDATE",
                changeObjectId: oldInstructionalMaterial._id,
                object: {
                    ...oldInstructionalMaterial,
                    ...newInstructionalMaterial,
                },
            });

            await faculty.save();
            return getLastElement(instructionalMaterialChanges);
        },

        async remove({_id}) {
            const oldInstructionalMaterial = getInstructionalMaterial(_id);
            instructionalMaterialChanges.push({
                action: "REMOVE",
                changeObjectId: oldInstructionalMaterial._id,
            });

            await faculty.save();
            return getLastElement(instructionalMaterialChanges);
        },
    };

};

const extensionWorksChanges = faculty => {
    function getExtensionWork(_id) {
        const extensionWork = faculty.extensionWorks.id(_id);
        if (extensionWork === null) {
            throw DoesNotExistError(`Extension work with id ${id} for faculty ${faculty._id} was not found`);
        }

        return extensionWork;
    }

    const extensionWorkChanges = faculty.changeRequests.extensionWorks;

    return {
        async add({newExtensionWork}) {
            extensionWorkChanges.push({
                action: "ADD",
                object: newExtensionWork,
            });
            await faculty.save();
            return getLastElement(extensionWorkChanges);
        },

        async update({_id, newExtensionWork}) {
            const oldExtensionWork = getExtensionWork(_id);
            extensionWorkChanges.push({
                action: "UPDATE",
                changeObjectId: oldExtensionWork._id,
                object: {
                    ...oldExtensionWork,
                    ...newExtensionWork,
                },
            });

            await faculty.save();
            return getLastElement(extensionWorkChanges);
        },

        async remove({_id}) {
            const oldExtensionWork = getExtensionWork(_id);
            extensionWorkChanges.push({
                action: "REMOVE",
                changeObjectId: oldExtensionWork._id,
            });

            await faculty.save();
            return getLastElement(extensionWorkChanges);
        },
    };
};

const recognitionsChanges = faculty => {
    function getRecognition(_id) {
        const recognition = faculty.recognitions.id(_id);
        if (recognition === null) {
            throw new DoesNotExistError(`Recognition with id ${_id} for faculty ${faculty._id} was not found`);
        }
        return recognition;
    }

    const recognitionChanges = faculty.changeRequests.recognitions;
    return {
        async add({newRecognition}) {
            recognitionChanges.push({
                action: "ADD",
                object: newRecognition,
            });
            await faculty.save();
            return getLastElement(recognitionChanges);
        },

        async update({_id, newRecognition}) {
            const oldRecognition = getRecognition(_id);
            recognitionChanges.push({
                action: "UPDATE",
                changeObjectId: oldRecognition._id,
                object: {
                    ...oldRecognition,
                    ...newRecognition,
                },
            });
        },

        async remove({_id}) {
            const oldRecognition = getRecognition(_id);
            recognitionChanges.push({
                action: "REMOVE",
                changeObjectId: oldRecognition._id,
            });

            await faculty.save();
            return getLastElement(recognitionChanges);
        },
    };
};

const presentationsChanges = faculty => {
    function getPresentation(_id) {
        const presentation = faculty.presentations.id(_id);
        if (presentation === null) {
            throw new DoesNotExistError(`Presentation with id ${_id} for faculty ${faculty._id} was not found`);
        }
        return presentation;
    }

    const presentationChanges = faculty.changeRequests.presentations;
    return {
        async add({newPresentation}) {
            presentationChanges.push({
                action: "ADD",
                object: newPresentation,
            });
            await faculty.save();
            return getLastElement(presentationChanges);
        },

        async update({_id, newPresentation}) {
            const oldPresentation = getPresentation(_id);
            presentationChanges.push({
                action: "UPDATE",
                changeObjectId: oldPresentation._id,
                object: {
                    ...oldPresentation,
                    ...newPresentation,
                },
            });

            await faculty.save();
            return getLastElement(presentationChanges);
        },

        async remove({_id}) {
            const oldPresentation = getPresentation(_id);
            presentationChanges.push({
                action: "REMOVE",
                changeObjectId: oldPresentation._id,
            });

            await faculty.save();
            return getLastElement(presentationChanges);
        },
    };
};

async function requestProfileChanges(object, args, context) {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({user: user._id}).exec();

    return {
        overview: overviewChanges(faculty),
        degrees: degreeChanges(faculty),
        extensionWorks: extensionWorksChanges(faculty),
        recognitions: recognitionsChanges(faculty),
        instructionalMaterials: instructionalMaterialsChanges(faculty),
        presentations: presentationsChanges(faculty),
    };
}

export const mutationResolvers = {
    requestProfileChanges: limitAccess(requestProfileChanges, {allowed: FACULTY, action: "Submit change request"}),
};
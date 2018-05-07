import { Faculty } from "../../models/faculty.model";
import { User } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { FACULTY } from "../../models/user.model";

function faculties() {
    return Faculty.find({}).populate("user");
}

function mutateFaculty() {
    return {
        async createFaculty({newFaculty, newUser}) {
            newUser.authorization = FACULTY;
            newUser.secret = newUser.password;

            const user = await User.create(newUser);
            newFaculty.user = user._id;

            try {
                const faculty = await Faculty.create(newFaculty);
                faculty.user = user;
                return faculty;
            } catch (error) {
                console.log(`Error occurred while creating faculty object: ${error.message}`);

                // We either keep both or none, but never just the user
                await User.findByIdAndRemove({_id: user.id});
                throw error;
            }
        },

        async updateFaculty({_id, newFaculty}) {
            return Faculty.findByIdAndUpdate(_id, newFaculty, {new: true});
        },
    };
}

async function mutatePresentation(object, {facultyId}) {
    const faculty = await Faculty.findById({_id: facultyId}).exec();

    function getPresentation(_id) {
        const presentation = faculty.presentations.id(_id);
        if (presentation === null) {
            throw new Error(`DoesNotExistError: Presentation of id ${_id} does not exist`);
        }
        return presentation;
    }

    return {
        async create({newPresentation}) {
            faculty.presentations.push(newPresentation);
            await faculty.save();
            return faculty.presentations[faculty.presentations.length - 1];
        },

        async update({_id, newPresentation}) {
            const presentation = getPresentation(_id);
            Object.assign(presentation, newPresentation);
            await faculty.save();
            return presentation;
        },

        async remove({_id}) {
            const presentation = getPresentation(_id);
            presentation.remove();
            await faculty.save();
            return faculty.presentations.id(_id) === null;
        },
    };
}

async function mutateRecognition(object, {facultyId}) {
    const faculty = await Faculty.findById({_id: facultyId}).exec();

    function getRecognition(_id) {
        const recognition = faculty.recognitions.id(_id);
        if (recognition === null) {
            throw new Error(`DoesNotExistError: Recognition of id ${_id} does not exist`);
        }
        return recognition;
    }

    return {
        async create({newRecognition}) {
            faculty.recognitions.push(newRecognition);
            await faculty.save();
            return faculty.recognitions[faculty.recognitions.length - 1];
        },

        async update({_id, newRecognition}) {
            const recognition = getRecognition(_id);
            Object.assign(recognition, newRecognition);
            await faculty.save();
            return recognition;
        },

        async remove({_id}) {
            const recognition = getRecognition(_id);
            recognition.remove();
            await faculty.save();
            return faculty.recognitions.id(_id) === null;
        },
    };
}

async function mutateInstructionalMaterial(object, {facultyId}) {
    const faculty = await Faculty.findById({_id: facultyId}).exec();

    function getInstructionalMaterial(_id) {
        const instructionalMaterial = faculty.instructionalMaterials.id(_id);
        if (instructionalMaterial === null) {
            throw new Error(`DoesNotExistError: Instructional material of id ${_id} does not exist`);
        }

        return instructionalMaterial;
    }

    return {
        async create({newInstructionalMaterial}) {
            faculty.instructionalMaterials.push(newInstructionalMaterial);
            await faculty.save();
            return faculty.instructionalMaterials[faculty.instructionalMaterials.length - 1];
        },

        async update({_id, newInstructionalMaterial}) {
            const instructionalMaterial = getInstructionalMaterial(_id);
            Object.assign(instructionalMaterial, newInstructionalMaterial);
            await faculty.save();
            return instructionalMaterial;
        },

        async remove({_id}) {
            const instructionalMaterial = getInstructionalMaterial(_id);
            instructionalMaterial.remove();
            await faculty.save();
            return faculty.instructionalMaterials.id(_id) === null;
        },
    };
}

async function mutateExtensionWork(object, {facultyId}) {
    const faculty = await Faculty.findById({_id: facultyId}).exec();

    function getExtensionWork(_id) {
        const extensionWork = faculty.extensionWorks.id(_id);
        if (extensionWork === null) {
            throw new Error(`DoesNotExistError: Extension work of id ${_id} does not exist`);
        }

        return extensionWork;
    }

    return {
        async create({newExtensionWork}) {
            faculty.extensionWorks.push(newExtensionWork);
            await faculty.save();
            return faculty.extensionWorks[faculty.extensionWorks.length - 1];
        },

        async update({_id, newExtensionWork}) {
            const extensionWork = getExtensionWork(_id);
            Object.assign(extensionWork, newExtensionWork);
            await faculty.save();
            return extensionWork;
        },

        async remove({_id}) {
            const extensionWork = getExtensionWork(_id);
            extensionWork.remove();
            await faculty.save();
            return faculty.extensionWorks.id(_id) === null;
        },
    };
}

async function mutateDegree(object, {facultyId}) {
    const faculty = await Faculty.findById({_id: facultyId}).exec();

    function getDegree(_id) {
        const degree = faculty.degrees.id(_id);
        if (degree === null) {
            throw new Error(`DoesNotExistError: Degree of id ${_id} does not exist`);
        }

        return degree;
    }

    return {
        async create({newDegree}) {
            faculty.degrees.push(newDegree);
            await faculty.save();
            return faculty.degrees[faculty.degrees.length - 1];
        },

        async update({_id, newDegree}) {
            const degree = getDegree(_id);
            Object.assign(degree, newDegree);
            await faculty.save();
            return degree;
        },

        async remove({_id}) {
            const degree = getDegree(_id);
            degree.remove();
            await faculty.save();
            return faculty.degrees.id(_id) === null;
        },
    };
}

export const queryResolvers = {
    faculties: limitAccess(faculties, {allowed: NO_FACULTY, action: "Get all faculties"}),
};

export const mutationResolvers = {
    faculty: limitAccess(mutateFaculty, {allowed: NO_FACULTY, action: "Mutate faculty"}),
    presentation: limitAccess(mutatePresentation, {allowed: NO_FACULTY, action: "Mutate presentation"}),
    recognition: limitAccess(mutateRecognition, {allowed: NO_FACULTY, action: "Mutate recognition"}),
    instructionalMaterial: limitAccess(mutateInstructionalMaterial,
        {allowed: NO_FACULTY, action: "Mutate instructional materials"}),
    extensionWork: limitAccess(mutateExtensionWork, {allowed: NO_FACULTY, action: "Mutate extension work"}),
    degree: limitAccess(mutateDegree, {allowed: NO_FACULTY, action: "Mutate degrees"}),
};

import { Faculty } from "../../models/faculty.model";
import { CLERK, FACULTY, User } from "../../models/user.model";
import { getDifference } from "../../utils/array";
import {
    addFacultyToSubjects,
    removeFacultyFromSubjects,
} from "../../utils/faculty_subject_link";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";
import { DoesNotExistError } from "../errors/does_not_exist.error";
import { ValidationError } from "../errors/validation.error";


const faculties = () => Faculty.find().populate("user");

const faculty = (object, { _id }) =>
    Faculty.findById(_id)
        .populate("user")
        .then(faculty => {
            if (!faculty) {
                return new DoesNotExistError(
                    `Faculty of ID ${_id} does not exist.`
                );
            }
            return faculty;
        })
        .catch(error => {
            // CastErrors happen with id is an invalid ObjectID
            if (error.name === "CastError") {
                return new DoesNotExistError(
                    `Faculty of ID ${_id} does not exist.`
                );
            }
            throw error;
        });

async function myProfile(object, args, context) {
    const user = await getUserFromContext(context);
    return Faculty.findOne({ user: user._id }).populate("user");
}

function mutateFaculty() {
    return {
        async add({ newFaculty, newUser, temporaryPassword }) {
            newUser.authorization = FACULTY;
            newUser.password = {
                secret: temporaryPassword,
                temporary: true,
            };

            let user = null;

            try {
                user = await User.create(newUser);
                newFaculty.user = user._id;
            } catch (error) {
                // E11000 is duplicate key error index
                if (error.code === 11000) {
                    return new ValidationError(
                        `User with email ${
                            error.getOperation().email
                        } already exists`
                    );
                } else {
                    throw error;
                }
            }

            try {
                const faculty = await Faculty.create(newFaculty);
                faculty.user = user;
                return faculty;
            } catch (error) {
                console.log(
                    `Error occurred while creating faculty object: ${
                        error.message
                    }`
                );

                // We either keep both or none, but never just the user
                await User.findByIdAndDelete({ _id: user.id });
                throw error;
            }
        },

        async update({ _id, newFaculty, newUser }) {
            const faculty = await Faculty.findByIdAndUpdate(_id, newFaculty, {
                new: true,
            }).exec();
            const user = await User.findByIdAndUpdate(faculty.user, newUser, {
                new: true,
            }).exec();
            faculty.user = user;
            return faculty;
        },

        async resetPassword({ _id, newPassword }) {
            const faculty = await Faculty.findById(_id).exec();
            const user = await User.findById(faculty.user);
            user.password = {
                secret: newPassword,
                temporary: true,
            };

            await user.save();
            return true;
        },
    };
}

async function mutatePresentation(object, { facultyId }) {
    const faculty = await Faculty.findById(facultyId).exec();
    const { presentations } = faculty;

    function getPresentation(_id) {
        const presentation = presentations.id(_id);
        if (presentation === null) {
            throw new DoesNotExistError(
                `Presentation of ID ${_id} does not exist`
            );
        }
        return presentation;
    }

    return {
        async add({ newPresentation }) {
            const presentation = presentations.create(newPresentation);
            presentations.push(presentation);
            await faculty.save();
            return presentation;
        },
        async update({ _id, newPresentation }) {
            const presentation = getPresentation(_id);
            Object.assign(presentation, newPresentation);
            await faculty.save();
            return presentation;
        },
        async remove({ _id }) {
            const presentation = getPresentation(_id);
            presentation.remove();
            await faculty.save();
            return presentations.id(_id) === null;
        },
    };
}

async function mutateRecognition(object, { facultyId }) {
    const faculty = await Faculty.findById(facultyId).exec();
    const { recognitions } = faculty;

    function getRecognition(_id) {
        const recognition = recognitions.id(_id);
        if (recognition === null) {
            throw new DoesNotExistError(
                `Recognition of ID ${_id} does not exist`
            );
        }
        return recognition;
    }

    return {
        async add({ newRecognition }) {
            const recognition = recognitions.create(newRecognition);
            recognitions.push(recognition);
            await faculty.save();
            return recognition;
        },
        async update({ _id, newRecognition }) {
            const recognition = getRecognition(_id);
            Object.assign(recognition, newRecognition);
            await faculty.save();
            return recognition;
        },
        async remove({ _id }) {
            const recognition = getRecognition(_id);
            recognition.remove();
            await faculty.save();
            return recognitions.id(_id) === null;
        },
    };
}

async function mutateInstructionalMaterial(object, { facultyId }) {
    const faculty = await Faculty.findById(facultyId).exec();
    const { instructionalMaterials } = faculty;

    function getInstructionalMaterial(_id) {
        const instructionalMaterial = instructionalMaterials.id(_id);
        if (instructionalMaterial === null) {
            throw new DoesNotExistError(
                `Instructional material of ID ${_id} does not exist`
            );
        }
        return instructionalMaterial;
    }

    return {
        async add({ newInstructionalMaterial }) {
            const instructionalMaterial = instructionalMaterials.create(
                newInstructionalMaterial
            );
            instructionalMaterials.push(instructionalMaterial);
            await faculty.save();
            return instructionalMaterial;
        },
        async update({ _id, newInstructionalMaterial }) {
            const instructionalMaterial = getInstructionalMaterial(_id);
            Object.assign(instructionalMaterial, newInstructionalMaterial);
            await faculty.save();
            return instructionalMaterial;
        },
        async remove({ _id }) {
            const instructionalMaterial = getInstructionalMaterial(_id);
            instructionalMaterial.remove();
            await faculty.save();
            return instructionalMaterials.id(_id) === null;
        },
    };
}

async function mutateExtensionWork(object, { facultyId }) {
    const faculty = await Faculty.findById(facultyId).exec();
    const { extensionWorks } = faculty;

    function getExtensionWork(_id) {
        const extensionWork = extensionWorks.id(_id);
        if (extensionWork === null) {
            throw new DoesNotExistError(
                `Extension work of ID ${_id} does not exist`
            );
        }
        return extensionWork;
    }

    return {
        async add({ newExtensionWork }) {
            const extensionWork = extensionWorks.push(newExtensionWork);
            extensionWorks.push(extensionWork);
            await faculty.save();
            return extensionWork;
        },
        async update({ _id, newExtensionWork }) {
            const extensionWork = getExtensionWork(_id);
            Object.assign(extensionWork, newExtensionWork);
            await faculty.save();
            return extensionWork;
        },
        async remove({ _id }) {
            const extensionWork = getExtensionWork(_id);
            extensionWork.remove();
            await faculty.save();
            return extensionWorks.id(_id) === null;
        },
    };
}

async function mutateDegree(object, { facultyId }) {
    const faculty = await Faculty.findById(facultyId).exec();
    const { degrees } = faculty;

    function getDegree(_id) {
        const degree = degrees.id(_id);
        if (degree === null) {
            throw new DoesNotExistError(`Degree of ID ${_id} does not exist`);
        }
        return degree;
    }

    return {
        async add({ newDegree }) {
            const degree = degrees.create(newDegree);
            degrees.push(degree);
            await faculty.save();
            return degree;
        },
        async update({ _id, newDegree }) {
            const degree = getDegree(_id);
            Object.assign(degree, newDegree);
            await faculty.save();
            return degree;
        },
        async remove({ _id }) {
            const degree = getDegree(_id);
            degree.remove();
            await faculty.save();
            return degrees.id(_id) === null;
        },
    };
}

async function mutateTeachingSubject(object, { facultyId }) {
    const faculty = await Faculty.findById(facultyId);

    return {
        async set({ teachingSubjectsId }) {
            const oldSubjects = [...faculty.teachingSubjects];

            // Link faculty to subjects
            faculty.teachingSubjects = teachingSubjectsId;
            await faculty.save();

            // Link subjects to faculty
            const { addedItems, removedItems } = getDifference(
                teachingSubjectsId,
                oldSubjects
            );

            addFacultyToSubjects(faculty, addedItems);
            removeFacultyFromSubjects(faculty, removedItems);

            return faculty.teachingSubjects;
        },

        async unassign({ teachingSubjectId }) {
            faculty.teachingSubjects.pull(teachingSubjectId);
            removeFacultyFromSubjects(faculty, [teachingSubjectId]);
            await faculty.save();
            return true;
        },
    };
}

export const queryResolvers = {
    faculties: limitAccess(faculties, {
        allowed: NO_FACULTY,
        action: "Get all faculties",
    }),
    faculty: limitAccess(faculty, {
        allowed: NO_FACULTY,
        action: "Get single faculty",
    }),
    myProfile: limitAccess(myProfile, {
        allowed: FACULTY,
        action: "Get current faculty profile",
    }),
};

export const mutationResolvers = {
    faculty: limitAccess(mutateFaculty, {
        allowed: CLERK,
        action: "Mutate faculty",
    }),
    presentation: limitAccess(mutatePresentation, {
        allowed: CLERK,
        action: "Mutate presentation",
    }),
    recognition: limitAccess(mutateRecognition, {
        allowed: CLERK,
        action: "Mutate recognition",
    }),
    instructionalMaterial: limitAccess(mutateInstructionalMaterial, {
        allowed: CLERK,
        action: "Mutate instructional materials",
    }),
    extensionWork: limitAccess(mutateExtensionWork, {
        allowed: CLERK,
        action: "Mutate extension work",
    }),
    degree: limitAccess(mutateDegree, {
        allowed: CLERK,
        action: "Mutate degrees",
    }),
    teachingSubject: limitAccess(mutateTeachingSubject, {
        allowed: NO_FACULTY,
        action: "Mutate teaching subject",
    }),
};

import { Faculty } from "../../models/faculty.model";
import { ProfileChangeRequest } from "../../models/faculty_profile_changes.model";
import { CLERK, FACULTY } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";
import { DoesNotExistError } from "../errors/does_not_exist.error";
import { ValidationError } from "../errors/validation.error";

// Clean changeRequest and remove _id, submitted, and other change request fields
const getSubdocumentFromChangeRequest = changeRequest => {
    const subdocument = {...changeRequest.toObject()};
    delete subdocument._id;
    delete subdocument.submitted;
    delete subdocument.faculty;
    delete subdocument.subdocumentType;

    return subdocument;
};

const facultySubdocumentsPerType = faculty => ({
    Degree: faculty.degrees,
    Recognition: faculty.recognitions,
    Presentation: faculty.presentations,
    InstructionalMaterial: faculty.instructionalMaterials,
    ExtensionWork: faculty.extensionWork,
});

const reviewProfileChangeRequest = async (object, {_id}) => {
    const changeRequest = await ProfileChangeRequest.findById(_id);
    if (!changeRequest) {
        throw new DoesNotExistError(`Change request of id ${_id} does not exist.`);
    }

    const faculty = await Faculty.findById(changeRequest.faculty);

    return {
        async approve() {
            const subdocument = getSubdocumentFromChangeRequest(changeRequest);
            const collection = facultySubdocumentsPerType(faculty)[changeRequest.subdocumentType];

            if (collection === undefined) {
                throw new ValidationError(`Attempted to approve change request with id ${changeRequest._id} of unknown subdocumentType ${changeRequest.subdocumentType}`);
            }

            // .toObject() is required so that mongoose does not delete .subdocumentType field later
            const newSubdocument = collection.create(subdocument).toObject();
            collection.push(newSubdocument);

            await faculty.save();
            await changeRequest.remove();

            // Help GraphQL figure out what type this subdocument is
            newSubdocument.subdocumentType = changeRequest.subdocumentType;
            return newSubdocument;
        },

        async reject() {
            await changeRequest.remove();
            return true;
        },
    };
};

const profileChangeRequests = (object, {facultyId}) =>
    facultyId ?
        ProfileChangeRequest.find({faculty: facultyId}) :
        ProfileChangeRequest.find();

const myChangeRequests = async (object, args, context) => {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({user: user._id}).exec();
    return ProfileChangeRequest.find({faculty: faculty._id});
};

export const mutationResolvers = {
    reviewProfileChangeRequest: limitAccess(reviewProfileChangeRequest, {
        allowed: NO_FACULTY, action: "Review change requests",
    }),
};

export const queryResolvers = {
    profileChangeRequests: limitAccess(profileChangeRequests, {
        allowed: CLERK, action: "View change requests by faculty",
    }),
    myChangeRequests: limitAccess(myChangeRequests, {
        allowed: FACULTY, action: "View current faculty change requests",
    }),
};

export const typeDefs = {
    ChangeRequest: {
        __resolveType({subdocumentType}) {
            // We expect subdocumentType to be Degree / Recognition / InstructionalMaterial, or so on
            // subdocumentType was defined as discriminator name in mongoose
            // GraphQL Interface implementations are just subdocumentTypes with Change at the end:
            // For example, DegreeChange / RecognitionChange / InstructionalMaterialChange
            return subdocumentType + "Change";
        },
    },

    FacultySubdocument: {
        // Approving a subdocument has a special field subdocumentType
        // This special field is defined above, in reviewProfileChangeRequest.approve()
        // This helps GraphQL map the subdocument to its type definition
        __resolveType({subdocumentType}) {
            return subdocumentType;
        },
    },
};
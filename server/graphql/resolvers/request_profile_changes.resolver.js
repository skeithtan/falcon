import { Faculty } from "../../models/faculty.model";
import {
    DegreeAddRequest,
    ExtensionWorkAddRequest,
    InstructionalMaterialAddRequest,
    PresentationAddRequest,
    RecognitionAddRequest,
} from "../../models/faculty_profile_changes.model";
import { FACULTY } from "../../models/user.model";
import { limitAccess } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";


const degreeChanges = faculty => ({
    add({newDegree}) {
        return DegreeAddRequest.create({
            faculty: faculty._id,
            ...newDegree,
        });
    },

    async remove({_id}) {
        await DegreeAddRequest.findByIdAndDelete(_id);
        return true;
    },
});

const recognitionChanges = faculty => ({
    add({newRecognition}) {
        return RecognitionAddRequest.create({
            faculty: faculty._id,
            ...newRecognition,
        });
    },

    async remove({_id}) {
        await RecognitionAddRequest.findByIdAndDelete(_id);
        return true;
    },
});

const presentationChanges = faculty => ({
    add({newPresentation}) {
        return PresentationAddRequest.create({
            faculty: faculty._id,
            ...newPresentation,
        });
    },

    async remove({_id}) {
        await PresentationAddRequest.findByIdAndDelete(_id);
        return true;
    },
});

const instructionalMaterialChanges = faculty => ({
    add({newInstructionalMaterial}) {
        return InstructionalMaterialAddRequest.create({
            faculty: faculty._id,
            ...newInstructionalMaterial,
        });
    },

    async remove({_id}) {
        await InstructionalMaterialAddRequest.findByIdAndDelete(_id);
        return true;
    },
});

const extensionWorkChanges = faculty => ({
    add({newExtensionWork}) {
        return ExtensionWorkAddRequest.create({
            faculty: faculty._id,
            ...newExtensionWork,
        });
    },

    async remove({_id}) {
        await ExtensionWorkAddRequest.findByIdAndDelete(_id);
        return true;
    },
});

async function requestProfileChanges(object, args, context) {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({user: user._id}).exec();

    return {
        degree: degreeChanges(faculty),
        extensionWork: extensionWorkChanges(faculty),
        recognition: recognitionChanges(faculty),
        instructionalMaterial: instructionalMaterialChanges(faculty),
        presentation: presentationChanges(faculty),
    };
}

export const mutationResolvers = {
    requestProfileChange: limitAccess(requestProfileChanges, {allowed: FACULTY, action: "Submit change request"}),
};
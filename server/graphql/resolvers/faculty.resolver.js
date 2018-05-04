import { Faculty } from "../../models/faculty.model";
import { User } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { FACULTY } from "../../models/user.model";
import ValidationError from "../errors/validation.error";

function faculties() {
    return Faculty.find({}).populate("user");
}

async function createFaculty(object, args) {
    const facultyInput = args.faculty;
    const userInput = args.user;

    userInput.authorization = FACULTY;
    userInput.secret = userInput.password;

    const user = await User.create({...userInput});
    facultyInput.user = user._id;

    try {
        const faculty = await Faculty.create({...facultyInput});
        faculty.user = user;
        return faculty;
    } catch (error) {
        console.log(`Error occurred while creating faculty object: ${error.message}`);

        // We either keep both or none, but never just the user
        await User.findByIdAndRemove({_id: user.id});
        throw error;
    }
}

async function createPresentation(object, args) {
    const presentationInput = args.presentation;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.presentations.push({...presentationInput});
    await faculty.save(); //This must be await so errors are thrown before returning

    return faculty.presentations[faculty.presentations.length - 1];
}

async function createRecognition(object, args) {
    const recognitionInput = args.recognition;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.recognitions.push({...recognitionInput});
    await faculty.save();

    return faculty.recognitions[faculty.recognitions.length - 1];
}

async function createInstructionalMaterial(object, args) {
    const instructionalMaterialInput = args.instructionalMaterial;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.instructionalMaterials.push({...instructionalMaterialInput});
    await faculty.save();

    return faculty.instructionalMaterials[faculty.instructionalMaterials.length - 1];
}

async function createExtensionWork(object, args) {
    const extensionWorkInput = args.extensionWork;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.extensionWorks.push({...extensionWorkInput});
    await faculty.save();

    return faculty.extensionWorks[faculty.extensionWorks.length - 1];
}


export const queryResolvers = {
    faculties: limitAccess(faculties, {allowed: NO_FACULTY, action: "Get all faculties"}),
};

export const mutationResolvers = {
    createFaculty: limitAccess(createFaculty, {allowed: NO_FACULTY, action: "Create faculty"}),
    createPresentation: limitAccess(createPresentation, {allowed: NO_FACULTY, action: "Create presentation"}),
    createRecognition: limitAccess(createRecognition, {allowed: NO_FACULTY, action: "Create recognition"}),
    createInstructionalMaterial: limitAccess(createInstructionalMaterial,
        {allowed: NO_FACULTY, action: "Create instructional materials"}),
    createExtensionWork: limitAccess(createExtensionWork,
        {allowed: NO_FACULTY, action: "Create extension work"}),
};

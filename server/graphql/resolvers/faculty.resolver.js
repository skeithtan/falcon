import { Faculty } from "../../models/faculty.model";
import { User } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { FACULTY } from "../../models/user.model";

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

function updateFaculty(object, {_id, newFaculty}) {
    return Faculty.findByIdAndUpdate(_id, newFaculty, {new: true});
}

async function createPresentation(object, args) {
    const presentationInput = args.presentation;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.presentations.push({...presentationInput});
    await faculty.save(); //This must be await so errors are thrown before returning

    return faculty.presentations[faculty.presentations.length - 1];
}

async function updatePresentation(object, args) {
    const {_id, newPresentation, facultyId} = args;
    const faculty = await Faculty.findById({_id: facultyId}).exec();
    const presentation = faculty.presentations.id(_id);

    Object.assign(presentation, newPresentation);
    await faculty.save();

    return presentation;
}

async function createRecognition(object, args) {
    const recognitionInput = args.recognition;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.recognitions.push({...recognitionInput});
    await faculty.save();

    return faculty.recognitions[faculty.recognitions.length - 1];
}

async function updateRecognition(object, args) {
    const {_id, newRecognition, facultyId} = args;
    const faculty = await Faculty.findById({_id: facultyId}).exec();
    const recognition = faculty.recognitions.id(_id);

    Object.assign(recognition, newRecognition);
    await faculty.save();

    return recognition;
}

async function createInstructionalMaterial(object, args) {
    const instructionalMaterialInput = args.instructionalMaterial;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.instructionalMaterials.push({...instructionalMaterialInput});
    await faculty.save();

    return faculty.instructionalMaterials[faculty.instructionalMaterials.length - 1];
}

async function updateInstructionalMaterial(object, args) {
    const {_id, newInstructionalMaterial, facultyId} = args;
    const faculty = await Faculty.findById({_id: facultyId}).exec();
    const instructionalMaterial = faculty.instructionalMaterials.id(_id);

    Object.assign(instructionalMaterial, newInstructionalMaterial);
    await faculty.save();

    return instructionalMaterial;
}

async function createExtensionWork(object, args) {
    const extensionWorkInput = args.extensionWork;
    const facultyId = args.facultyId;

    const faculty = await Faculty.findById({_id: facultyId}).exec();
    faculty.extensionWorks.push({...extensionWorkInput});
    await faculty.save();

    return faculty.extensionWorks[faculty.extensionWorks.length - 1];
}

async function updateExtensionWork(object, args) {
    const {_id, newExtensionWork, facultyId} = args;
    const faculty = await Faculty.findById({_id: facultyId}).exec();
    const extensionWork = faculty.extensionWorks.id(_id);

    Object.assign(extensionWork, newExtensionWork);
    await faculty.save();

    return extensionWork;
}


export const queryResolvers = {
    faculties: limitAccess(faculties, {allowed: NO_FACULTY, action: "Get all faculties"}),
};

export const mutationResolvers = {
    createFaculty: limitAccess(createFaculty, {allowed: NO_FACULTY, action: "Create faculty"}),
    updateFaculty: limitAccess(updateFaculty, {allowed: NO_FACULTY, action: "Update faculty"}),

    createPresentation: limitAccess(createPresentation, {allowed: NO_FACULTY, action: "Create presentation"}),
    updatePresentation: limitAccess(updatePresentation, {allowed: NO_FACULTY, action: "Update presentation"}),

    createRecognition: limitAccess(createRecognition, {allowed: NO_FACULTY, action: "Create recognition"}),
    updateRecognition: limitAccess(updateRecognition, {allowed: NO_FACULTY, action: "Update recognition"}),

    createInstructionalMaterial: limitAccess(createInstructionalMaterial,
        {allowed: NO_FACULTY, action: "Create instructional materials"}),
    updateInstructionalMaterial: limitAccess(updateInstructionalMaterial,
        {allowed: NO_FACULTY, action: "Update instructional materials"}),

    createExtensionWork: limitAccess(createExtensionWork,
        {allowed: NO_FACULTY, action: "Create extension work"}),
    updateExtensionWork: limitAccess(updateExtensionWork,
        {allowed: NO_FACULTY, action: "Update extension work"}),
};

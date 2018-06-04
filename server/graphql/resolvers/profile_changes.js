import { Faculty } from "../../models/faculty.model";
import { FACULTY } from "../../models/user.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";
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
            throw new DoesNotExistError(`Degree with id ${id} for faculty ${faculty._id} was not found`);
        }
        return degree;
    }

    const degreeChanges = faculty.changeRequests.degrees;
    const getLatestChangeRequest = () => degreeChanges[degreeChanges.length - 1];

    return {
        async add({newDegree}) {
            degreeChanges.push({
                action: "ADD",
                object: newDegree,
            });
            await faculty.save();
            return getLatestChangeRequest();
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
            return getLatestChangeRequest();
        },

        async remove({_id}) {
            const oldDegree = getDegree(_id);
            degreeChanges.push({
                action: "REMOVE",
                changeObjectId: oldDegree._id,
            });

            await faculty.save();
            return getLatestChangeRequest();
        },
    };
};

async function submitChangeRequest(object, args, context) {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({user: user._id}).exec();

    return {
        overview: overviewChanges(faculty),
        degrees: degreeChanges(faculty),
    };
}

async function reviewChangeRequest(object, {facultyId}) {
    // TODO
}

export const mutationResolvers = {
    submitChangeRequest: limitAccess(submitChangeRequest, {allowed: FACULTY, action: "Submit change request"}),
    reviewChangeRequest: limitAccess(reviewChangeRequest, {allowed: NO_FACULTY, action: "Review change requests"}),
};
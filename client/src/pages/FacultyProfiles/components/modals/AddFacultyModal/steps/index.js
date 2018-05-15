import FacultyForm from "./FacultyForm";
import ReviewForm from "./ReviewForm";
import UserForm from "./UserForm";


export default [
    {
        label: "Create a user",
        component: UserForm,
    },
    {
        label: "Set faculty details",
        component: FacultyForm,
    },
    {
        label: "Review details",
        component: ReviewForm,
    },
];
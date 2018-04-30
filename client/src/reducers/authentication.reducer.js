import jwtDecode from "jwt-decode";
import { SET_CURRENT_USER } from "../actions/user.actions";


const hasToken = localStorage.hasOwnProperty("token");

const initialState = {
    isAuthenticated: hasToken,
    user: hasToken ? jwtDecode(localStorage.token) : null,
};

export default function authentication(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: action.user !== null,
                user: action.user,
            };
        default:
            return state;
    }
}
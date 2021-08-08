import { USER_SIGNIN, CLEAR_USER } from "./types";

// set user information after signed in
export const userSignIn = (user, name) => dispatch => {
    dispatch({
        type: USER_SIGNIN,
        payload: {
            user,
            name
        }
    });
};

// clear user after signed out
export const clearUser = () => dispatch => {
    dispatch({
        type: CLEAR_USER
    });
};


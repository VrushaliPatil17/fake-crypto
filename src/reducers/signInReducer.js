/* eslint-disable import/no-anonymous-default-export */
import { CLEAR_USER, USER_SIGNIN } from "../actions/types";

const initialState = {
    name: '',
    userData: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_SIGNIN:
            return {
                ...state,
                name: action.payload.name,
                userData: action.payload.user
            };
        case CLEAR_USER:
            return {
                ...state,
                name: '',
                userData: ''
            };
        default: return state;
    }
}
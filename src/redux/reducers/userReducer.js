import { GET_USER, GET_USER_ID } from "../actions";

const initialState = {
    data: null,
    userID: ""
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                data: action.payload
            }
        case GET_USER_ID:
            return {
                ...state,
                userID: action.payload
            }
        default:
            return state
    }
}

export default userReducer;
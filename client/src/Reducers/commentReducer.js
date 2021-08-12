import { ADD_COMMENT, GET_COMMENT, LOADING } from "../Actions/types"

const initialState = {
    comments: [],
    loaded: false,
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loaded: true };
        case ADD_COMMENT:
            return { ...state, comments: [...state.comments, action.comment], loading: false };
        case GET_COMMENT:
            return { ...state, comments: [...action.comment], loading: false };
        default:
            return state;
    }
}

export default commentReducer;
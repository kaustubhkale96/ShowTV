import { ADD_VIDEO, LOADING, ALL_VIDEO } from "../Actions/types";

const initialState = {
    videos: [],
    loaded: false,
};

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case ADD_VIDEO:
            return { ...state, videos: [...state.videos, action.video], loading: false };
        case ALL_VIDEO:
            return { ...state, videos: [...action.video], loading: false };
        default:
            return state;
    }
};

export default videoReducer;
import { FACEBOOK_LOGIN, GOOGLE_LOGIN, LOGIN_USER } from "../Actions/types"

const initialState = {
    user_info: JSON.parse(sessionStorage.getItem('user_data')) || null,
    login_status: false
}

const loginReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOGIN_USER:
            newState.user_info = action.payload;
            newState.login_status = true
            break;
        case GOOGLE_LOGIN:
            newState.user_info = action.payload;
            newState.login_status = true
            break;
        case FACEBOOK_LOGIN:
            newState.user_info = action.payload;
            newState.login_status = true
            break;
        default:
            return newState;
    }
    return newState;
}
export default loginReducer;
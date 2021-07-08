import { LOGIN_USER } from "./types";

export const setLoginUser = (dispatch, data) => {

    dispatch({
        type: LOGIN_USER,
        payload: data
    })
}
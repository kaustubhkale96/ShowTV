import axios from "axios";
import { LOADING, ADD_COMMENT, GET_COMMENT } from "./types";

export const add_comment = (data) => (dispatch) => {
    console.log('add_comment actions =>', data);
    dispatch({ type: LOADING });
    axios.post('/api/comment/add', data)
        .then((res) => {
            console.log('add_comment res=>', res.data);
            if (res.data.success) {
                dispatch({
                    type: ADD_COMMENT,
                    comment: res.data.message,
                    message: '',
                });
            }
            else {
                dispatch({
                    type: ADD_COMMENT,
                    comment: null,
                    message: res.data.message,
                });
            }
        })
        .catch((err) => {
            console.log('add_comment action=>', err)
        })
}
export const get_comment = (data) => (dispatch) => {
    dispatch({ type: LOADING });
    axios.post('/api/comment/view', data)
        .then((res) => {
            console.log('get_comment action res=', res);
            if (res.data.success) {
                console.log("res success=", res.data);
                try {
                    dispatch({
                        type: GET_COMMENT,
                        success: true,
                        comment: [...res.data.message],
                        message: ''
                    });
                } catch (e) {
                    console.log(e);
                }
                console.log('video=', res.data)
            }
            else {
                dispatch({
                    type: GET_COMMENT,
                    success: false,
                    comment: [],
                    message: res.data.message,
                });
            }
        })
        .catch((err) => {
            console.log('api/video/get=', err);
        });
}
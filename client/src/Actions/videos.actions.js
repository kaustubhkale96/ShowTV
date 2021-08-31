import axios from 'axios';
import { LOADING, ADD_VIDEO, ALL_VIDEO, EDIT_VIDEO } from './types'

export const add_video = (data) => (dispatch, getState) => {
    console.log('add_video actions data=', data);
    dispatch({ type: LOADING });
    axios.post('/api/video/upload', data)

        .then((res) => {
            console.log('add_video res=', res);
            if (res.data.success) {
                dispatch({
                    type: ADD_VIDEO,
                    video: res.data.video,
                    message: "",
                });
            }
            else {
                dispatch({
                    type: ADD_VIDEO,
                    video: null,
                    message: res.data.message,
                });
            }
        })
        .catch(err => {
            console.log('add_video actions err=', err);
        });
}

export const get_video = () => (dispatch, getState) => {
    dispatch({ type: LOADING });
    axios.get('api/video/get')
        .then((res) => {
            console.log('get_video action res=', res.data);
            if (res.data.success) {
                console.log("res success=", res.data);
                dispatch({
                    type: ALL_VIDEO,
                    success: true,
                    video: res.data.result,
                    message: '',
                });
                console.log('video=', res.data)
            }
            else {
                dispatch({
                    type: ALL_VIDEO,
                    success: false,
                    video: [],
                    message: res.data.message,
                });
            }
        })
        .catch((err) => {
            console.log('api/video/get=', err);
        });
}


export const edit_video = (data) => (dispatch, getState) => {
    console.log('edit data', data)
    dispatch({ type: LOADING });
    axios.put(`api/video/:id`, data)
        .then((res) => {
            console.log('api/video/:id=>', res);
            if (res.data.success) {
                dispatch({
                    type: EDIT_VIDEO,
                    video: res.data.video,
                    message: "",
                });
            } else {
                dispatch({
                    type: EDIT_VIDEO,
                    video: null,
                    message: res.data.message,
                });
            }
        })
        .catch(err => {
            console.log('edit actio err=>', err);
        });
}
import axios from 'axios';
import { LOADING, ADD_VIDEO } from './types'

export const add_video = (data) => (dispatch, getState) => {
    console.log('add_video actions data=', data);
    dispatch({ type: LOADING });
    axios.post('/api/video/upload', data)

        .then(res => {
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
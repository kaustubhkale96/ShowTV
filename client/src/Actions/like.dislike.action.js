import axios from "axios"
import { DISLIKE_VIDEO, LIKE_VIDEO } from "./types";

export const likeVideo = (video_id) => (dispatch) => {
    axios.get(`/api/video/${video_id}/like`)
        .then(res => {
            dispatch({
                type: LIKE_VIDEO,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err);
        })
}
export const dislikeVideo = (video_id) => (dispatch) => {
    axios.get(`/api/video/${video_id}/dislike`)
        .then(res => {
            dispatch({
                type: DISLIKE_VIDEO,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err);
        })
}

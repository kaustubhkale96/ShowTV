import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { connect } from 'react-redux';
import axios from 'axios';
import { Typography } from '@material-ui/core';

const buttons = { display: 'flex', justifyContent: 'flex-end', }
const btns = { display: 'flex', alignItems: 'center', }

function LikesDislikes(props) {

    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [likeAction, setLikeAction] = useState(null)
    const [dislikeAction, setDislikeAction] = useState(null)
    const googleUSer = sessionStorage.getItem('id')
    console.log(googleUSer)
    const user = props.user.user_info.id
    const videoId = props.videoId

    useEffect(() => {
        console.log('useEffect=>', props)
        axios.post('/api/video/like/get', { user, videoId })
            .then(response => {
                if (response.data.success) {
                    console.log('likes length', response.data.message)
                    setLike(response.data.message.length)

                    response.data.message.map(message => {
                        console.log(props.user)
                        if (message.user === props.user.user_info.id) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get Like')
                }
            })
        axios.post('/api/video/dislike/get', { user, videoId })
            .then(response => {
                if (response.data.success) {
                    console.log('dislikes length', response.data.message)
                    setDislike(response.data.message.length)

                    response.data.message.map(message => {
                        console.log(props.user)
                        if (message.user === props.user.user_info.id) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get Dislike')
                }
            })
    })
    console.log(props)

    const onLike = () => {
        if (likeAction === null) {
            axios.post('/api/video/like/add', { user, videoId })
                .then(response => {
                    if (response.data.success) {

                        setLike(like + 1)
                        setLikeAction('liked')

                        if (dislikeAction !== null) {
                            setDislike(dislike - 1)
                            setDislikeAction(null)
                        }


                    } else {
                        alert('Failed to like Video')
                    }
                })
        } else {
            axios.post('/api/video/like/unlike', { user, videoId })
                .then(response => {
                    if (response.data.success) {

                        setLike(like - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to unlike Video')
                    }
                })
        }
    }

    const onDislike = () => {
        if (dislikeAction === null) {
            axios.post('/api/video/dislike/add', { user, videoId })
                .then(response => {
                    if (response.data.success) {

                        setDislike(dislike + 1)
                        setDislikeAction('disliked')

                        if (likeAction !== null) {
                            setLike(like - 1)
                            setLikeAction(null)

                        }

                    } else {
                        alert("Failed to dislike Video")
                    }
                })
        } else {

            axios.post('/api/video/dislike/undislike', { user, videoId })
                .then(response => {
                    if (response.data.success) {

                        setDislike(dislike - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to undislike Video')
                    }
                })
        }
    }

    return (
        <div style={buttons}>
            <div style={btns}>
                <IconButton onClick={onLike} >{likeAction ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</IconButton>
                <Typography>{like}</Typography>
            </div>
            <div style={btns}>
                <IconButton onClick={onDislike} >{dislikeAction ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}</IconButton>
                <Typography>{dislike}</Typography>
            </div>
        </div>
    )
}
const MapStateToProps = (state) => ({ like: state.like, user: state.user, video: state.video })
export default connect(MapStateToProps, {})(LikesDislikes)

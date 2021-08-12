import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextField, Typography } from '@material-ui/core'
import { add_comment, get_comment } from '../../Actions/comments.action'
import { connect } from 'react-redux'

const commentform = { margin: '1rem' }
const text = { width: '90%', borderRadius: '10px' }
const input = { display: 'flex', justifyContent: 'flex-start' }
const avatar = { margin: '1rem' }
const button = { display: 'flex', justifyContent: 'flex-end' }

function Comment(props) {
    useEffect(() => {
        console.log('useeffect', props)
        props.get_comment();
    }, [])
    const [comment, setComment] = useState('')
    const user = props.user.user_info.id
    const videoId = props.videoId
    console.log('comment props', props)

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        if (name === 'comment') { setComment(target.value) }
        console.log(target.value)
    }

    const submitData = (e) => {
        e.preventDefault();
        setComment('')
        props.add_comment({ comment, user, videoId })
    }

    const commentTxt = props.comment.comments;
    return (
        <div>
            <form style={commentform} onSubmit={submitData}>
                <h5>Comments</h5>
                <div style={input}>
                    <Avatar style={avatar}></Avatar>
                    <TextField style={text} required id='standard' label="Add Comment" onChange={handleChange} name="comment" />
                </div>
                <div style={button}>
                    <Button>Cancel</Button>
                    <Button type="submit">Comment</Button>
                </div>
            </form>
            <div>
                <Typography>{commentTxt}</Typography>
            </div>
        </div>
    )
}
const MapStatetoProps = (state) => ({ comment: state.comment, user: state.user, video: state.video })
export default connect(MapStatetoProps, { add_comment, get_comment })(Comment)

import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, TextField, Typography } from '@material-ui/core'
import { add_comment, get_comment } from '../../Actions/comments.action'
import { connect } from 'react-redux'

const commentform = { margin: '1rem auto' }
const text = { width: '90%', borderRadius: '10px' }
const input = { display: 'flex', justifyContent: 'flex-start' }
const avatar = { margin: '1rem' }
const button = { display: 'flex', justifyContent: 'flex-end', }
const cmtpaper = { background: 'none', display: 'flex', margin: '0 2rem', padding: '0.5rem', justifyContent: 'flex-start', alignItems: 'center' }
const useravatar = { height: '2.2rem', width: '2.2rem', margin: '1rem' }
const use = { fontSize: '13px', fontWeight: 'fontWeightLight' }
const cmnt = { fontSize: '18px' }
const btn = { border: '1px solid', borderRadius: '8px' }

function Comment(props) {
    useEffect(() => {
        console.log('useeffect', props)
        setComment('')
        props.get_comment({ videoId: props.videoId });
    }, [])
    const [comment, setComment] = useState('')
    const username = props.user.user_info.username
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
        props.add_comment({ comment, user, videoId, username })
    }
    console.log('user=>', props.comment.comments)

    return (
        <div>
            <form style={commentform} onSubmit={submitData}>
                <h5>Comments</h5>
                <div style={input}>
                    <Avatar style={avatar}></Avatar>
                    <TextField style={text} required id='standard' label="Add Comment" onChange={handleChange} name="comment" />
                </div>
                <div style={button}>
                    <Button type="submit" style={btn}>Comment</Button>
                </div>
            </form>
            <div>
                {props.comment.comments.length > 0 && props.comment.comments.map((item, index) => (
                    <div key={index}>
                        <div>
                            <Paper style={cmtpaper} elevation={0}>
                                <Avatar style={useravatar}></Avatar>
                                <div>
                                    <Typography style={use}>{item.username}</Typography>
                                    <Typography style={cmnt}>{item.comment}</Typography>
                                </div>
                            </Paper>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
const MapStatetoProps = (state) => ({ comment: state.comment, user: state.user, video: state.video })
export default connect(MapStatetoProps, { add_comment, get_comment })(Comment)

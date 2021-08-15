import PersistentDrawerLeft from '../Dashboard/sidebar';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { connect } from 'react-redux';
import { Button, Container, Divider, Paper, Typography } from '@material-ui/core';
import Comment from '../Comments';

const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #202020)', backgroundSize: 'cover', height: 'auto', zIndex: -1, }
const player = { border: '1px solid lightgrey', margin: 'auto' }
const body = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '80px', }
const paper = { background: 'none', border: 'none', marginTop: '20px' }
const des = { background: 'none', margin: '20px', textOverflow: 'ellipsis', overflow: 'hidden' }
const videotitle = { margin: '5px', }
const divider = { marginTop: '10px', background: '#696969', width: '100%', }


function VideoPlayer(props) {
    console.log('props', props)
    const video_ID = props.location.state.video_id
    const title = props.location.state.title
    const description = props.location.state.description

    const [showMore, setShowMore] = useState(false);

    const getDes = () => {
        if (description.length <= 250) return description;
        if (description.length > 250 && showMore) {
            return (
                <div>
                    <p>{description}</p>
                    <Button onClick={() => { setShowMore(false) }}>Show Less</Button>
                </div>
            );
        }
        if (description.length > 250) {
            return (
                <div>
                    <p>{description.slice(0, 250)}</p>
                    <Button onClick={() => setShowMore(true)}>Show More</Button>
                </div>
            )
        }
    }

    return (
        <div style={root}>
            <PersistentDrawerLeft />
            <div >
                <Container style={body}>
                    <ReactPlayer style={player} width='90vw' height='75vh' controls={true} url={`http://www.youtube.com/watch?v=${video_ID}`} />
                    <Paper style={paper} elevation={0}>
                        <div>
                            <h2 style={videotitle}>{title}</h2>
                            <Divider style={divider} />
                            <div style={des}>
                                <Typography>{getDes()}</Typography>
                            </div>
                            <Divider style={divider} />
                            <div>
                                <Comment videoId={props.location.state.object} />
                            </div>
                        </div>
                    </Paper>
                </Container>
            </div>
        </div>
    )
}
const MapStatetoProps = (state) => ({ video: state.video, user: state.user })
export default connect(MapStatetoProps)(VideoPlayer)
import UserAppbar from '../Dashboard/user.appbar';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { connect } from 'react-redux';
import { Button, Container, Divider, Paper, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Comment from './Comments/index';
import { useHistory } from 'react-router-dom';
import LikesDislikes from './LikesDislikes/LikesDislikes';
import Loader from '../Dashboard/loader';

const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #202020)', backgroundSize: 'cover', height: 'auto', zIndex: -1, backgroundAttachment: 'fixed' }
const playerWarp = { postion: 'relative'/* Player ratio: 100 / (1600 / 900) */ }
const player = { border: '1px solid lightgrey', margin: 'auto', postion: 'absolute' }
const body = { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginTop: '80px', }
const paper = { background: 'none', border: 'none', marginTop: '20px' }
const des = { background: 'none', margin: '20px', textOverflow: 'ellipsis', overflow: 'hidden' }
const videotitle = { margin: '5px', display: 'flex', flexGrow: 1, }
const divider = { marginTop: '10px', width: '100%', }
const header = { display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 'inherit', margin: '5px', marginLeft: '-50px' }

function VideoPlayer(props) {
    const history = useHistory();

    console.log('props', props)
    const video_ID = props.location.state.video_id
    const title = props.location.state.title
    const description = props.location.state.description

    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

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
    const handleClick = () => {
        console.log('role', props.user.user_info.roles);
        if (props.user.user_info.roles === "admin") {
            history.push('/admin_dashboard')
        } else {
            history.push('/dashboard')
        }
    }
    console.log(props.location.state)
    return (
        <div style={root}>
            <UserAppbar />
            <div >
                {props.location.state !== null && loading === false ? (
                    <Container style={body}>
                        <div style={header}>
                            <IconButton onClick={handleClick} ><ArrowBackIcon /></IconButton>
                            <h2 style={videotitle}>{title}</h2>
                            <div>
                                <LikesDislikes videoId={props.location.state.object} />
                            </div>
                        </div>
                        <div style={playerWarp}>
                            <ReactPlayer style={player} width='75vw' height='70vh' controls={true} url={`http://www.youtube.com/watch?v=${video_ID}`} />
                        </div>
                        <Paper style={paper} elevation={0}>
                            <div>
                                <h3>Description</h3>
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
                ) : <Loader />}
            </div>
        </div>
    )
}
const MapStatetoProps = (state) => ({ video: state.video, user: state.user })
export default connect(MapStatetoProps)(VideoPlayer)
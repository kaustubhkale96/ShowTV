import React, { useEffect } from 'react'
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';
import { Container, Divider, Paper, Typography } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UserAppbar from './user.appbar';


const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #000000)', backgroundSize: 'cover', height: 'auto', zIndex: -1, backgroundAttachment: 'fixed' }
const body = { display: 'flex', flexWrap: 'wrap', marginTop: '80px' }
const paper = { margin: '8px', height: 280, width: 200, textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'lightgrey' }
const divider = { background: '#696969', margin: '8px', height: '1px' }
const videotitle = { margin: 'auto' }
const title = { marginTop: '1rem', marginLeft: '20px' }

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 110,
    }
};

const user = sessionStorage.getItem('username')
function UserDashboard(props) {
    console.log('props', props)

    useEffect(() => {
        props.get_video();
    }, [])

    const handleClick = (video_id, title, description, _id) => {
        props.history.push('/video/play', { video_id: video_id, title: title, description: description, object: _id });
    }

    return (
        <div style={root} fixed>
            <React.Fragment >
                <div>
                    <UserAppbar />
                </div>
                <div style={body}>
                    <Container maxWidth>
                        <Typography>Welcome, {user} !</Typography>
                        <h3 style={title}>All</h3>
                        <Carousel responsive={responsive} partialVisible={true} removeArrowOnDeviceType='mobile' swipeable={true} draggable={true} ssr={true}>
                            {props.video.videos.length > 0 && props.video.videos.map((item, index) => (
                                <div key={index} >
                                    <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                        <div >
                                            <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                            <div style={videotitle}>
                                                <h6>{item.title}</h6>
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            ))}
                        </Carousel>
                        <div>
                            <Divider style={divider} />
                        </div>
                        <h3 style={title}>Action</h3>
                        <Carousel responsive={responsive} partialVisible={true} removeArrowOnDeviceType='mobile' swipeable={true} draggable={true} ssr={true}>
                            {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Action').map((item, index) => (
                                <div key={index} >
                                    <Paper elevation={6} style={paper}>
                                        <div>
                                            <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                            <h6>{item.title}</h6>
                                        </div>
                                    </Paper>
                                </div>
                            ))}
                        </Carousel>
                        <div>
                            <Divider style={divider} />
                        </div>
                        <h3 style={title}>Action</h3>
                        <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                            {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Action').map((item, index) => (
                                <div key={index} >
                                    <Paper elevation={6} style={paper}>
                                        <div>
                                            <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                            <h6>{item.title}</h6>
                                        </div>
                                    </Paper>
                                </div>
                            ))}
                        </Carousel>
                        <div>
                            <Divider style={divider} />
                        </div>
                        <h3 style={title}>Action</h3>
                        <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                            {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Action').map((item, index) => (
                                <div key={index} >
                                    <Paper elevation={6} style={paper}>
                                        <div>
                                            <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                            <h6>{item.title}</h6>
                                        </div>
                                    </Paper>
                                </div>
                            ))}
                        </Carousel>
                    </Container>
                </div>
            </React.Fragment>
        </div>
    )
}
const mapStateToProps = (state) => ({ video: state.video, user: state.user, googleUser: state.user })

export default connect(mapStateToProps, { get_video })(UserDashboard)

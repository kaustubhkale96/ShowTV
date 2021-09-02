import { Button, Container, Divider, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AdminAppbar from './admin.appbar';
import Loader from './loader';
import SearchBar from './searchbar';
import EditDailog from '../Dialog/editdailog';
import DeleteDailog from '../Dialog/deleteDialog';


const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #000000)', backgroundSize: 'cover', height: 'auto', zIndex: -1, backgroundAttachment: 'fixed' }
const body = { display: 'flex', flexWrap: 'wrap', marginTop: '80px', zIndex: 0 }
const paper = { margin: '8px', height: 280, width: 200, textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'lightgrey' }
const divider = { background: '#696969', margin: '8px', height: '1px' }
const videotitle = { margin: 'auto' }
const title = { marginTop: '1rem', marginLeft: '20px' }
const head = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem' }
const searchbar = { postion: 'relative', zIndex: 2 }
const button = { display: 'flex', alignItems: 'center', justifyContent: 'space-around' }
const carousel = { display: 'block', justifyContent: 'center', width: 'fit-content' }

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 3,
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

const user = sessionStorage.getItem('username');
const AdminDashboard = (props) => {
    console.log(props)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.get_video();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        const id = props.id;
        console.log(id)
    }

    const handleClick = (video_id, title, description, _id) => {
        props.history.push(`/video/play`, { video_id: video_id, title: title, description: description, object: _id });
    }

    const videoArray = props.video.videos
    console.log(videoArray)
    const shuffleVideo = videoArray.sort(() => Math.random() - 0.5)
    console.log('shuffle', shuffleVideo)
    return (
        <div style={root} fixed>
            <React.Fragment >
                <div>
                    <AdminAppbar />
                </div>
                <div style={body}>
                    {props.video.vidoes !== null && loading === false ? (
                        <Container maxWidth>
                            <div style={head}>
                                <Typography >Welcome, {user} !</Typography>
                                <div style={searchbar}>
                                    <SearchBar />
                                </div>
                            </div>
                            <h3 style={title}>All</h3>
                            <Carousel responsive={responsive} partialVisible={true} removeArrowOnDeviceType='mobile' swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Container>
                                            <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                                <div >
                                                    <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                    <div style={videotitle}>
                                                        <h6>{item.title}</h6>
                                                    </div>
                                                </div>
                                            </Paper>
                                            <div style={button}>
                                                <EditDailog video={item} />
                                                <DeleteDailog video={item} />
                                            </div>
                                        </Container>
                                    </div>

                                ))}
                            </Carousel>
                            <div>
                                <Divider style={divider} />
                            </div>
                            <h3>Action</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Action').map((item, index) => (
                                    <div key={index} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
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
                            <h3>Comedy</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Comedy').map((item, index) => (
                                    <div key={index} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
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
                            <h3>Drama</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Drama').map((item, index) => (
                                    <div key={index} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
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
                            <h3>Horror</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Horror').map((item, index) => (
                                    <div key={index} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
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
                            <h3>Thriller</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Thriller').map((item, index) => (
                                    <div key={index} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
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
                        </Container>
                    ) : <Loader />}
                </div>

            </React.Fragment>
        </div>
    )
}
const mapStateToProps = (state) => ({
    video: state.video,
})
export default connect(mapStateToProps, { get_video })(AdminDashboard)

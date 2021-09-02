import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';
import { Container, Divider, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import UserAppbar from './user.appbar';
import Loader from './loader';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";


const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #000000)', backgroundSize: 'cover', height: 'auto', zIndex: -1, backgroundAttachment: 'fixed' }
const body = { display: 'flex', flexWrap: 'wrap', marginTop: '80px' }
const paper = { margin: '8px', height: 280, width: 200, textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'lightgrey' }
const divider = { background: '#696969', margin: '8px', height: '1px' }
const videotitle = { margin: 'auto' }
const title = { marginTop: '1rem', marginLeft: '20px' }
const head = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem' }
const searchbar = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto', color: 'white', }
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

function UserDashboard(props) {
    console.log('props', props)
    console.log('user', props.user.user_info.username)
    const user = props.user.user_info.username

    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearchText] = useState("")
    useEffect(() => {
        props.get_video();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])


    const searchVideo = (e) => {
        const searchText = e.target.value;
        setSearchText(searchText);
        setSearchData([
            ...props.video.videos.filter((item) => {
                console.log('search result', item.title);
                if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
                return false;
            }),
        ]);
    }

    const clearSearch = () => {
        setSearchData([]);
        setSearchText("");
    }

    const handleClick = (video_id, title, description, _id) => {
        props.history.push('/video/play', { video_id: video_id, title: title, description: description, object: _id });
    }

    const videoArray = props.video.videos
    console.log(videoArray)
    const shuffleVideo = videoArray.sort(() => Math.random() - 0.5)
    console.log('shuffle', shuffleVideo)

    return (
        <div style={root} fixed>
            <React.Fragment >
                <div>
                    <UserAppbar />
                </div>
                <div style={body}>
                    {props.video.vidoes !== null && loading === false ? (
                        <Container maxWidth>
                            <div style={head}>
                                <Typography >Welcome, {user} !</Typography>
                                <div style={searchbar}>
                                    <TextField size="small" value={search} onChange={searchVideo} type='text' placeholder=' Search' />
                                    <IconButton type="submit" aria-label="search">
                                        {searchData.length === 0 ? <SearchIcon /> : <CloseIcon onClick={clearSearch} />}
                                    </IconButton>
                                </div>
                            </div>
                            <h3 style={title}>All</h3>
                            <Carousel responsive={responsive} partialVisible={true} removeArrowOnDeviceType='mobile' swipeable={true} draggable={true} ssr={true}>
                                {searchData.length > 0 ? searchData.map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                            <div >
                                                <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                <div style={videotitle}>
                                                    <h6>{item.title}</h6>
                                                </div>
                                            </div>
                                        </Paper>
                                    </div>
                                ))
                                    : props.video.videos.length > 0 && props.video.videos.map((item, index) => (
                                        <div key={index} style={carousel} >
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
const mapStateToProps = (state) => ({ video: state.video, user: state.user })

export default connect(mapStateToProps, { get_video })(UserDashboard)

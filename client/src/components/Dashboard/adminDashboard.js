import { Container, Divider, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AdminAppbar from './admin.appbar';
import Loader from './loader';
import EditDailog from '../Dialog/editdailog';
import DeleteDailog from '../Dialog/deleteDialog';


const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #000000)', backgroundSize: 'cover', height: 'auto', zIndex: -1, backgroundAttachment: 'fixed' }
const body = { display: 'flex', flexWrap: 'wrap', marginTop: '80px', }
const paper = { margin: '8px', height: 280, width: 200, textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'lightgrey' }
const divider = { background: '#696969', margin: '8px', height: '1px' }
const videotitle = { margin: 'auto' }
const title = { marginTop: '1rem', marginLeft: '20px' }
const head = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem' }
const searchbar = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto', color: 'white', }
const button = { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }
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
    console.log(props.video.videos)
    const handleClick = (video_id, title, description, _id) => {
        props.history.push(`/video/play`, { video_id: video_id, title: title, description: description, object: _id });
    }
    const clearSearch = () => {
        setSearchData([]);
        setSearchText("");
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
                    {props.video.videos !== null && loading === false ? (
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
                                        <div style={button}>
                                            <EditDailog video={item} />
                                            <DeleteDailog video={item} />
                                        </div>
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
                                            <div style={button}>
                                                <EditDailog video={item} />
                                                <DeleteDailog video={item} />
                                            </div>
                                        </div>
                                    ))}
                            </Carousel>

                            <div>
                                <Divider style={divider} />
                            </div>
                            <h3>Action</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Action').map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                            <div>
                                                <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                <h6>{item.title}</h6>
                                            </div>
                                        </Paper>
                                        <div style={button}>
                                            <EditDailog video={item} />
                                            <DeleteDailog video={item} />
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                            <div>
                                <Divider style={divider} />
                            </div>
                            <h3>Comedy</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Comedy').map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                            <div>
                                                <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                <h6>{item.title}</h6>
                                            </div>
                                        </Paper>
                                        <div style={button}>
                                            <EditDailog video={item} />
                                            <DeleteDailog video={item} />
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                            <div>
                                <Divider style={divider} />
                            </div>
                            <h3>Drama</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Drama').map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                            <div>
                                                <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                <h6>{item.title}</h6>
                                            </div>
                                        </Paper>
                                        <div style={button}>
                                            <EditDailog video={item} />
                                            <DeleteDailog video={item} />
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                            <div>
                                <Divider style={divider} />
                            </div>
                            <h3>Horror</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Horror').map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                            <div>
                                                <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                <h6>{item.title}</h6>
                                            </div>
                                        </Paper>
                                        <div style={button}>
                                            <EditDailog video={item} />
                                            <DeleteDailog video={item} />
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                            <div>
                                <Divider style={divider} />
                            </div>
                            <h3>Thriller</h3>
                            <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                                {props.video.videos.length > 0 && props.video.videos.filter(item => item.category === 'Thriller').map((item, index) => (
                                    <div key={index} style={carousel} >
                                        <Paper elevation={6} style={paper} onClick={() => handleClick(item.video_id, item.title, item.description, item._id)}>
                                            <div>
                                                <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                                <h6>{item.title}</h6>
                                            </div>
                                        </Paper>
                                        <div style={button}>
                                            <EditDailog video={item} />
                                            <DeleteDailog video={item} />
                                        </div>
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

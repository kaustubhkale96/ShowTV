import React, { useEffect } from 'react'
import SwipeableTemporaryDrawer from './sidebar'
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const UserDashboard = (props) => {
    const root = { display: 'flex', flexWrap: 'wrap', height: '80vh', marginTop: '80px' }
    const paper = { margin: '8px', height: 300, width: 200, alignItems: 'center', textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer' }

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
            items: 1
        }
    };


    useEffect(() => {
        props.get_video();
    }, [])

    return (
        <React.Fragment >
            <div>
                <SwipeableTemporaryDrawer />
            </div>
            <div style={root}>
                <Container maxWidth='xl'>
                    <h3>All</h3>
                    <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                        {props.video.videos.length > 0 && props.video.videos.map((item, index) => (
                            <div key={index} >
                                <Paper elevation={6} style={paper} href='video/play' to={{ props: item.video_id }}>
                                    <div >
                                        <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={260} width={200} />
                                        <h6>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                    </Carousel>
                    <h3>Action</h3>
                    <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                        {props.video.videos.length > 0 && props.video.videos.map((item, index) => (
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
                    <h3>Action</h3>
                    <Carousel responsive={responsive} swipeable={true} draggable={true} ssr={true}>
                        {props.video.videos.length > 0 && props.video.videos.map((item, index) => (
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
    )
}
const mapStateToProps = (state) => ({ video: state.video })

export default connect(mapStateToProps, { get_video })(UserDashboard)

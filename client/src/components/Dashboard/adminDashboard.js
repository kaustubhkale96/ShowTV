import { VideoCameraFilled } from '@ant-design/icons';
import { AppBar, Button, Container, makeStyles, Toolbar, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UploadDailog from '../Dialog/uploadDailog';
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: "rgba(0,0,0,0.6)",
        opacity: '95%',
        zIndex: "0"
    },
    appbarWrap: {
        width: '90%',
        margin: '0 auto',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        flexGrow: 1,
    },
    colorText: {
        color: '#FFDF00'
    }
}));
const root = { display: 'flex', justifyContent: 'center', alignItems: 'center', }
const icon = { marginLeft: '8px', marginBottom: '4px', color: '#FFDF00', fontSize: '38px', }
const logout = { padding: '8px', margin: '8px', color: "red", border: "1px solid ", fontWeight: 'bold' }
const logoName = { borderBottom: '2px solid white' }
const paper = { margin: '8px', height: 300, width: 200, alignItems: 'center', textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer' }
const body = { marginTop: '100px' }

const AdminDashboard = (props) => {
    const classes = useStyles();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
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
            <div style={root}>
                <AppBar className={classes.appbar} elevation={0}>
                    <Toolbar className={classes.appbarWrap}>
                        <div className={classes.logo}>
                            <h3 style={logoName}>SHOW<span className={classes.colorText}>TV</span></h3>
                            <VideoCameraFilled style={icon} />
                        </div>
                        <div>
                            <Button ><UploadDailog /></Button>
                            <Button style={logout} component={Link} to={'/logout'}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={body}>
                    <Container fixed maxWidth='xl'>
                        <h3>All</h3>
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

            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    video: state.video,
})
export default connect(mapStateToProps, { get_video })(AdminDashboard)

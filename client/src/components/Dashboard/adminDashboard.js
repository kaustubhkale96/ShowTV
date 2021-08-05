import { VideoCameraFilled } from '@ant-design/icons';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UploadDailog from '../Dialog/uploadDailog';
import { Image } from 'cloudinary-react';
import { get_video } from '../../Actions/videos.actions';
import { connect } from 'react-redux';

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
        fontSize: '2rem',
        fontWeight: '400',
        flexGrow: 1,
    },
    colorText: {
        color: '#FFDF00'
    }
}));
const root = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }
const icon = { marginLeft: '8px', marginBottom: '4px', color: '#FFDF00', fontSize: '38px', }
const logout = { padding: '8px', margin: '8px', color: "red", border: "1px solid ", fontWeight: 'bold' }
const logoName = { borderBottom: '2px solid white' }

const AdminDashboard = (props) => {
    const classes = useStyles();
    const [videoData, setData] = useState([]);

    useEffect(() => {
        props.get_video();
    }, [])

    return (
        <React.Fragment >
            <div style={root}>
                <AppBar className={classes.appbar} elevation={0}>
                    <Toolbar className={classes.appbarWrap}>
                        <div className={classes.logo}>
                            <h1 style={logoName}>SHOW<span className={classes.colorText}>TV</span></h1>
                            <VideoCameraFilled style={icon} />
                        </div>
                        <div>
                            <Button ><UploadDailog /></Button>
                            <Button style={logout} component={Link} to={'/logout'}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div>
                    {props.video.videos.length > 0 && props.video.videos.map((item) => (
                        <div >
                            <Image cloudName='kilo' public_id={item.thumbnail} crop='scale' height={138} width={246} />
                            <h4>{item.title}</h4>
                        </div>
                    ))}
                </div>

            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    video: state.video,
})
export default connect(mapStateToProps, { get_video })(AdminDashboard)

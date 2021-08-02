import { VideoCameraFilled } from '@ant-design/icons';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import UploadDailog from '../Dialog/uploadDailog';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: "rgba(0,0,0,0.6)",
        opacity: '95%',
    },
    appbarWrap: {
        width: '90%',
        margin: '0 auto',
        // borderBottom: '2px solid white'
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
    },
    drawerHeader: {
    },
}));
const root = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }
const icon = { marginLeft: '8px', marginRight: '25px', color: '#FFDF00' }
const button = {}
const logout = { padding: '8px', margin: '8px', color: "red", border: "1px solid ", fontWeight: 'bold' }
// const dashboard = { padding: '8px', margin: '8px', color: "#3399ff", border: "1px solid", fontWeight: 'bold' }
export default function AdminDashboard() {
    const classes = useStyles();
    return (
        <React.Fragment >
            <div style={root}>
                <AppBar className={classes.appbar} elevation={0}>
                    <Toolbar className={classes.appbarWrap}>
                        <h1 className={classes.logo}>SHOW<span className={classes.colorText}>TV</span><VideoCameraFilled style={icon} /></h1>
                        <div style={button}>
                            <Button ><UploadDailog /></Button>
                            <Button style={logout} component={Link} to={'/logout'}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.drawerHeader}>
                    Hello admin
                </div>
            </div>
        </React.Fragment>
    )
}

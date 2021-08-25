import { VideoCameraFilled } from '@ant-design/icons'
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import UploadDailog from '../Dialog/uploadDailog'

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: "rgba(0,0,0,0.6)",
        opacity: '95%',
        zIndex: 1
    },
    appbarWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

const icon = { marginLeft: '8px', marginBottom: '4px', color: '#FFDF00', fontSize: '2rem', }
const logout = { padding: '8px', margin: '5px', color: "red", border: "1px solid ", fontWeight: 'bold', height: '40px' }
const logoName = { borderBottom: '2px solid white' }
const button = { display: 'flex', alignItems: 'center', }

export default function AdminAppbar() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar className={classes.appbar} >
                <Toolbar className={classes.appbarWrap}>
                    <div className={classes.logo}>
                        <h3 style={logoName}>SHOW<span className={classes.colorText}>TV</span></h3>
                        <VideoCameraFilled style={icon} />
                    </div>
                    <div style={button}>
                        <Button ><UploadDailog /></Button>
                        <Button style={logout} component={Link} to={'/logout'}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

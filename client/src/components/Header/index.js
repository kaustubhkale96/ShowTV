import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import FormDialog from '../Dialog/logindailog';
import Login from '../Login';
import { VideoCameraFilled } from '@ant-design/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    },
    appbar: {
        background: 'none',
    },
    appbarWrap: {
        width: '92%',
        margin: '0 auto',
        borderBottom: '2px solid white'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        width: '6.75rem',
        height: '2rem',
        flexGrow: 1,
    },
    colorText: {
        color: '#FFDF00'
    },
    container: {
        textAlign: 'center',
        color: '#fff',
    },
    title: {
        fontSize: '3.125rem',
        fontWeight: 'bold',
        margin: '25px'
    },
}))
const icon = { marginLeft: '8px', color: '#FFDF00' }
export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrap}>
                    <h1 className={classes.logo}>SHOW<span className={classes.colorText}>TV</span><VideoCameraFilled style={icon} /></h1>
                    <FormDialog title="LOGIN" ><Login /></FormDialog>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <h1 className={classes.title}>Unlimited movies,<br />TV shows and more.</h1>
                <h4>Watch anywhere. Cancel anytime.</h4>
            </div>
        </div>
    )
}

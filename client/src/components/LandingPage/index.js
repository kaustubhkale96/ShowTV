import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../Header';
import image from '../../assets/bg.png';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${image})`,
        height: '100vh',
        backgroundSize: 'cover'
    }
}));
const body = { background: 'rgba(0, 0, 0, 0.6)', height: '100vh' }
export default function LandingPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div style={body}>
                <CssBaseline />
                <Header />
            </div>
        </div>
    )
}

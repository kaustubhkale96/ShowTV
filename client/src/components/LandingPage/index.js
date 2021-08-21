import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../Header';
import image from '../../assets/bg.png';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${image})`,
        height: '100vh',
        backgroundSize: 'cover'
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
}));
const body = { background: 'rgba(0, 0, 0, 0.6)', height: '100vh' }
export default function LandingPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div style={body}>
                <CssBaseline />
                <Header />
                <div className={classes.container}>
                    <h1 className={classes.title}>Unlimited movies,<br />TV shows and more.</h1>
                    <h5>Watch anywhere, anytime.</h5>
                    <div>
                        <h4>New to ShowTV, <span><Link to='/register'>Register Here!</Link></span></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

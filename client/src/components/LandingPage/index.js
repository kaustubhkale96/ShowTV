import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../Header';
// import Carousel from '../Carousel'
const useStyles = makeStyles((theme) => ({
    root: {
    }
}));
export default function LandingPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            {/* <Carousel /> */}
        </div>
    )
}

import { Button, Container, Typography } from '@material-ui/core'
import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/black-bg.jpg';

const root = { backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '100vh' }
const body = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'white' }
const btn = { color: 'white', border: '1px solid white', marginTop: '1rem' }
const error = { color: 'white', fontSize: '12rem', textShadow: '5px 10px 8px #C0C0C0' }
const whop = { fontSize: '2rem', fontWeight: 'bold', margin: '8px' }
const text = { fontSize: '1rem', margin: '8px' }
export default function PageNotFound() {
    return (
        <div style={root}>
            <Container style={body}>
                <Typography style={error}>404</Typography>
                <Typography style={whop}>Whoops!</Typography>
                <Typography style={text}>We couldn't find the site your looking for.</Typography>
                <div>
                    <Button style={btn} component={Link} to={'/logout'}>Back to Home</Button>
                </div>
            </Container>
        </div>
    )
}

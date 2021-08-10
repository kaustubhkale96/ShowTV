import PersistentDrawerLeft from '../Dashboard/sidebar';
import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { connect } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const root = { display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #C0C0C0, #202020)', backgroundSize: 'cover', height: 'auto', zIndex: -1, backgroundAttachment: 'fixed' }
const player = { border: '1px solid lightgrey', margin: 'auto' }
const body = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '80px', }
const paper = { background: 'none', border: 'none', marginTop: '20px' }
const des = { background: 'none', margin: '5px', }
const videotitle = { margin: '5px', }
const divider = { marginTop: '10px', background: '#696969', }
const sum = {}


function VideoPlayer(props) {
    console.log('props', props)
    const video_ID = props.location.state.video_id
    const title = props.location.state.title
    const description = props.location.state.description
    return (
        <div style={root}>
            <PersistentDrawerLeft />
            <div >
                <Container style={body}>
                    <ReactPlayer style={player} width='90vw' height='75vh' controls={true} url={`http://www.youtube.com/watch?v=${video_ID}`} />
                    <div style={paper}>
                        <h2 style={videotitle}>{title}</h2>
                        <Divider style={divider} />
                        <div>
                            <Accordion style={des} elevation={0}  >
                                <AccordionSummary style={sum} expandIcon={<ExpandMoreIcon />}>
                                    <h4>Description</h4>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <h5>{description}</h5>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
const MapStatetoProps = (state) => ({ video: state.video })
export default connect(MapStatetoProps)(VideoPlayer)
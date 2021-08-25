import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { add_video } from '../../Actions/videos.actions'
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const dailogBox = {
    minWidth: '600px',
    boxShadow: 3
}
const upload = { padding: '8px', margin: '8px', color: "#19B5FE", border: "1px solid", fontWeight: 'bold' }
const form = { display: 'flex', flexDirection: 'column', width: '570px', margin: '8px', padding: '8px', }

const Categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Thriller']

function UploadDailog(props) {

    const { addToast } = useToasts();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [video_id, setVideoId] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        if (name === 'title') { setTitle(value) }
        if (name === 'description') { setDescription(value) }
        if (name === 'category') { setCategory(value) }
        if (name === 'thumbnail') {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setThumbnail(reader.result)
                console.log('reader_result=', reader.result)
            }
        }
        if (name === 'video_id') { setVideoId(value) }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('video_id', video_id);
            props.add_video({ title, description, category, thumbnail, video_id });
            setOpen(false);
            addToast("Video Uploaded", { appearance: 'success', autoDismiss: true })
            setTimeout(() => {
                window.location.reload('/admin_dashboard')
            }, 4000)
        }
    }
    const validate = () => {
        if (title === '') {
            return false;
        }
        return true;
    }
    const handleCategory = (e) => {
        console.log('ctaegory', e.target.value);
        setCategory(e.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button style={upload} onClick={handleClickOpen}>Upload</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div style={dailogBox}>
                    <DialogTitle id="form-dialog-title">Upload your Video</DialogTitle>
                    <DialogContent>
                        <Grid container align='center' fullWidth justifyContent='center'>
                            <Paper elevation={20} >
                                <Grid >
                                    <form style={form} onSubmit={handleSubmit}>
                                        <div style={{ margin: '12px' }} >
                                            <TextField onChangeCapture={handleInputChange} label="Title" variant="outlined" fullWidth required type="text" name="title" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Description" variant="outlined" fullWidth required type="text" multiline rows={4} name="description" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <FormControl variant="outlined" fullWidth required >
                                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                                <Select name='category' onChange={handleCategory} label="Category">
                                                    {Categories.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Thumbnail" variant="outlined" fullWidth required type="file" name="thumbnail" InputLabelProps={{ shrink: true, }} />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Video ID" variant="outlined" fullWidth required type="text" name="video_id" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <Button type="submit" variant='contained' color="primary" fullWidth  >Upload</Button>
                                        </div >
                                        <div style={{ margin: '12px' }}>
                                            <Button variant='contained' color="secondary" fullWidth onClick={handleClose} >Cancel</Button>
                                        </div>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}
const MapStatetoProps = (state) => ({
    videos: state.videos
});

export default connect(MapStatetoProps, { add_video })(UploadDailog)
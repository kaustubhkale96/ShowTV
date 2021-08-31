import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { edit_video, get_video } from '../../Actions/videos.actions'


const dailogBox = {
    minWidth: '600px',
    boxShadow: 3
}
const edit = { color: "#19B5FE", fontWeight: 'bold', fontSize: '10px', }
const form = { display: 'flex', flexDirection: 'column', width: '570px', margin: '8px', padding: '8px', }

const Categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Thriller']

function EditDailog(props) {
    const history = useHistory();
    const videoId = props.videos
    console.log(videoId)
    const { id } = useParams();
    const { addToast } = useToasts();
    const [open, setOpen] = React.useState(false);
    const [editVideo, setEditVideo] = useState({
        title: '',
        description: '',
        category: '',
        thumbnail: '',
        video_id: '',
        laoding: false,
    });
    useEffect(() => {
        const getVideoById = async () => {
            await axios.get(`https://localhost:5000/api/video/get/${id}`)
                .then((res) => {
                    console.log(res);
                    setEditVideo({
                        title: res.data.title,
                        description: res.data.description,
                        category: res.data.category,
                        thumbnail: res.data.thumbnail,
                        video_id: res.data.video_id,
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        };
        getVideoById();
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditVideo({
            [name]: value,
        })
        console.log('input', setEditVideo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditVideo({ loading: true });
        const title = editVideo.title;
        const description = editVideo.description;
        const category = editVideo.category;
        const thumbnail = editVideo.thumbnail;
        const video_id = editVideo.video_id;

        const editVideo = async () => {
            await axios.put('http://localhost:5000/api/video/:id', { title, description, category, thumbnail, video_id })
                .then((response) => {
                    console.log('put res', response);
                })
                .catch((error) => {
                    console.log('put errror', error)
                })
        };
        editVideo();
        setTimeout(() => {
            history.push('/admin_dashboard')
        }, 1500);
    }

    // const handleCategory = (e) => {
    //     console.log('ctaegory', e.target.value);
    //     setCategory(e.target.value);
    // }

    return (
        <div>
            <Button variant='outlined' style={edit} onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div style={dailogBox}>
                    <DialogTitle id="form-dialog-title">Edit your Video</DialogTitle>
                    <DialogContent>
                        <Grid container align='center' fullWidth justifyContent='center'>
                            <Paper elevation={20} >
                                <Grid >
                                    <form style={form} onSubmit={handleSubmit}>
                                        <div style={{ margin: '12px' }} >
                                            <TextField onChangeCapture={handleInputChange} label="Title" variant="outlined" fullWidth required type="text" value={editVideo.title} name="title" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Description" variant="outlined" fullWidth required type="text" multiline rows={4} value={editVideo.description} name="description" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <FormControl variant="outlined" fullWidth required >
                                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                                <Select name='category' label="Category" value={editVideo.category}>
                                                    {Categories.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Thumbnail" value={editVideo.thumbnail} variant="outlined" fullWidth required type="file" name="thumbnail" InputLabelProps={{ shrink: true, }} />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Video ID" value={editVideo.video_id} variant="outlined" fullWidth required type="text" name="video_id" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <Button type="submit" variant='contained' color="primary" fullWidth  >Save</Button>
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
    )
}
export default EditDailog

import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'


const dailogBox = {
    minWidth: '600px',
    boxShadow: 3
}
const edit = { color: "#19B5FE", fontWeight: 'bold', fontSize: '10px', border: "1px solid grey" }
const form = { display: 'flex', flexDirection: 'column', width: '570px', margin: '8px', padding: '8px', }

const Categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Thriller']

function EditDailog(props) {
    const videoId = props.video._id
    const { addToast } = useToasts();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState(props.video.title);
    const [category, setCategory] = useState(props.video.category);
    const [description, setDescription] = useState(props.video.description);
    const [thumbnail, setThumbnail] = useState(props.video.thumbnail);
    const [video_id, setVideo_id] = useState(props.video.video_id);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'title') { setTitle(value) }
        if (name === 'description') { setDescription(value) }
        if (name === 'category') { setCategory(value) }
        if (name === 'video_id') { setVideo_id(value) }
        if (name === 'thumbnail') {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setThumbnail(reader.result)
                console.log('reader_result=', reader.result)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/video/${videoId}`, { _id: videoId, title, description, category, thumbnail, video_id })
            .then((response) => {
                console.log(response);
                setOpen(false);
                addToast('Video Edited !', { appearance: "success", autoDismiss: true })
                setTimeout(() => {
                    window.location.reload('/admin_dashboard')
                }, 1500)
            })
            .catch((error) => {
                console.log(error)
                addToast('Video Edit Failed !', { appearance: "error", autoDismiss: true })
            })

    };
    return (
        <div>
            <Button variant='outlined' style={edit} onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <div style={dailogBox}>
                    <DialogTitle id="form-dialog-title">Edit your Video</DialogTitle>
                    <DialogContent>
                        <Grid container align='center' fullWidth justifyContent='center'>
                            <Paper elevation={20} >
                                <Grid >
                                    <form style={form} onSubmit={handleSubmit}>
                                        <div style={{ margin: '12px' }} >
                                            <TextField onChangeCapture={handleInputChange} label="Title" variant="outlined" fullWidth required type="text" value={title} name="title" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Description" variant="outlined" fullWidth required type="text" multiline rows={4} value={description} name="description" />
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <FormControl variant="outlined" fullWidth required >
                                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                                <Select name='category' label="Category" onChange={handleInputChange} value={category}>
                                                    {Categories.map((item, index) => (
                                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div style={{ margin: '12px' }}>
                                            <TextField onChangeCapture={handleInputChange} label="Video ID" value={video_id} variant="outlined" fullWidth required type="text" name="video_id" />
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

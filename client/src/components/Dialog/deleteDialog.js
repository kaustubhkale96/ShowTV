import { Button, Dialog, DialogContent, DialogTitle, } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useToasts } from 'react-toast-notifications';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


const dailogBox = {
    minWidth: 'auto',
    boxShadow: 3
}
const del = { color: "red", fontWeight: 'bold', fontSize: '10px', }
const paper = { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: 'auto', margin: '8px', padding: '8px', }


function DeleteDailog(props) {
    const { addToast } = useToasts();
    const [open, setOpen] = React.useState(false);
    const title = props.video.title;
    const video_id = props.video._id;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/video/${video_id}`)
            .then(res => {
                console.log(res.data);
                setOpen(false);
                addToast('Video Deleted !', { appearance: "success", autoDismiss: true })
                setTimeout(() => {
                    window.location.reload('/admin_dashboard')
                }, 1500)
            })
            .catch(err => {
                console.log(err)
                addToast('Cannot Delete Video', { appearance: "error", autoDismiss: true })
            })
    }


    return (
        <div>
            <Button style={del} onClick={handleClickOpen}><DeleteOutlineOutlinedIcon /></Button>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <div style={dailogBox}>
                    <DialogTitle id="form-dialog-title">Are you sure to Delete : {title} ?</DialogTitle>
                    <DialogContent style={paper}>
                        <div style={{ margin: '10px' }} >
                            <Button type="submit" variant='contained' color="secondary" onClick={handleDelete}>Delete</Button>
                        </div >
                        <div >
                            <Button variant='contained' color="primary" onClick={handleClose} >Cancel</Button>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    )
}
export default DeleteDailog

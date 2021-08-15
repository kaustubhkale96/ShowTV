import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { registerUser } from '../../apis/registerUser'
import { Avatar, Grid, Paper, TextField, Typography, Button, Divider, AppBar, Toolbar } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import image from '../../assets/bg.png'
import { VideoCameraFilled } from '@ant-design/icons'

export default function Register() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const roles = ['user', 'user']
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { addToast } = useToasts()

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        if (name === 'username') { setUsername(target.value) }
        if (name === 'password') { setPassword(target.value) }
        if (name === 'email') { setEmail(target.value) }
    }

    const submitData = async () => {
        try {
            const data = await registerUser(username, email, password, roles)
            if (data.status === 200) {
                addToast('User registered successfully!', { appearance: "success", autoDismiss: 1000 })
                setTimeout(() => {
                    window.location.replace('/')
                }, 1500)
            }
        }
        catch (e) {
            console.log(e)
            addToast('Something went wrong', { appearance: 'error', autoDismiss: 1000 })
        }
    }
    const paperStyle = {
        marginTop: '10rem',
        padding: '20px 20px',
        width: 350,
        opacity: '90%',
    }
    const avatarStyle = {
        backgroundColor: '#2596be'
    }
    const header = { marginTop: 0 }
    const button = { marginBottom: '10px' }
    const para = { margin: '10px', fontSize: '15px' }
    const buttonIcon = { marginLeft: '5px', fontSize: '5px' }
    const logo = { display: 'flex', alignItems: 'center', color: '#fff', width: '6.75rem', height: '2rem', flexGrow: 1, }
    const colortext = { color: '#FFDF00' }
    const appbar = { background: 'none', zIndex: 0 }
    const logowarp = { width: '92%', margin: '0 auto', borderBottom: '2px solid white' }
    const home = { color: '#fff', marginBottom: '5px' }
    const root = { backgroundImage: `url(${image})`, height: '100vh', backgroundSize: 'cover' }
    const body = { background: 'rgba(0, 0, 0, 0.6)', height: '100vh' }
    const divider = { margin: '5px' }
    const icon = { marginLeft: '8px', color: '#FFDF00' }
    return (
        <React.Fragment>
            <div style={root}>
                <div style={body}>
                    <AppBar style={appbar}>
                        <Toolbar style={logowarp}>
                            <h1 style={logo}>SHOW<span style={colortext}>TV</span><VideoCameraFilled style={icon} /></h1>
                            <Button style={home} variant="contained" color="secondary" component={Link} to={'/'}>Home</Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container align='center' justifyContent='center'>
                        <Paper elevation={20} style={paperStyle}>
                            <Grid >
                                <form onSubmit={handleSubmit(submitData)}>
                                    <div >
                                        <Avatar style={avatarStyle}><AccountCircleIcon /></Avatar>
                                        <h2 style={header}>Register Here</h2>
                                        <Divider />
                                        <Typography style={para}>Please fill this form to create an account !</Typography>
                                        <TextField label="Username" variant="outlined" fullWidth required {...register('username', { required: true })} onChangeCapture={handleInputChange} type="text" name="username" />
                                        <p >{errors.username && "Username is required"}</p>
                                        <TextField label="Email" variant="outlined" fullWidth required {...register('email', { required: true })} onChangeCapture={handleInputChange} type="email" name="email" />
                                        <p >{errors.email && "Email is required"}</p>
                                        <TextField label="Password" variant="outlined" fullWidth required {...register('password', { required: true })} onChangeCapture={handleInputChange} type="password" name="password" />
                                        <p >{errors.password && "Password is required"}</p>
                                        <Button type="submit" variant='contained' color="primary" fullWidth style={button} >Create Account<span style={buttonIcon}><ExitToAppRoundedIcon /></span></Button>
                                        <div >
                                            By signing up, you agree to the
                                            <a href="/" > Terms of Service </a>
                                            and
                                            <a href="/" > Privacy Policy</a>
                                        </div>
                                        <Divider style={divider} />
                                        <div >
                                            <p>Already have an account?<span><Link to="/" >Login</Link>.</span></p>
                                        </div>
                                    </div>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    )
}

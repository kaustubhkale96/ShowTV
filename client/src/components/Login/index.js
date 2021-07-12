import React, { useState } from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginUser } from '../../apis/loginUser'
import { useToasts } from 'react-toast-notifications'
import { makeStyles, Button, TextField, Divider } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons'

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        margin: '0 auto',
        width: '100%',
        backgroundColor: '#0F9D58',
        color: '#fff'
    },
    google: {
        display: 'flex',
        margin: '0 auto'
    },
    orhead: {
        display: 'flex',
        justifyContent: 'center'
    }
}));
const stylesGoogle = {
    display: 'flex',
    margin: '0 auto',
    fontSize: '18px',
    marginTop: '20px',
    marginBottom: '20px',
    width: '100%',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#4285F4',
    color: '#fff'
}
const googleIcon = {
    marginRight: '1rem'
}
const stylesFacebook = {
    display: 'flex',
    margin: '0 auto',
    fontSize: '18px',
    marginTop: '20px',
    marginBottom: '20px',
    width: '100%',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: '#4267B2',
    color: '#fff'
}
const facebookIcon = {
    marginRight: '1rem'
}

export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { addToast } = useToasts()

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        if (name === 'username') { setUsername(target.value) }
        if (name === 'password') { setPassword(target.value) }
    }

    const submitData = async () => {
        try {
            const data = await loginUser(username, password)
            if (data.status === 200) {
                addToast('Login Success!', { appearance: "success", autoDismiss: true })
                console.log('Login success...', data)
            }
        }
        catch (e) {
            console.log('User not found...', e)
            addToast('Something went wrong!', { appearance: 'error', autoDismiss: true })
        }
    }


    const responseSuccessGoogle = (response) => {
        console.log(response)
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/auth/googlelogin',
            data: { tokenId: response.tokenId }
        }).then(response => {
            addToast('Google Login Success!', { appearance: "success", autoDismiss: true })
            console.log("Google login success:", response);
        })
    }
    const responseFailureGoogle = (response) => { console.log(response) }

    const responseFacebook = (response) => {
        console.log(response)
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/auth/facebooklogin',
            data: { accessToken: response.accessToken, userID: response.userID }
        }).then(response => {
            addToast('Facebook Login Success!', { appearance: "success", autoDismiss: true })
            console.log("Facebook login success: ", response);
        })
    }

    return (
        <React.Fragment>

            <div className="login">
                <form className="login_form" onSubmit={handleSubmit(submitData)}>
                    <div>
                        <TextField id="outlined-basic" label="Username" variant="filled" type="text" name="username" fullWidth required {...register('username', { required: true })} onChangeCapture={handleInputChange} />
                        <p>{errors.username && "Username required"}</p>
                        <TextField id="outlined-basic" label="Password" variant="filled" type="password" name="password" fullWidth required {...register('password', { required: true })} onChangeCapture={handleInputChange} />
                        <p>{errors.password && "Password required"}</p>
                        <Button type="submit" variant="contained" className={classes.button} endIcon={<LockOpenIcon>send</LockOpenIcon>}>Login</Button>
                    </div>
                    <div><p className={classes.orhead}>OR</p>
                        <div >
                            <p>New to SHOWTV?<span><Link to="/register" >Register here</Link>.</span></p>
                        </div>
                        <Divider /></div>
                    <div>

                        <GoogleLogin
                            clientId="1073248472355-dv8f7054642rmmqoshu3rt491639b4jb.apps.googleusercontent.com"
                            render={renderProps => (
                                <button style={stylesGoogle} onClick={renderProps.onClick} disabled={renderProps.disabled}><span style={googleIcon}><GoogleOutlined /></span>Google Login</button>
                            )}
                            buttontext="Login"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseFailureGoogle}>
                        </GoogleLogin>
                    </div>
                    <div>
                        <FacebookLogin
                            appId="234716694949174"
                            render={renderProps => (
                                <button style={stylesFacebook} onClick={renderProps.onClick}><span style={facebookIcon}><FacebookFilled /></span>Facebook Login</button>
                            )}
                            autoLoad={false}
                            fields="name,email"
                            callback={responseFacebook}>
                        </FacebookLogin>
                    </div>

                </form>

            </div>
        </React.Fragment>
    )
}



import React, { useState } from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { loginUser } from '../../apis/loginUser'
import { useToasts } from 'react-toast-notifications'
import { makeStyles, Button, TextField, Divider, Grid, Container } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons'
import { setFacebookLogin, setGoogleLogin, setLoginUser } from '../../Actions/loginUserAction'

import { connect, useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        margin: '0 auto',
        width: '100%',
        backgroundColor: '#0F9D58',
        color: '#fff',
        "&$button:hover": {
            backgroundColor: '#49bb7b',
        },
    },
    google: {
        display: 'flex',
        margin: '0 auto'
    },
    orhead: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5px'
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
    display: 'flex',
    marginRight: '8px',
    padding: '1px',
    marginTop: '2px',
    fontSize: '18px',
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
    display: 'flex',
    marginRight: '8px',
    padding: '1px',
    marginTop: '2px',
    fontSize: '18px',
}

function Login() {
    const history = useHistory();
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

    const dispatch = useDispatch();
    const submitData = async () => {
        try {
            const data = await loginUser(username, password)
            if (data.status === 200) {
                setLoginUser(dispatch, data)
                if (data.data.roles === 'user') {
                    history.push('/dashboard')
                }
                else if (data.data.roles === 'admin') {
                    history.push('/admin_dashboard')
                }
                addToast('Login Success!', { appearance: "success", autoDismiss: true })
            }
        }
        catch (e) {
            addToast('Something went wrong!', { appearance: 'error', autoDismiss: true })
            setTimeout(() => {
                window.location.reload('/')
            }, 1000)
        }
    }


    const responseSuccessGoogle = (response) => {
        console.log(response)
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/auth/googlelogin',
            data: { tokenId: response.tokenId, name: response.profileObj.name, email: response.profileObj.email }

        })
            .then(response => {
                console.log(response.data)
                setGoogleLogin(dispatch, response)
                console.log('dispatch', response)
                sessionStorage.setItem('username', (response.data.username))
                // sessionStorage.setItem('id', (response.data.id))
                addToast('Google Login Success!', { appearance: "success", autoDismiss: true })
                history.push('/dashboard')
            });

    }
    const responseFailureGoogle = (response) => { console.log(response) }

    const responseFacebook = (response) => {
        console.log(response)
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/auth/facebooklogin',
            data: { accessToken: response.accessToken, userID: response.userID }
        }).then(response => {
            console.log(response.data.username)
            setFacebookLogin(dispatch, response)
            sessionStorage.setItem('username', (response.data.username))
            addToast('Facebook Login Success!', { appearance: "success", autoDismiss: true })
            history.push('/dashboard')
        })
    }

    return (
        <React.Fragment>

            <form className="login_form" onSubmit={handleSubmit(submitData)}>
                <div>
                    <TextField label="Username" variant="filled" type="text" name="username" fullWidth required {...register('username', { required: true })} onChangeCapture={handleInputChange} />
                    <p>{errors.username && "Username required"}</p>
                    <TextField label="Password" variant="filled" type="password" name="password" fullWidth required {...register('password', { required: true })} onChangeCapture={handleInputChange} />
                    <p>{errors.password && "Password required"}</p>
                    <Button variant="contained" type="submit" className={classes.button} endIcon={<LockOpenIcon>send</LockOpenIcon>}>Login</Button>
                </div>
                <div><p className={classes.orhead}>OR</p>
                    <div >
                        <p>New to SHOWTV? <span><Link to="/register" >Register Now</Link>.</span></p>
                    </div>
                    <Divider /></div>
                <div>

                    <GoogleLogin
                        clientId="1073248472355-dv8f7054642rmmqoshu3rt491639b4jb.apps.googleusercontent.com"
                        render={renderProps => (
                            <button style={stylesGoogle} onClick={renderProps.onClick} disabled={renderProps.disabled}><span style={googleIcon}><GoogleOutlined /></span>Google Login</button>
                        )}
                        buttontext="Login"
                        cookiePolicy={"single_host_origin"}
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

        </React.Fragment>
    )
}
const MapStatetoProps = (state) => ({ data: state.data, login: state.login, loading: state.loading })
const MapDispatchtoProps = { loginUser: loginUser }
export default connect(MapStatetoProps, MapDispatchtoProps)(Login)



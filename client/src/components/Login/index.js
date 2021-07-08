import React, { useState } from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../apis/loginUser'
import { useToasts } from 'react-toast-notifications'
export default function Login() {
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
            console.log("Facebook login success: ", response);
        })
    }

    return (
        <React.Fragment>

            <div className="login">
                <form className="login_form" onSubmit={handleSubmit(submitData)}>
                    <div>
                        <h2>Login Page</h2>
                        <input type="text" name="username" {...register('username', { required: true })} onChangeCapture={handleInputChange} placeholder="Username" />
                        <p>{errors.username && "Username required"}</p>
                        <input type="password" name="password" {...register('password', { required: true })} onChangeCapture={handleInputChange} placeholder="Password" />
                        <p>{errors.password && "Password required"}</p>
                        <button type="submit">Login</button><br />
                    </div>
                    <div>
                        <GoogleLogin
                            clientId="1073248472355-dv8f7054642rmmqoshu3rt491639b4jb.apps.googleusercontent.com"
                            buttontext="Login"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseFailureGoogle}>
                        </GoogleLogin>
                    </div>
                    <div>
                        <FacebookLogin
                            appId="234716694949174"
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



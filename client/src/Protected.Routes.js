import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    const login_status = useSelector((state) => state.user.login_status)
    console.log('login_status', login_status)
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log('props', props)
                if (login_status) {
                    return <Component {...props} />
                }
                else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }} />
                    )
                }
            }} />

    )
}

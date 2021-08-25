import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    const user_info = useSelector((state) => state.user.user_info)

    const { addToast } = useToasts();
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log('props', props)
                if (user_info) {
                    if (rest.location.pathname === "/admin_dashboard" && user_info.roles === "admin") {
                        return <Component {...props} />
                    }
                    else if (rest.location.pathname === "/admin_dashboard" && user_info.roles === "user") {
                        return (addToast("Access denied", { appearance: 'error', autoDismiss: true }),
                            <Redirect to={{
                                pathname: '/dashboard',
                                state: { from: props.location }
                            }} />
                        )
                    }
                    else if (rest.location.pathname === "/admin_dashboard" || user_info.roles === null || "" || undefined) {
                        return (addToast("Access denied", { appearance: 'error', autoDismiss: true }),
                            <Redirect to={{
                                pathname: '/dashboard',
                                state: { from: props.location },
                            }} />
                        )
                    }
                    else {
                        return <Component {...props} />
                    }
                }
                else {
                    return (addToast("Kindly Login First !", { appearance: 'error', autoDismiss: true }),
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

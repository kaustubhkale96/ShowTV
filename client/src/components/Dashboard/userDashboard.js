import React from 'react'
import SwipeableTemporaryDrawer from './sidebar'
export default function userDashboard() {
    const root = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }
    const body = { textAlign: 'center' }
    return (
        <React.Fragment >
            <SwipeableTemporaryDrawer />
            <div style={root}>
                <div style={body}>
                    Hello User
                </div>
            </div>
        </React.Fragment>
    )
}

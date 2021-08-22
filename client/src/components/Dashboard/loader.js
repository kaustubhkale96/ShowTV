import React from 'react'
import { CircularProgress } from '@material-ui/core'

const root = { display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', height: '100vh', width: '100%' }
const loader = {}
function Loader() {
    return (
        <div style={root}>
            <div style={loader}>
                <CircularProgress color='inherit' />
            </div>
        </div>
    )
}

export default Loader

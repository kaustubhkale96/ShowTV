import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { VideoCameraFilled } from '@ant-design/icons';
import { Button } from "@material-ui/core";

const appbar = { background: "rgba(0,0,0,0.6)", opacity: '95%', zIndex: '1' };
const appbarWrap = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%', margin: '0 auto' }
const logo = {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    flexGrow: 1,
};
const logoname = { borderBottom: '2px solid white' }
const colorlogo = { color: "#FFDF00" };
const logout = { color: "red", border: "1px solid ", margin: '8px' };
const icon = { marginLeft: '8px', marginBottom: '4px', color: '#FFDF00', fontSize: '2rem', };

export default function UserAppbar() {

    return (
        <React.Fragment>
            <AppBar style={appbar}>
                <Toolbar style={appbarWrap}>
                    <div style={logo}>
                        <h3 style={logoname} >SHOW<span style={colorlogo}>TV</span></h3>
                        <VideoCameraFilled style={icon} />
                    </div>
                    <Button style={logout} component={Link} to={'/logout'}>Logout</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

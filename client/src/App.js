import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/Dashboard/adminDashboard';
import userDashboard from './components/Dashboard/userDashboard';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Logout from './components/Logout';
import VideoPlayer from './components/VideoPlayer';
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin_dashboard" component={AdminDashboard} />
        <Route exact path="/dashboard" component={userDashboard} />
        <Route exact path="/video/play" component={VideoPlayer} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

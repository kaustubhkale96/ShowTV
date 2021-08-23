import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/Dashboard/adminDashboard';
import userDashboard from './components/Dashboard/userDashboard';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Logout from './components/Logout';
import VideoPlayer from './components/VideoPlayer';
import PageNotFound from './components/Dashboard/404';
import { ProtectedRoute } from './Protected.Routes';
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/admin_dashboard" component={AdminDashboard} />
        <ProtectedRoute path="/dashboard" component={userDashboard} />
        <ProtectedRoute exact path="/video/play" component={VideoPlayer} />
        <Route exact path="/logout" component={Logout} />
        <Route component={PageNotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

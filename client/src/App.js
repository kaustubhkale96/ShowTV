import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login'
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import App from './components/App/App';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute component={App} />
      </Switch>
    );
  }
}

export default Main;


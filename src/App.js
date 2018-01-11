import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Right from './Right';
import PrivateRoute from './PrivateRoute';
import About from './About';
import NotFound from './NotFound';
import './app.css';

const App = () => (
  <div className="classApp">
    <Switch>
      <Route exact path='/' render={() => (
        <Redirect to='/login' />
      )} />
      <Route  path="/login" component={Login } />
      <PrivateRoute  exact path='/users' component={Home} />
      <Route  path='/users/add' component={Right} />
      
      <Route  path='/users/:id' component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App;


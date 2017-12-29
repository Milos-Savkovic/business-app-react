import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Right from './Right';
import About from './About';
import NotFound from './NotFound';
import './app.css';

const App = () => (
  <div className="classApp">
    <Switch>
      <Route exact path='/' render={() => (
        <Redirect to='/login' />
      )} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path='/users/add' component={Right} />
      <Route exact path='/users' component={Home} />
      <Route exact path='/users/:id' component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App;


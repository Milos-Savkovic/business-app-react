import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Right from './components/Right';
import About from './components/About';
import NotFound from './components/NotFound';
import './app.css';

const App = () => (
  <div className="classApp">
    <Switch>
      <Route exact path='/' render={() => (
        <Redirect to='/login' />
      )} />
      <Route  path="/login" component={Login } />
      <Route  exact path='/users' component={Home} />
      <Route  path='/users/add' component={Right} />
      
      <Route  path='/users/:id' component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App;


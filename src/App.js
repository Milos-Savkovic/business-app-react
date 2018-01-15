import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/Login';
import Container from './components/Container';
import AddUser from './components/AddUser';
import About from './components/About';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import './app.css';
import fire from './api/firebaseApp';

const App = (props) => {
  
  console.log(fire.auth().currentUser);
  if (fire.auth().currentUser) {
    return (
      <div className="classApp">
        <Navigation />
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to='/login' />
          )} />
          <Route path="/login" component={Login} />
          <Route exact path='/users' component={Container} />
          <Route path='/users/add' component={AddUser} />
          <Route path='/users/:id' component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  } else {
    return (
      <div className="classApp">
        <Route exact path='/' render={() => (
          <Redirect to='/login' />
        )} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}



export default App;


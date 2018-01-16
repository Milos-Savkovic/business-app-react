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
// import AppBar from 'material-ui/AppBar';

class App extends React.Component {
  state = {
    userInTheHouse: false,
  }
  componentWillMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({
          userInTheHouse: true,
        });
      } else {
        // No user is signed in.
        return;
      }
    });
  }
  logoutHandler = () => {
    this.setState({
      userInTheHouse: false,
    })
  }

  render() {
    if (this.state.userInTheHouse) {
      return (
        <div className="classApp">
          <Navigation logout={this.logoutHandler} />
          {/* <AppBar
            title="Welcome,"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          /> */}
          <Switch>
            <Route exact path='/users' component={Container} />
            <Route exact path='/login' render={() => (
              <Redirect to='/users' />
            )} />
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
}


export default App;


import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from '../Container/Container';
import AddUser from '../AddUser/AddUser';
import About from '../About/About';
import Reports from '../Reports/Reports';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';
import './app.css';

class App extends React.Component {
    render() {
        return (
            <div className="classApp">
                <Route exact path='/' render={() => (
                    <Redirect to='/users' />
                )} />
                <Navigation />
                <div className="containerApp">
                    <Switch>
                        <Route exact path='/users' component={Container} />
                        <Route path='/users/add' component={AddUser} />
                        <Route path='/reports' component={Reports} />
                        <Route path='/users/:id' component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default App;


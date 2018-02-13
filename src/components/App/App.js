import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from '../Container/Container';
import AddUser from '../AddUser/AddUser';
import About from '../About/About';
import Reports from '../Reports/Reports';
import Navigation from '../Navigation/Navigation';
import EditReport from '../EditReport/EditReport';
import EditUser from '../EditUser/EditUser';
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
                        <Route path='/users/:id/:key/edit' component={EditReport} />
                        <Route exact path='/users' component={Container} />
                        <Route path='/users/add' component={AddUser} />
                        <Route path='/reports' component={Reports} />
                        <Route exact path={`/users/:id/edit`} component={EditUser} />
                        <Route path='/users/:id' component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default App;


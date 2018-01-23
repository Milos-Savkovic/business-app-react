import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../../api/firebaseApp';

const getAuthRoute = ({ component: Component, ...rest }, isAuthorized, email) => {
    let isEmailCorrect = true;
    if (email !== undefined) {
        email = email.match(/jsguru.io/);
        if (!email) {
            isEmailCorrect = false;
            alert('Please login with your jsguru google email. We support only jsguru.io emails. Thanks for understanding.');
        };
    }
    return (
        <Route
            {...rest}
            render={props => (
                (isAuthorized && isEmailCorrect) ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }}
                        />
                    )
            )}
        />
    );
}

export default class PrivateRoute extends React.Component {

    state = {
        userInTheHouse: true,
        user: false,
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    userInTheHouse: false,
                });
            }
            else {
                this.setState({
                    user: user,
                });
            }
        });
    }

    render() {
        return getAuthRoute(this.props, this.state.userInTheHouse, this.state.user.email);
    }
}
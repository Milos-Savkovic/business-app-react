import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../../api/firebaseApp';

const getAuthRoute = ({ component: Component, ...rest }, isAuthorized, email) => {
    console.log(email);
    if (email !== undefined) {
        email = email.match(/gmail.com/);
    } else {
        return 0;
    }
    return (
        <Route
            {...rest}
            render={props => (
                isAuthorized && email ? (
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

    componentWillMount() {
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
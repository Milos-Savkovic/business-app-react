import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import fire from '../../api/firebaseApp';

const getAuthRoute = ({ component: Component, ...rest }, isAuthorized) => {
    return (
        <Route
            {...rest}
            render={props => (
                isAuthorized ? (
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
    }

    componentWillMount() {
        fire.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    userInTheHouse: false,
                });
            }
        });
    }

    render() {
        return getAuthRoute(this.props, this.state.userInTheHouse);
    }
}
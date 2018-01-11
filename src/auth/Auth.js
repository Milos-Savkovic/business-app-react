const Auth = {
    isLoggedIn: false,
    login: 
    (user) => {
        if (user)
            return Promise.resolve();
        else
            return Promise.reject('Invalid user')
    },
    checkIfLoggedIn: () => {
        return true;
    },
    getUser: () => {
        const localStateJson = localStorage.getItem('state');
        const localState = JSON.parse(localStateJson);
        return localState.user.email;
    },
    logout: () => {
        this.isLoggedIn = false;
        localStorage.removeItem('state');
    },

}

export default Auth;
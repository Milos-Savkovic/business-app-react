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
        const localStateJson = localStorage.getItem('state');
        if (localStateJson) {
            const localState = JSON.parse(localStateJson);
            return this.isLoggedIn = localState.isLoggedIn;
        } else
            return this.isLoggedIn;
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
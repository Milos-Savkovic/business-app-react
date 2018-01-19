import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className="router">
        <Router>
            <MuiThemeProvider>
                <Main />
            </MuiThemeProvider>
        </Router>
    </div>, document.getElementById('root'));
registerServiceWorker();

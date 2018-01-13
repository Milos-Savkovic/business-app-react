import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className="router">
    <Router>
        <MuiThemeProvider>
        <App />
        </MuiThemeProvider>
    </Router>
    </div>, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className="router">
    <Router>
        <App />
    </Router>
    </div>, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './router';

import store from './store';
import App from './App';
ReactDOM.render(
    <Provider store={store}>
        <Router >
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
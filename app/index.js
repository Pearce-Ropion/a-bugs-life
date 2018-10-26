import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, combineReducers, compose } from 'redux';
import axios from 'axios';
import { AxiosProvider } from 'react-axios';
import 'semantic-ui-css/semantic.min.css';

import { Application } from '../src/components/Application';

const axiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' }
});

// const rootReducer = combineReducers();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers);

render(
    // <Provider store={store}>
        <AxiosProvider instance={axiosInstance}>
            <Application />
        </AxiosProvider>
    /* </Provider> */,
    document.getElementById('app')
);
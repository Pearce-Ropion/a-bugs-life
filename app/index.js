import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import 'semantic-ui-css/semantic.min.css';

import { Application } from '../src/components/Application';

// const rootReducer = combineReducers();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers);

render(
    // <Provider store={store}>
        <Application />
    /* </Provider> */,
    document.getElementById('app')
);
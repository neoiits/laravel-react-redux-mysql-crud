import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../store/reducers';

/* Created store and store all the reducers in that OR provided reducers to store by redux */
/* React-redux provider used to communicate between react and redux store Provider contains App so app can access all the data/states anywhere in app easilly */
const store = createStore(reducers);
if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>
        , document.getElementById('root'));
}


/* Main file from here react components rendered to the HTML root */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import store from './store';
import App from './containers/AppContainer';

ReactDom.render(
    <Provider store={store} >
        <App/>
    </Provider>,
    document.getElementById('root')
);
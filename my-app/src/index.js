import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import rootReducer from './reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

registerServiceWorker();

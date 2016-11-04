/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import throttle from 'lodash/throttle';
import { saveState, loadState } from 'utils/localStorage';
import getRoutes from './routes';
import config from './config';

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

// subscribe to store
store.subscribe(throttle(() => {
  saveState({
    auth: {
      user: store.getState().auth.user,
      loginInfo: store.getState().auth.loginInfo
    }
  });
  console.log(loadState());
  console.log(store.getState().auth.user);
}, 1000));


function initSocket() {
  const socket = io(config.apiHost, { path: '/socket.io' });
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

require('newrelic');
global.socket = initSocket();

const component = (
  <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />
  } history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}

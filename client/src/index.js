import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

function reducers(state = {}, action) {
  switch(action.type) {
    case 'UPDATE_SEARCH':
      return action.payload.search;
    default:
      return state;
  }
}

const store = createStore(reducers);


ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import { reducer } from './reducers';

const storeEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
);




const store = createStore(
  reducer,
  {
    search: '',
    query: '',
    show_favorites: false,
    results: [],
    favorites: [],
    current_page: 1,
    offset: 0
  } ,
  storeEnhancers);

// store.dispatch(updateTitle);

// const updateTitle = {
//   type: 'UPDATE_TITLE',
//   payload: 'Something else'
// }

// console.log(store.getState());


ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

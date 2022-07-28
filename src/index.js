import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';


const initialState = {};
 
const store = configureStore(initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {console.log(store.replaceReducer)}
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

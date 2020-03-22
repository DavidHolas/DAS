import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {createStore} from "redux";
import {Provider} from "react-redux";
import player from "./reducers/player";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(player, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);

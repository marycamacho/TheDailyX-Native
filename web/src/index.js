import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import './index.css';
import reducers from './reducers';
import Settings from "./components/Settings";

const createStoreWithMiddleware = applyMiddleware(
    promise, thunk
)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/settings" component={Settings}/>
                <Route path="/" component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

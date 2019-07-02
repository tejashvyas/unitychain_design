import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { setCurrentUser } from './action/auth.action';
import requireAuthToken from './action/requireAuthToken';
import isAuthenticate from './components/Require_auth';
import DefaultLayout from './containers/DefaultLayout';
import { connect } from 'react-redux';
import './App.css';
import './assests/css/style.css'
var createHistory = require("history").createBrowserHistory;

export const history = createHistory();
const initialState = {};
const enhancers = [];
const middleware = [thunk, logger, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
);

const store = createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers);
store.dispatch(setCurrentUser(localStorage.user ? JSON.parse(localStorage.user) : {}));
requireAuthToken(localStorage.token);

class App extends Component {
	render() {
		return (
			<Provider store={store} history={history}>
				<BrowserRouter>
					<Switch>
						<Route path="/" name="Home" component={DefaultLayout} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
	}
}

{
	/* <Route exact path="/register" name="Register Page" component={Register} />
    <Route exact path="/404" name="Page 404" component={Page404} />
    <Route exact path="/500" name="Page 500" component={Page500} />
    <Route path="/" name="Home" component={IsAuthenticate(DefaultLayout)} />  */
}

export default App;

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session.js';
import groupsReducer from './groups.js';
import eventsReducer from './events.js';
import usersReducer from './users.js';
import commentsReducer from './comments.js'
import userGroupsReducer from './userGroups.js';

const rootReducer = combineReducers({
	session: sessionReducer,
	groups: groupsReducer,
	events: eventsReducer,
	users: usersReducer,
	comments: commentsReducer,
	userGroups: userGroupsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {   // .env?
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

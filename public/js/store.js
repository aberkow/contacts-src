var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var thunk = require('redux-thunk').default;
var reducers = require('./reducers');

var store = createStore(reducers.contactsReducer, window.devToolsExtension ? window.devToolsExtension() : undefined, applyMiddleware(thunk));

module.exports = store;

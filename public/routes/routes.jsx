var React = require('react');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var App = require('../components/App');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App} />
  </Router>
);

module.exports = routes;

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var store = require('./js/store');
var routes = require('./routes/routes');

class Container extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Provider store={store}>
        <div>
          {routes}
        </div>
      </Provider>
    );
  }
};

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Container />, document.getElementById('app'));
});


// document.addEventListener('DOMContentLoaded', function(){
//   ReactDOM.render(
//     <Provider store={store}>
//       {routes}
//     </Provider>
//   );
// });



// var router = require('react-router');
// var Router = router.Router;
// var Route = router.Route;
// var hashHistory = router.hashHistory;
// var IndexRoute = router.IndexRoute;
// var Link = router.Link;

// var App = require('./components/App');

// class App extends React.Component{
//   constructor(props){
//     super(props);
//   }
//   render(){
//     return(
//       <div>
//         <h1>Contacts</h1>
//         <div>{props.children}</div>
//       </div>
//     );
//   }
// };

// var routes = (
//   <Router history={hashHistory}>
//     <Route path='/' component={App}>
//
//     </Route>
//   </Router>
// );

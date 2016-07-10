var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../js/actions');
var injectTapEventPlugin = require('react-tap-event-plugin');
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var AppBar = require('material-ui/AppBar');


injectTapEventPlugin();

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <h1>Test</h1>
          <AppBar title={'Test'} />
        </div>
      </MuiThemeProvider>
    );
  }
};

var mapStateToProps = function(state, props){
  console.log(state, 'from mapStateToProps');
  return {
    contacts: state.contacts
  }
}

var Container = connect(mapStateToProps)(App);

module.exports = Container;

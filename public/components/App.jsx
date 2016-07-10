import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <AppBar title={'Contacts'} />
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
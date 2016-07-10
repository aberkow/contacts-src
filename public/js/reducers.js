var actions = require('./actions');

var initialState = {
  contacts: {}
};

var contactsReducer = function(state, action){
  state = state || initialState;
  switch (action.type) {
    case actions.FETCH_CONTACTS_SUCCESS:
      return Object.assign({}, state, {contacts: action.contacts})
      break;
    case actions.FETCH_CONTACTS_ERROR:
      throw new Error('Fetching contacts failed');
    default:
      return state;
  }
}

exports.contactsReducer = contactsReducer;

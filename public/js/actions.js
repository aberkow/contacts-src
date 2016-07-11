//var axios = require('axios');
var $ = require('jquery');
var url = '/api/contacts';

var FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
var fetchContactsSuccess = function(contacts){
  return {
    type: FETCH_CONTACTS_SUCCESS,
    contacts: contacts
  };
};

var FETCH_CONTACTS_ERROR = 'FETCH_CONTACTS_ERROR';
var fetchContactsError = function(contacts, error){
  return {
    type: FETCH_CONTACTS_ERROR,
    contacts: contacts,
    error: error
  };
};

//try jquery...

var fetchContacts = function(){
  $.getJSON(url, function(data){
    console.log(data, 'from jquery $.get');
  })
  .then(function(data){
    var contacts = data;
    return dispatch(fetchContactsSuccess(contacts));
  })
  .catch(function(error){
    console.log(error.message, 'from fetchContactsError catch');
    var contacts = data;
    return dispatch(fetchContactsError(contacts, error));
  });
}

// var fetchContacts = function(contacts){
//   return function(dispatch){
//     return axios.get(url).then(function(response){
//       if (response.state < 200 || response.status >= 300){
//         debugger;
//         console.error('error at axios.get(url)');
//         var error = new Error(response.statusText)
//         error.response = response
//         throw error;
//       }
//       return response;
//     })
//     .then(function(response){
//       console.log(response, 'from fetchContacts response');
//       //debugger;
//       return response;
//     })
//     .then(function(data){
//       console.log(data, 'from fetchContacts()');
//       var contacts = data;
//       return dispatch(fetchContactsSuccess(contacts));
//     })
//     .catch(function(error){
//       console.log(error.message, 'from fetchContacts catch');
//       return dispatch(fetchContactsError(contacts, error));
//     });
//   }
// }

exports.FETCH_CONTACTS_SUCCESS = FETCH_CONTACTS_SUCCESS;
exports.fetchContactsSuccess = fetchContactsSuccess;

exports.FETCH_CONTACTS_ERROR = FETCH_CONTACTS_ERROR;
exports.fetchContactsError = fetchContactsError;

exports.fetchContacts = fetchContacts;

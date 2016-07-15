$(document).ready(function(){
  var mainForm = $('#mainForm');
  // var contactContainer = $('#contactContainer');

  //submit a contact to add to the list
  mainForm.on('submit', function(evt){
    evt.preventDefault();
    //gather the form info
    var firstName = $('#firstNameForm').val();
    var lastName = $('#lastNameForm').val();
    var phoneNumber = $('#phoneNumberForm').val();
    var emailAddress = $('#emailForm').val();
    console.log(firstName, lastName, phoneNumber, emailAddress, 'from mainForm');

    //create a new contact
    var contact = new Contact(firstName, lastName, phoneNumber, emailAddress);

    console.log(contact, 'contact obj. from mainForm');

    //add the contact to the db/api
    addContact(contact);

    //get the contacts
    getContacts();
  });

  //get the list of contacts when the document loads
  getContacts();
  //delete one contact from view/database
  deleteContact();
  //update one contact in view/database
  updateContact();
});

//get and show all contacts
var getContacts = function(){
  $.getJSON('/api/contacts', function(data){
    console.log(data);
    showContacts(data);
  });
};

var showContacts = function(results){
  var contact = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    id: '',
    html: ''
  }
  //iterate through the results and create a contact for each.
  for (var i = 0; i < results.length; i++){
    contact.firstName = results[i].firstName;
    contact.lastName = results[i].lastName;
    contact.phoneNumber = results[i].phoneNumber;
    contact.email = results[i].email;
    contact.id = results[i]._id;
    contact.html += "<div class='list-group singleContactContainer' data-id=" + contact.id + "><h4 class='list-group-item-heading'>" + contact.firstName + " " + contact.lastName + "</h4><p class='list-group-item-text'>" + contact.phoneNumber + "</p><p class='list-group-item-text'>" + contact.email + "</p>" + "<button type='button' class='btn btn-primary contactUpdateButton' data-toggle='modal' data-target='#updateContactModal'>Update</button><button type='button' class='btn btn-default contactDeleteButton'>Delete</button></div>";

    //the <p> tag for the email address exists, but it's not grabbing the contact.emailAddress value...

    // + "<div class='contactUpdateContainer' style='display:none;' data-id=" + contact.id +

    // <p class='list-group-item-text'>
    // </p>

    //<div class='contactUpdateContainer' style='display:none;' data-id=" + contact.id + "><form role='form' class='contactUpdateForm'><div class='form-group'><label for='firstNameUpdateForm'>First Name:</label><input type='text' class='form-control' id='firstNameUpdateForm" + contact.id + "></div><div class='form-group'><label for='lastNameUpdateForm'>Last Name:</label><input type='text' class='form-control' id='lastNameUpdateForm + contact.id + ></div><div class='form-group'><label for='phoneNumberUpdateForm'>Phone Number:</label><input type='text' class='form-control' id='phoneNumberUpdateForm + contact.id + ></div><div class='form-group'><label for='emailUpdateForm'>Email:</label><input type='text' class='form-control' id='emailUpdateForm' + contact.id + ></div>"


    // <div class="list-group">
    //   <h4 class="list-group-item-heading">Adam Berkowitz</h4>
    //   <p class="list-group-item-text">732-266-0883</p>
    //   <p class="list-group-item-text">adam@adamjberkowitz.com</p>
    //   <button type="button" class="btn btn-default">Edit</button>
    //   <button type="button" class="btn btn-default">Delete</button>
    // </div>

// <button type='button' class='btn btn-default contactEditButton' data-toggle='collapse' data-target='#'" + contact.id + "aria-expanded='false' aria-controls=" + contact.id + ">Edit</button>

// <button class='btn btn-default contactEditButton' type='button' data-toggle='collapse' data-target='#" + contact.id + '"aria-expanded=false aria-controls=" + contact.id + ">



// aria-expanded='false'
    //+ ">Edit</button><button type='button' class='btn btn-default contactDeleteButton'>Delete</button></div>"
  }
  // console.log(contact.html, 'from showContacts');
  $('#contactContainer').append(contact.html);
};

//add one contact
var addContact = function(contactData){
  console.log(contactData, 'from addContact');
  $.post('/api/contacts', contactData, function(data){
    console.log(contactData, data, 'from add contactData, data');
    $('#contactContainer').html(data);
  })
};

//delete one contact
var deleteContactAjax = function(contactId){
  var deleteContact = {
    contactId: contactId
  }
  $.ajax({
    url: '/api/contacts/' + deleteContact.contactId,
    data: deleteContact,
    dataType: 'JSON',
    method: 'DELETE'
  })
  .done(function(result){
    console.log(result, 'from deleteContactAjax');
  })
  .fail(function(jqXHR, error){
    console.log(error, 'from deleteContactAjax');
  });
};

var deleteContact = function(){
  $(document).on('click', '.contactDeleteButton', function(evt){
    evt.preventDefault();
    var targetId = $(evt.target).parent().attr('data-id');
    console.log(targetId, 'from deleteContact');
    var targetToRemove = $(evt.target).parent().remove();
    deleteContactAjax(targetId);
  });
};

var updateContactAjax = function(newFirstName, newLastName, newPhoneNumber, newEmailAddress, contactId){
  var updateContact = {
    firstName: newFirstName,
    lastName: newLastName,
    phoneNumber: newPhoneNumber,
    emailAddress: newEmailAddress,
    contactId: contactId
  }
  $.ajax({
    url: '/api/contacts/' + updateContact.contactId,
    data: updateContact,
    dataType: 'JSON',
    method: 'PUT'
  })
  .done(function(result){
    $('.singleContactContainer').remove();
    getContacts();
  })
  .fail(function(jqXHR, error){
    console.log(error, 'from updateContactAjax');
  });
};

//select one contact to update
var updateContact = function(){
  $(document).on('click', '.contactUpdateButton', function(evt){
    evt.preventDefault();
    var targetId = $(evt.target).parent().attr('data-id');
    console.log(targetId, 'from updateContact');
    $('#updateForm').on('submit', function(evt){
      evt.preventDefault();
      var contactId = targetId;
      var newFirstName = $('#updateFirstName').val();
      var newLastName = $('#updateLastName').val();
      var newPhoneNumber = $('#updatePhoneNumber').val();
      var newEmailAddress = $('#updateEmailaddress').val();
      console.log(contactId, newFirstName, newLastName, newPhoneNumber, newEmailAddress, 'from updateContact');
      updateContactAjax(newFirstName, newLastName, newPhoneNumber, newEmailAddress, contactId);
    });
  });
};

//create a Contact to post to the list
function Contact(firstName, lastName, phoneNumber, emailAddress){
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
};

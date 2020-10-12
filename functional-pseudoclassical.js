// Class Contact
function Contact (name, surname, phone, adress) {
  // * 'new' keyword does:
  // creation of new object
  // pointing this to the context of the new object
  // returning the new object implicitly (returns the context)
  // assigns __proto__ (the property that all objects have that point up in the delegation chain) to prototype (the kangaroo bag that only functions have) (new intance.prototype sending all methods in there to be shared by all the instances)

  // pass the arguments as properties
  this.name = name;
  this.surname = surname;
  this.phone = phone;
  this.adress = adress;

}

// add methods on the prototype
Contact.prototype.addContactList = function () {
  //create new card
  const contacts = document.getElementById("contacts");
  //create the div.contact-list
  const contactList = document.createElement("div");
  contactList.className = "contact-list";
  //create the div.contact-card
  const contactCreate = document.createElement("div");
  contactCreate.className = "contact-card";
  //create the name
  const name = document.createElement("p");
  name.className = "contact-info";
  name.appendChild(document.createTextNode(`${this.name}`));
  //create the surname
  const surname = document.createElement("p");
  surname.className = "contact-info";
  surname.appendChild(document.createTextNode(`${this.surname}`));
  //create the phone
  const phone = document.createElement("p");
  phone.className = "contact-info";
  phone.insertAdjacentHTML("afterbegin", "<span class='emoji'>📞</span>");
  phone.appendChild(document.createTextNode(`${this.phone}`));
  //create the adress
  const adress = document.createElement("p");
  adress.className = "contact-info";
  adress.insertAdjacentHTML("afterbegin", "<span class='emoji'>🏠</span>");
  adress.appendChild(document.createTextNode(`${this.adress}`));
  //add the contactList to the div.contacts
  contacts.appendChild(contactList);
  //add the contactCreate to the div.contactList
  contactList.appendChild(contactCreate);
  //add the contact data to the div.contactCreate
  contactCreate.appendChild(name);
  contactCreate.appendChild(surname);
  contactCreate.appendChild(phone);
  contactCreate.appendChild(adress);
  //create a delete button
  contactList.insertAdjacentHTML("beforeend", "<img class='btn btn-delete' src='garbage.png'>");
};

// SUBCLASS
function InternationalContact (name, surname, phone, adress, nationality) {
  Contact.call(this, name, surname, phone, adress);
  this.nationality = nationality;

}

// set the subclass prototype as a new object that point the superclass prototype
InternationalContact.prototype = Object.create(Contact.prototype);
// as the contructore property has been changed, we need to repoint to the subclass
InternationalContact.prototype.constructor = InternationalContact;

InternationalContact.prototype.sayHi = function () {
  console.log('hi, I\'m ' + this.name);
}

console.log(new InternationalContact('marcel', 'subi', 9834934, 'bcn', 'catalan'));







// HELPER FUNCTIONS
const clearFields = function () {
  //set input fields to an empty field after adding a contact
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("adress").value = "";
}

const showAlert = function (text, type) {
  //create alert div
  const message = document.createElement("div");
  message.className = `${type}`;
  message.appendChild(document.createTextNode(text));
  //show message on top of the form
  const container = document.getElementById("input");
  const form = document.getElementById("contact-form");
  container.insertBefore(message, form);
  //disapear after 2 sec
  setTimeout(function() {
      document.querySelector(`.${type}`).remove();
  }, 2000);
}

const deleteContact = function (target) {
  //if the garbage bin button is clicked, then delete the contact:
  if (target.classList.contains("btn-delete")) {
      target.parentElement.remove();
  }
}

const searchContact = function () {
  const search = document.getElementById("searchbar");
  const contactCards = document.getElementsByClassName("contact-card");

  //input stores the value to lowercase to avoid case bugs
  const input = search.value.toLowerCase();

  //search through the array of contacts if input is included in any of the contacts
  for (let i = 0; i < contactCards.length; i++) {
      //if included, keep showing the contact
      if (contactCards[i].textContent.toLowerCase().includes(input)) {
          contactCards[i].style.display="flex";
          contactCards[i].nextElementSibling.style.display="inline-block";
      }
      // if not included, hide the contact
      else {
          contactCards[i].style.display="none";
          contactCards[i].nextElementSibling.style.display="none";
      }
  }
}

// EVENT LISTENERS
//new contact
document.getElementById("contact-form").addEventListener("submit", function (event) {
  //get form values
  const contactName = document.getElementById("name").value,
  contactSurname = document.getElementById("surname").value,
  contactPhone = document.getElementById("phone").value,
  contactAdress = document.getElementById("adress").value;

  //only created when at least name is added
  if (contactName === "") {
    // message of error
    showAlert("Don't forget to add a name to the contact!", "error");
  } else {
     //Intance of a contact
    const contact = new Contact(contactName, contactSurname, contactPhone, contactAdress);
    //add contact to list
    contact.addContactList(this);
    //message of success
    showAlert("Contact added to your list!", "success");
    //clear the contact fields
    clearFields();
  }
  //prevent the form from executing its default behavior:
  (event).preventDefault();
});

//delete contact
document.getElementById("contacts").addEventListener("click", function(event) {
  const target = event.target;
  deleteContact(target);

});

//filtering the search of the user
document.getElementById("searchbar").addEventListener("keyup", function() {
  searchContact();
});
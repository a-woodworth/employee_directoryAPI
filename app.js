// Global Variables
const employeeList = document.querySelector('.grid-container');
let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, picture, dob, &noinfo &nat=US';
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// Get data from Random User Generator API
fetch(urlAPI)
  .then( response => response.json())
  .then(response => response.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

function displayEmployees(employeeData) {
  employees = employeeData;

  let employeeHTML = '';

  // Loop through each employee to get info for HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="employee-card" data-index ="${index}" tabindex="0">
        <img class="avatar" src="${picture.large}" alt="" role="presentation">
        <div class="text-container">
          <h2 class="name">
            <a href="#employeeModal" class="employee-link">${name.first} ${name.last}</a>
          </h2>
          <p class="email">${email}</p>
          <p class="city">${city}</p>
        </div>
      </div>
    `;
  });
  employeeList.innerHTML = employeeHTML;
}  

// Generate modal from employee data
function displayModal(index) {
  let { name, dob, phone, email, 
    location: { city, street, state, postcode}, 
    picture } = employees[index];

  let date = new Date(dob.date);
  
  const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
    <div class="content" role="dialog" aria-labelledby="directory listing">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email"><a href="mailto:${email}">${email}</a></p>
      <p class="city">${city}</p>
      <hr>
      <p class="phone">${formatPhoneNumber(phone)}</p>
      <p class="address">
        <span class="street-number">${street.number}</span>
        <span class="street-name"> ${street.name},</span>
        <span class="state"> ${state}</span>
        <span class="postcode"> ${postcode}</span>
      </p>
      <p class="birthday">Birthday:
        <span class="dob"> ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</span>
      </p>
    </div>
  `;
  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;  
}

employeeList.addEventListener('click', e => {

  // User clicks on card NOT grid
  if(e.target !== employeeList) {
    // Get card element based on proximity to actual element clicked
    const card = e.target.closest('.employee-card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

// Get rid of extra dash in API phone number string
let formatPhoneNumber = (phoneNumberString) => {

  // Filter only numbers from input
  let cleaned = (phoneNumberString).replace(/\D/g, '');

  // Check if input is correct length --> US 10 digit #
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  } else {
    return '';
  }
}

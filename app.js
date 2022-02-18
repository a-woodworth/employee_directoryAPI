// Global Variables
const employeeList = document.querySelector('.grid-container');
let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, picture, dob, &noinfo &nat=US';

// Get data from Random User Generator API
fetch(urlAPI)
  .then( response => response.json())
  .then(response => response.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

function displayEmployees(employeeData) {
  employees = employeeData;

  let employeeHTML = '';

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="employee-card" data-index ="${index}">
        <img class="avatar" src="${picture.large}" alt="Photo of ${name.first} ${name.last}">
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="city">${city}</p>
        </div>
      </div>
    `;
  });
  employeeList.innerHTML = employeeHTML;
}  


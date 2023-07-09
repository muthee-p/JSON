const form = document.getElementById('registrationForm');


form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission


  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const newUser = {
    username: username,
    email: email,
    password: password
  };

  // Send the new user data to the server
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message); // Display server response message
    form.reset(); // Reset the form
  })
  .catch(error => console.error(error));
});

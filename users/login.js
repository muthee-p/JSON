const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const userCredentials = {
    username: username,
    password: password
  };

  // Send the user credentials to the server for authentication
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Display server response data
    form.reset(); // Reset the form
  })
  .catch(error => console.error(error));
});

// Base64 encoded correct password
var correct = 'Z3JhcGhpY3M0Z29vZA==';
// Initialize user_password as false
var user_password = false

// Parse the query string from the URL
const urlParam = new URLSearchParams(window.location.search);

// Check if the 'i' parameter exists and the stored password is correct
if (Boolean(urlParam.get('i')) === true && localStorage.getItem('p') === correct) {
  // Retrieve and clear the stored password
  user_password = localStorage.getItem('p')
  localStorage.setItem('p', false)
  localStorage.removeItem('p')
  // Call the login function
  login()
}
else {
  // Get the login elements
  var login = document.querySelector('.login')
  var button = login.querySelector('.btn')
  var password = login.querySelector('#password')
  
  // Add event listener for the login button
  button.addEventListener('click', function() {
    user_password = password.value
    login()
  })
  
  // Add event listener for the Enter key on the password input
  password.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') {
      user_password = password.value
      login()    
    }
  })
}

// Function to handle the login process
async function login() {
  var res = await fetch(`/portal/landing/`)
  var text = await res.text()
  xhrAct(text)
}

// Function to handle the response from the login request
function xhrAct(HTML) {
  HTML = HTML.replaceAll('<!DOCTYPE html>', '')
  if (user_password === correct) {
    // Decode the HTML content and update the page
    HTML = atob(HTML)
    var footer = document.querySelector('footer')
    var fHTML = footer.outerHTML
    footer.remove()
    document.body.innerHTML += HTML + fHTML
  
    // Load the portal script
    let script = document.createElement('script')
    script.src = '/portal.js'
    document.body.appendChild(script)
    // document.documentElement.className = 'fullHeight'
    // document.body.className = 'fullHeight'
  }
  else {
    // Redirect to the wrong password page
    history.back()
    location.href = '/wrong-portal-password'
  }
}
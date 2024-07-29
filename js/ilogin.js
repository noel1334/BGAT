document
  .getElementById("loginForm")
  .addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password from form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.querySelector(".errorMessage");

    // Check if username and password match
    if (username === "BGAT" && password === "admin") {
      // Store login details in local storage
      localStorage.setItem("loggedIn", "true");
      window.location.href = "../batog.html";
    } else {
      errorMessage.textContent = "Incorrect username or password";
    }
  });

// Check if user is already logged in
window.onload = function() {
  if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "../batog.html";
  }
};
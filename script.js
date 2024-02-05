const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}


// Register page Script
document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65b3a2449593d563e87ce412";

  if (document.getElementById("register-btn")) {
    document.getElementById("register-btn").addEventListener("click", function (e) {
      e.preventDefault();

      let Name = document.getElementById("create-name").value;
      let Password = document.getElementById("create-password").value;

      // Check for empty fields
      if (Name === "" || Password === "") {
        window.alert("Please fill in all the fields!");
        return false;
      }

      // Create new account
      let jsondata = {
        Name: Name,
        Password: Password,
      };

      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(jsondata),
      };

      fetch("https://contact-dc07.restdb.io/rest/contacts", settings)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);

          // Save username in localStorage
          localStorage.setItem("username", Name);

          // Hide the register form
          hideRegisterForm();

          // Display the Lottie animation after successful registration
          loadLottieAnimation('https://lottie.host/da00376c-14ce-4a7b-8af6-d2e31c207b94/pwiYEXospK.json');

          // Redirect to index.html after 3 seconds
          setTimeout(function () {
            window.location.href = 'index.html';
          }, 3000);
        })
        .catch((error) => {
          console.error('Error:', error);
          window.alert("Registration failed. Please try again.");
        });
    });
  }


  function loadLottieAnimation(src) {
    // Load the Lottie animation
    const dotLottiePlayer = document.createElement('dotlottie-player');
    dotLottiePlayer.setAttribute('src', src);
    dotLottiePlayer.setAttribute('background', 'transparent');
    dotLottiePlayer.setAttribute('speed', '1');
    dotLottiePlayer.setAttribute('style', 'width: 300px; height: 300px;');
    dotLottiePlayer.setAttribute('loop', '');
    dotLottiePlayer.setAttribute('autoplay', '');

    // Append the Lottie animation to the document body
    document.body.appendChild(dotLottiePlayer);
  }

  function hideRegisterForm() {
    // Hide the register form
    document.getElementById("registerForm").style.display = "none";
  }
});


// Login page Script
document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65b3a2449593d563e87ce412";

  if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", function (e) {
      e.preventDefault();
      let Name = document.getElementById("username").value;
      let Password = document.getElementById("password").value;

      // Check for empty fields
      if (Name === "" || Password === "") {
        window.alert("Please fill in all the fields!");
        return false;
      }

      fetch(`https://contact-dc07.restdb.io/rest/contacts?q={"Name":"${Name}","Password":"${Password}"}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache",
        },
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        console.log("API Response:", response);

        if (response.length > 0) {
          // Save username in localStorage
          localStorage.setItem("username", Name); // Store the username

            // Assuming you want to store a flag indicating login status
            let checkiflogged = true;
            sessionStorage.setItem("checkiflogged", checkiflogged);

            // Clear the login form
            clearLoginForm();

            // Display the Lottie animation after successful login
            loadLottieAnimation('https://lottie.host/da00376c-14ce-4a7b-8af6-d2e31c207b94/pwiYEXospK.json');
            
            // Redirect to index.html after 3 seconds
            setTimeout(function () {
              window.location.href = 'index.html';
            }, 3000);
          } else {
            window.alert("Invalid username or password!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  function loadLottieAnimation(src) {
    // Load the Lottie animation
    const dotLottiePlayer = document.createElement('dotlottie-player');
    dotLottiePlayer.setAttribute('src', src);
    dotLottiePlayer.setAttribute('background', 'transparent');
    dotLottiePlayer.setAttribute('speed', '1');
    dotLottiePlayer.setAttribute('style', 'width: 300px; height: 300px;');
    dotLottiePlayer.setAttribute('loop', '');
    dotLottiePlayer.setAttribute('autoplay', '');

    // Append the Lottie animation to the document body
    document.body.appendChild(dotLottiePlayer);
  }

  function clearLoginForm() {
    // Reset the input fields
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Hide the login form
    document.getElementById("loginForm").style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var username = localStorage.getItem("username");
  if (username) {
    document.getElementById("username").textContent = username;
  }
});


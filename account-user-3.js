// Validate phone number
function validatePhone() {
    let notif = document.getElementById("phoneNotice");
    let phone = document.getElementById("registerPhone");
    notif.classList.remove("d-none");

    //Hide notice if conditions are met
    if (phone.value.length >= 10 && phone.value.match(/[0-9]/)) {
        notif.classList.add("d-none");
    }
}
document.getElementById("registerPhone").addEventListener("input", validatePhone);

// ---------------------------------------------- //

// Password format validation
function passwordFormat() {
    let notif = document.getElementById("passwordNotice");
    let password = document.getElementById("registerPassword");
    notif.classList.remove("d-none");

    //Hide notice if conditions are met
    if (
        password.value.length >= 8 &&
        password.value.length <= 16 &&
        password.value.match(/[a-z]/) &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[0-9]/)
    ) {
        notif.classList.add("d-none");
    }
}
document.getElementById("registerPassword").addEventListener("input", passwordFormat);

// ---------------------------------------------- //

//  Show password when the user check the checkbox
function showPassword() {
    let password = document.getElementById("registerPassword");
    let confirmPassword = document.getElementById("registerConfirmPassword");

    if (document.getElementById("showPassword").checked) {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
}

document.getElementById("showPassword").addEventListener("change", showPassword);

// ---------------------------------------------- //

// Repeat password validation
function repeatPassword() {
    let notif = document.getElementById("passwordNotice");
    let password = document.getElementById("registerPassword");
    let confirmPassword = document.getElementById("registerConfirmPassword");

    if (password.value != confirmPassword.value) {
        notif.innerHTML = '<span class="text-danger me-1"><i class="bi bi-exclamation-circle"></i></span> Password does not match';
        notif.classList.remove("d-none");
    } else {
        notif.classList.add("d-none");
    }
}
document.getElementById("registerConfirmPassword").addEventListener("input", repeatPassword);

// ---------------------------------------------- //
// -----------Registration Starts here----------- //
// ---------------------------------------------- //

// Create a new object to hold user details and booking details
let userDetails = {};

// Initialize customerID
let customerID = localStorage.getItem("customerID") ? parseInt(localStorage.getItem("customerID")) : 1;

// Function to save user details to local storage
function saveUserDetails(event) {
    event.preventDefault();

    // Check if email is already existing in localStorage
    const emailToCheck = document.getElementById("registerEmail").value;
    let existingEmail = false;

    // Loop through all the users in localStorage
    for (let i = 1; i < customerID; i++) {
        let storedUserDetails = JSON.parse(localStorage.getItem(`User_${i}`));

        if (storedUserDetails && storedUserDetails.email === emailToCheck) {
            existingEmail = true;
        }
    }

    if (existingEmail) {
        alert("Email already registered");
        return;
    }

    // Make orderDetails an array of objects for multiple orders
    let orderDetails = {}; // Fill this with actual order data

    // Continue saving user details to localStorage if no same email is found
    userDetails.firstName = document.getElementById("registerFirstName").value;
    userDetails.lastName = document.getElementById("registerLastName").value;
    userDetails.phone = document.getElementById("registerPhone").value;
    userDetails.email = document.getElementById("registerEmail").value;
    userDetails.password = document.getElementById("registerPassword").value;
    userDetails.orders = orderDetails;

    // Store updated form data in localStorage
    localStorage.setItem(`User_${emailToCheck}`, JSON.stringify(userDetails));

    // Increment customerID for the next user
    customerID += 1;

    // Update customerID in local storage
    localStorage.setItem("customerID", customerID.toString());

    // 4sec Spinner on the button
    document.getElementById(
        "registerBtn"
    ).innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...`;
    function offSpinner() {
        //Clear the form
        document.getElementById("registerForm").reset();
        // Reset button text
        document.getElementById("registerBtn").innerHTML = "Register";
        // Show registered successfully
        document.getElementById("loginNow").innerHTML = `<strong>REGISTERED SUCCESSFULLY!</strong><br />
        <h5><a
            href="#signInModal"
            class="text-decoration-none fw-bold link-primary"
            data-bs-toggle="modal"
            data-bs-target="#signInModal"
            >LOGIN NOW</a
        ></h5>`;
    }
    setTimeout(offSpinner, 4000);
}

// Add event listener to the button that triggers the saveUserDetails function
document.getElementById("registerForm").addEventListener("submit", saveUserDetails); // Made it as submit instead of click

// ---------------------------------------------- //
// ------------Registration Ends here------------ //
// ---------------------------------------------- //

// ---------------------------------------------- //
// --------------Login Starts here--------------- //

// Function to check if user is registered
function checkUser(event) {
    event.preventDefault();

    // Set accountRegistered to as boolean false
    let accountRegistered = false;

    // Retrieve the email and password inputted by the user
    const emailInput = document.getElementById("loginEmail").value;
    const passwordInput = document.getElementById("loginPassword").value;

    // Retrieve the object of user details from local storage created in registration
    let storedUserDetails = JSON.parse(localStorage.getItem(`User_${emailInput}`));

    if (storedUserDetails && storedUserDetails.password === passwordInput) {
        accountRegistered = true;
    }

    // Check if the user is registered
    if (!accountRegistered) {
        // Show email or password not match
        document.getElementById("loginNotice").classList.remove("d-none");
    } else {
        // Hide email or password not match
        document.getElementById("loginNotice").classList.add("d-none");

        // 4sec Spinner on the button
        document.getElementById(
            "loginBtn"
        ).innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...`;

        function loginSuccess() {
            // Reset button text
            document.getElementById("loginBtn").innerHTML = "Login";

            // close the modal
            document.getElementById("closeSignInModal").click();

            // Hide SignIn in the navbar
            document.getElementById("notLoggedIn").classList.add("d-none");

            // Show avatar option in the navbar
            document.getElementById("loggedIn").classList.remove("d-none");
        }
        // Spinner and modal off after 4sec
        setTimeout(loginSuccess, 4000);
    }

    // keep the user logged in to the website
    sessionStorage.setItem("loggedIn", accountRegistered);
}
document.getElementById("loginForm").addEventListener("submit", checkUser);

// ---------------------------------------------- //

// if the user is logged in, hide the sign in button and show the avatar
checkLoggedin = sessionStorage.getItem("loggedIn");

// if user is logged in, show avatar option in the navbar
if (checkLoggedin == "true") {
    document.getElementById("notLoggedIn").classList.add("d-none");
    document.getElementById("loggedIn").classList.remove("d-none");
} else {
    document.getElementById("notLoggedIn").classList.remove("d-none");
    document.getElementById("loggedIn").classList.add("d-none");
}

// Logout function
function logout() {
    sessionStorage.setItem("loggedIn", false);
    document.getElementById("notLoggedIn").classList.remove("d-none");
    document.getElementById("loggedIn").classList.add("d-none");
}
document.getElementById("logoutUser").addEventListener("click", logout);

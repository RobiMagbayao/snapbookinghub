// Auto capitalization first letter for first name and last name when user starts typing
function capitalizeFirstLetter() {
    let inputFname = document.getElementById("registerFirstName");
    let inputLname = document.getElementById("registerLastName");

    inputFname.value = inputFname.value.charAt(0).toUpperCase() + inputFname.value.slice(1);
    inputLname.value = inputLname.value.charAt(0).toUpperCase() + inputLname.value.slice(1);
}
document.getElementById("registerFirstName").addEventListener("input", capitalizeFirstLetter);
document.getElementById("registerLastName").addEventListener("input", capitalizeFirstLetter);

// ---------------------------------------------- //

// Validate phone number
function validatePhone() {
    let notif = document.getElementById("phoneNotice");
    let phone = document.getElementById("registerPhone");
    notif.classList.remove("d-none");

    // Auto input 09 when user starts typing
    if (phone.value.length == 1) {
        phone.value = "09" + phone.value;
    }

    //Hide notice if conditions are met
    if (phone.value.length >= 11 && phone.value.match(/[0-9]/)) {
        notif.classList.add("d-none");
    }
}
document.getElementById("registerPhone").addEventListener("input", validatePhone);

// ---------------------------------------------- //

// Password format validation
function passwordFormat() {
    let notif = document.getElementById("passwordNotice");
    let password = document.getElementById("registerPassword");
    notif.innerHTML =
        '<span class="text-danger me-1"><i class="bi bi-exclamation-circle"></i></span> Password must be 8-16 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number';
    notif.classList.remove("d-none");
    document.getElementById("registerConfirmPassword").disabled = true;

    //Hide notice if conditions are met
    if (
        password.value.length >= 8 &&
        password.value.length <= 16 &&
        password.value.match(/[a-z]/) &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[0-9]/)
    ) {
        notif.classList.add("d-none");
        document.getElementById("registerConfirmPassword").disabled = false;
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
let customerID = localStorage.getItem("customerID") ? parseInt(localStorage.getItem("customerID")) : 0;

// Function to save user details to local storage
function saveUserDetails(event) {
    event.preventDefault();

    let inputPhone = document.getElementById("registerPhone");
    if (inputPhone.value.length < 11) {
        inputPhone.classList.add("is-invalid");
        inputPhone.target.setCustomValidity("Please enter your phone number");
        return;
    }

    // Check if password and confirm password match

    let password = document.getElementById("registerPassword");
    let confirmPassword = document.getElementById("registerConfirmPassword");
    let notif = document.getElementById("passwordNotice");

    if (password.value != confirmPassword.value) {
        notif.innerHTML = '<span class="text-danger me-1"><i class="bi bi-exclamation-circle"></i></span> Password does not match';
        notif.classList.remove("d-none");
        confirmPassword.classList.add("is-invalid");
        return;
    }

    // Check if email is already existing in localStorage
    const emailToCheck = document.getElementById("registerEmail").value;
    let existingEmail = false;

    // Loop over all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        // Get the current key
        const key = localStorage.key(i);

        // Check if the key matches the pattern 'User_(email)'
        if (key.startsWith("User_")) {
            // remove 'User_' from the start of the key
            const emailInKey = key.slice(5);

            // Compare the email in the key with the email to check
            if (emailInKey === emailToCheck) {
                existingEmail = true;
                break;
            }
        }
    }

    if (existingEmail) {
        alert("Email already registered");
        return;
    }

    // Continue saving user details to localStorage if no same email is found
    userDetails.firstName = document.getElementById("registerFirstName").value;
    userDetails.lastName = document.getElementById("registerLastName").value;
    userDetails.phone = document.getElementById("registerPhone").value;
    userDetails.email = document.getElementById("registerEmail").value;
    userDetails.password = document.getElementById("registerPassword").value;

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
        // bring back the password and confirm password input to password type
        document.getElementById("registerPassword").type = "password";
        document.getElementById("registerConfirmPassword").type = "password";
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

    // save the key of the current logged in user in sessionStorage
    sessionStorage.setItem("currentUser", `User_${emailInput}`);
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
    sessionStorage.removeItem("currentUser");
    document.getElementById("notLoggedIn").classList.remove("d-none");
    document.getElementById("loggedIn").classList.add("d-none");
}
document.getElementById("logoutUser").addEventListener("click", logout);

// ---------------------------------------------- //
// ---------------------------------------------- //
// --------------Input Validations--------------- //

let inputFname = document.getElementById("registerFirstName");
let inputLname = document.getElementById("registerLastName");
let inputPhone = document.getElementById("registerPhone");
let inputEmail = document.getElementById("registerEmail");
let inputPassword = document.getElementById("registerPassword");
let inputConfirmPassword = document.getElementById("registerConfirmPassword");
let inputCheckbox = document.getElementById("registerCheck");

// oninvalid and oninput event for First Name
inputFname.oninvalid = function (event) {
    event.target.setCustomValidity("Please enter your first name");
    event.target.classList.add("is-invalid");
};
inputFname.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};

// for Last Name
inputLname.oninvalid = function (event) {
    event.target.setCustomValidity("Please enter your last name");
    event.target.classList.add("is-invalid");
};
inputLname.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};

// for Phone

inputPhone.oninvalid = function (event) {
    event.target.setCustomValidity("Please enter your phone number");
    event.target.classList.add("is-invalid");
};
inputPhone.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};

// for Email
inputEmail.oninvalid = function (event) {
    event.target.setCustomValidity("Please enter your email");
    event.target.classList.add("is-invalid");
};
inputEmail.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};

// for Password
inputPassword.oninvalid = function (event) {
    event.target.setCustomValidity("Password must be 8-16 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number");
    event.target.classList.add("is-invalid");
};
inputPassword.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};

// for Confirm Password
inputConfirmPassword.oninvalid = function (event) {
    event.target.setCustomValidity("Please repeat your password");
    event.target.classList.add("is-invalid");
};
inputConfirmPassword.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};

// for Checkbox
inputCheckbox.oninvalid = function (event) {
    event.target.setCustomValidity("Please read and agree to the Terms and Conditions");
    event.target.classList.add("is-invalid");
};
inputCheckbox.oninput = function (event) {
    event.target.setCustomValidity("");
    event.target.classList.remove("is-invalid");
};
// ---------------------------------------------- //
// -----------End of Input Validations---------- //

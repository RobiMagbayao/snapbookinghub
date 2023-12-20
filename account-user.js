// Validate phone number
function validatePhone() {
    let notif = document.getElementById("phoneNotice");
    let phone = document.getElementById("registerPhone");
    notif.classList.remove("d-none");

    //Hide notice if conditions are met
    if (phone.value.length == 10 && phone.value.match(/[0-9]/)) {
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

let customerID = parseInt(localStorage.getItem("customerID")) || 1;

//saves the value of current booking number
let currentBookingNumber = parseInt(localStorage.getItem("bookingNumber")) || 1;

// Create a new object to hold user details and booking details
let userDetails = {};

// Function to save user details to local storage
function saveUserDetails(event) {
    // ------------- Below Edited by Jaybe -------------- //
    event.preventDefault();

    // Check if email is already existing in localStorage
    const emailToCheck = document.getElementById("registerEmail").value;
    let existingEmail = false;

    // Loop through all the users in localStorage
    for (let i = 1; i < customerID; i++) {
        let storedUserDetails = JSON.parse(localStorage.getItem(`User_No${i}`));

        if (storedUserDetails && storedUserDetails.email === emailToCheck) {
            existingEmail = true;
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
    userDetails.bookingNo = currentBookingNumber;

    // ------------- Above Edited by Jaybe -------------- //

    //START OF FILTERING USER - ANOTHER FUNCTION
    // Retrieve the array of order details from local storage
    const allOrderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];

    // Filter the array to get details with bookingNumber equal to 1
    const bookingNumberDetails = allOrderDetails.filter((order) => order.bookingNumber == 1);

    userDetails.order = bookingNumberDetails[1 - 1];

    //END OF FILTERING USER

    const existingUserData = JSON.parse(localStorage.getItem("userDetails")) || [];

    // Add the new form data
    existingUserData.push(userDetails);

    // Store updated form data in localStorage
    localStorage.setItem(`User_No${customerID}`, JSON.stringify(userDetails));

    // Increment customerID for the next order
    customerID += 1;

    // Update bookingNumber in local storage
    localStorage.setItem("customerID", customerID.toString());
}

// Add event listener to the button that triggers the saveUserDetails function
document.getElementById("registerForm").addEventListener("submit", saveUserDetails); // Made it as submit instead of click

//not yet working
// WRITE NEW FORM TO NEW HTML
const showUserData = JSON.parse(localStorage.getItem("userDetails"));

if (showUserData) {
    // Iterate through stored form data and display entries
    showUserData.forEach((userDetails) => {
        const newEntry = document.createElement("div");

        // Start building the inner HTML
        let innerHTML = `
        <strong>Name:</strong> ${userDetails.name}<br>
        <strong>Email:</strong> ${userDetails.email}<br>
        <strong>Password:</strong> ${userDetails.password}`;

        // Check if there are booking details
        if (userDetails.bookingDetails) {
            innerHTML += `<br><strong>Order:</strong> ${userDetails.bookingDetails}`;
        }

        // Add a horizontal line to separate add-ons from other details
        innerHTML += `<hr>`;

        // Set the innerHTML for the newEntry
        newEntry.innerHTML = innerHTML;

        // Append the entry to the output div
        document.getElementById("userOutput").appendChild(newEntry);
    });
}

// ---------------------------------------------- //

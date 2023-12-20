let customerID = parseInt(localStorage.getItem("customerID")) || 1;
let currentBookingNumber = parseInt(localStorage.getItem("bookingNumber")) || 1;
// Create a new object to hold user details and booking details
let userDetails = {};

// Function to save user details to local storage
function saveUserDetails() {
    userDetails.name = document.getElementById("registerName").value;
    userDetails.email = document.getElementById("registerEmail").value;
    userDetails.password = document.getElementById("registerPassword").value;
    userDetails.bookingNo = currentBookingNumber;

    
//START OF FILTERING USER - ANOTHER FUNCTION
// Retrieve the array of order details from local storage
const allOrderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

// Filter the array to get details with bookingNumber equal to 1
const bookingNumberDetails = allOrderDetails.filter(order => order.bookingNumber == 1);

    userDetails.order = bookingNumberDetails[1-1];

//END OF FILTERING USER

    const existingUserData = JSON.parse(localStorage.getItem('userDetails')) || [];

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
document.getElementById("registerBtn").addEventListener("click", saveUserDetails);



//not yet working
// WRITE NEW FORM TO NEW HTML
const showUserData = JSON.parse(localStorage.getItem('userDetails'));

if (showUserData) {
    // Iterate through stored form data and display entries
    showUserData.forEach(userDetails => {
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

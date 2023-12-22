// Display number of registered users
function displayUserStats() {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);

    // Initialize the counter
    let registeredUsers = 0;

    // Iterate through keys and count those that represent users
    keys.forEach((key) => {
        // Check if the key includes an email address
        if (key.includes("User_")) {
            registeredUsers++;
        }
    });

    // Display the number of registered users
    document.getElementById("totalUsers").innerText = registeredUsers;
}

// on load run the function
displayUserStats();

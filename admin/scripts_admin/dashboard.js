// Display the number of registered users from localStorage
let userCount = 0;

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith("User_")) {
        userCount++;
    }
}

document.getElementById("totalUsers").textContent = userCount;

// -------------------------------- //

// Display the number of all bookings or orderDetails from localStorage

let bookingCount = 0;

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith("User_")) {
        let storedData = JSON.parse(localStorage.getItem(key));

        if (storedData.orderDetails) {
            bookingCount += storedData.orderDetails.length;
        }
    }
}

document.getElementById("all-booking").textContent = bookingCount;

// -------------------------------- //

// Display the number of all Upcoming bookings or orderDetails from localStorage

let upcomingCount = 0;

// Get the current date
let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith("User_")) {
        let storedData = JSON.parse(localStorage.getItem(key));

        if (storedData.orderDetails) {
            for (let orderDetail of storedData.orderDetails) {
                let orderDate = new Date(orderDetail.date);
                orderDate.setHours(0, 0, 0, 0);

                if (orderDate.getTime() > currentDate.getTime()) {
                    upcomingCount++;
                }
            }
        }
    }
}

document.getElementById("upcoming").textContent = upcomingCount;

// -------------------------------- //

// Display the number of Completed bookings or orderDetails from localStorage

let completedCount = 0;

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith("User_")) {
        let storedData = JSON.parse(localStorage.getItem(key));

        if (storedData.orderDetails) {
            for (let orderDetail of storedData.orderDetails) {
                let orderDate = new Date(orderDetail.date);
                orderDate.setHours(0, 0, 0, 0);

                if (orderDate.getTime() < currentDate.getTime()) {
                    completedCount++;
                }
            }
        }
    }
}

document.getElementById("event-completed").textContent = completedCount;

// -------------------------------- //

// Display the latest 2 new recent bookings or orderDetails from localStorage

// Initialize an array for all orderDetails
let allOrderDetails = [];

// Iterate over all keys in localStorage
for (let i = 0; i < localStorage.length; i++) {
    // Get key at index i
    let key = localStorage.key(i);

    // Check if key starts with 'User_'
    if (key.startsWith("User_")) {
        // Parse the stored data
        let storedData = JSON.parse(localStorage.getItem(key));

        // Check if orderDetails exist in the stored data
        if (storedData.orderDetails) {
            // Iterate over the orderDetails array
            for (let orderDetail of storedData.orderDetails) {
                // Add the orderDetail to the array along with the user's email
                allOrderDetails.push({
                    email: key.slice(5), // Remove 'User_' from the key to get the email
                    orderDetail: orderDetail,
                });
            }
        }
    }
}

// Sort the array by date in descending order
allOrderDetails.sort((a, b) => new Date(b.orderDetail.date) - new Date(a.orderDetail.date));

// Take the first 2 elements
let recentOrderDetails = allOrderDetails.slice(0, 2);

// Get the tbody element
let tbody = document.querySelector("tbody");

// Add a row to the table for each recent orderDetail
for (let { email, orderDetail } of recentOrderDetails) {
    let row = document.createElement("tr");

    let date = new Date(orderDetail.date);
    let formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    row.innerHTML = `
        <td>${orderDetail.bookingNumber}</td>
        <td>${email}</td>
        <td>${orderDetail.package}</td>
        <td>${orderDetail.municipality}</td>
        <td>${formattedDate}</td>
        <td>${orderDetail.totalPrice}</td>
        
    `;
    tbody.appendChild(row);
}

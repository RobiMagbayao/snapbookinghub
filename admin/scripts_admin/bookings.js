//Get the booking details from the localStorage
let bookingNumber = parseInt(localStorage.getItem("bookingNumber")) || 1;

// Get the table body where you want to display the data
let tableBody = document.querySelector("#booking-table tbody");

// Get the saved details from local storage
let savedDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];

// Function to display the booking details in the table
function displayBookingDetails() {
    // Clear the table body

    // Loop through the saved details
    for (let i = 0; i < savedDetails.length; i++) {
        // Create a new row
        let row = document.createElement("tr");

        // Create a new cell for each column
        let bookingId = document.createElement("td span class='booking-id'");
        let username = document.createElement("td span class='user-name'");
        let packages = document.createElement("td span class='packages-id'");
        let addOn = document.createElement("span class='add-on-id'");
        let location = document.createElement("td span class='location-id'");
        let date = document.createElement("td span class='date-id'");
        let time = document.createElement("span class='time-id'");
        let total = document.createElement("td span class='total-id'");
        let status = document.createElement("td span class='status-id'");

        // Add the data to the cells
        bookingId.textContent = savedDetails[i].bookingNumber;
        date.textContent = savedDetails[i].date;
        status.textContent = savedDetails[i].status;

        // Append the cells to the row
        row.appendChild(bookingId);
        row.appendChild(date);
        row.appendChild(status);
        row.appendChild(action);

        // Append the row to the table body
        tableBody.appendChild(row);
    }
}

displayBookingDetails();

//------------------------------------------------------//

// Declare ascending as a boolean variable
let ascending = true;

// Function to sort the booking number in the table

function sortBookingNum() {
    var table = document.querySelector("#booking-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (rowA, rowB) {
        var idA = Number(rowA.querySelector(".booking-id").textContent);
        var idB = Number(rowB.querySelector(".booking-id").textContent);
        return ascending ? idA - idB : idB - idA;
    });

    // Arrange the rows in the tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    // Toggle for sorting in descending/ascending order
    ascending = !ascending;
}

// Event listener for sorting the booking number
document.querySelector("#sort-bookingNum").addEventListener("click", sortBookingNum);

//------------------------------------------------------//

// Function to sort the booking date in the table

function sortBookingDate() {
    var table = document.querySelector("#booking-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (rowA, rowB) {
        var dateA = new Date(rowA.querySelector(".date-id").textContent);
        var dateB = new Date(rowB.querySelector(".date-id").textContent);
        return ascending ? dateA - dateB : dateB - dateA;
    });

    // Arrange the rows in the tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    // Toggle for sorting in descending/ascending order
    ascending = !ascending;
}

// Attach the sorting function to the sort button
document.querySelector("#sort-date").addEventListener("click", sortBookingDate);

//------------------------------------------------------//

// Function to sort the status in the table

function sortBookingStatus() {
    var table = document.querySelector("#booking-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (rowA, rowB) {
        var statusA = rowA.querySelector(".status-id").textContent;
        var statusB = rowB.querySelector(".status-id").textContent;
        return ascending ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
    });

    // Arrange the rows in the tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    // Toggle for sorting in descending/ascending order
    ascending = !ascending;
}

// Attach the sorting function to the sort button
document.querySelector("#sort-status").addEventListener("click", sortBookingStatus);

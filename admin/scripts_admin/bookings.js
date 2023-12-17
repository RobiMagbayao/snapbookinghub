// Function to sort the booking number in the table
var ascending = true;

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
var ascending = true;

function sortBookingDate() {
    var table = document.querySelector("#booking-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (a, b) {
        var dateA = new Date(a.querySelector(".date-id").textContent);
        var dateB = new Date(b.querySelector(".date-id").textContent);
        return ascending ? dateA - dateB : dateB - dateA;
    });

    // Rearrange the rows in the tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    // Toggle the sorting order for the next call
    ascending = !ascending;
}

// Attach the sorting function to the sort button
document.querySelector("#sort-date").addEventListener("click", sortBookingDate);

//------------------------------------------------------//

// Function to sort the status in the table
var ascending = true;

function sortBookingStatus() {
    var table = document.querySelector("#booking-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (a, b) {
        var statusA = a.querySelector(".status-id").textContent;
        var statusB = b.querySelector(".status-id").textContent;
        return ascending ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
    });

    // Rearrange the rows in the tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    // Toggle the sorting order for the next call
    ascending = !ascending;
}

// Attach the sorting function to the sort button
document.querySelector("#sort-status").addEventListener("click", sortBookingStatus);

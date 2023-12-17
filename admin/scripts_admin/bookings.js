// Get and display the orderDetails from localStorage to the #booking-table
const storedFormData = JSON.parse(localStorage.getItem("orderDetails"));
let bookingTable = document.querySelector("#booking-table tbody");

if (storedFormData) {
    storedFormData.forEach((orderDetails) => {
        // Iterate through stored form data and display entries
        storedFormData.forEach((orderDetails) => {
            // Create new row for the table with each td has class name
            let newRow = document.createElement("tr");
            newRow.innerHTML = `
        <td class="booking-id">${orderDetails.bookingNumber}</td>
        <td class="user-name-id">${orderDetails.date}</td>
        <td class= "package-id">${orderDetails.package} <br> ${orderDetails.AddOn} </td>
        <td class="location-id">${orderDetails.eventAddress}, ${orderDetails.municipality}, ${orderDetails.province}</td>
        <td class="date-id">${orderDetails.date} <br> ${orderDetails.time} </td>
        <td class="total-price-id">₱${orderDetails.totalPrice}</td>
        
        `;
        });
    });
}

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

// Get and display the orderDetails from localStorage to the #booking-table
const storedFormData = JSON.parse(localStorage.getItem("orderDetails"));
let bookingTable = document.querySelector("#booking-table tbody");

if (storedFormData) {
    // Iterate through stored form data and display entries
    storedFormData.forEach((orderDetails) => {
        // Create new row for the table with each td has class name
        let newRow = document.createElement("tr");

        // let user-name a sample name
        let userName = "Juana Dela Cruz";

        // Add 0000 to the booking number if it is less than 4 digits
        let bookingNumber = orderDetails.bookingNumber;
        if (bookingNumber < 10) {
            bookingNumber = "000" + bookingNumber;
        } else if (bookingNumber < 100) {
            bookingNumber = "00" + bookingNumber;
        } else if (bookingNumber < 1000) {
            bookingNumber = "0" + bookingNumber;
        } else {
            bookingNumber = bookingNumber;
        }

        // Check if there are any add-ons if none, display "No Add-Ons"
        let addOns = "";
        if (orderDetails.userAddOnBirthdayProps) {
            addOns += "Birthday Props" + ", ";
        }
        if (orderDetails.userAddOnWeddingProps) {
            addOns += "Wedding Props" + ", ";
        }
        if (orderDetails.userAddOnGraduationProps) {
            addOns += "Graduation Props" + ", ";
        }
        if (orderDetails.userAddOnPhotoFilter) {
            addOns += "Photo Filter" + ", ";
        }
        if (orderDetails.userAddOnVideoMessage) {
            addOns += "Video Message" + ", ";
        }
        if (orderDetails.userAddOnBoomerang) {
            addOns += "Boomerang" + ", ";
        }
        if (orderDetails.userAddOnPhoneBooth) {
            addOns += "Phone Booth" + ", ";
        }
        if (orderDetails.userAddOnPhotoBook) {
            addOns += "Photo Book" + ", ";
        }
        if (orderDetails.userAddOnBackdrop) {
            addOns += "Backdrop" + ", ";
        }
        if (orderDetails.userAddOnPrintPhoto) {
            addOns += "Print Photo" + ", ";
        }
        if (addOns === "") {
            addOns = "No Add-Ons";
        } else {
            // Remove the last comma and space
            addOns = addOns.slice(0, -2);
        }

        // Format date to abbreviated month, day, year
        let date = new Date(orderDetails.date);
        let formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        // Format time to 12-hour format
        let [hours, minutes] = orderDetails.time.split(":");
        let period = +hours < 12 ? "AM" : "PM";

        if (hours == 0) {
            hours = 12;
        } else if (hours > 12) {
            hours = hours - 12;
        }

        let formattedTime = `${hours}:${minutes} ${period}`;

        // Set status of the booking
        let currentDate = new Date();
        let formattedCurrentDate = currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        let status = "";
        if (formattedDate > formattedCurrentDate) {
            status = "Upcoming";
        } else if (formattedDate === formattedCurrentDate) {
            status = "Ongoing";
        } else {
            status = "Completed";
        }

        // SET THE CONTENT OF THE ROW WITH THE ORDER DETAILS
        let bookedDetails = `
        <td><span class="booking-id">${bookingNumber}</span></td>
        <td><span class="user-name-id">${userName}</span></td>
        <td><span class= "package-id">${orderDetails.package}</span> <br> <span class="small">${addOns}</span></td>
        <td><span class="location-id">${orderDetails.eventAddress}</span>, <span>${orderDetails.municipality}</span>, <span>${orderDetails.province}</span></td>
        <td><span class="date-id">${formattedDate}</span> <br> <span>${formattedTime}</span></td>
        <td><span class="total-price-id">₱${orderDetails.totalPrice}<span></td>
        <td><span class="status-id">${status}<span></td>`;

        // Put the bookedDetails to the row
        newRow.innerHTML = bookedDetails;

        // Append the new row to the table
        bookingTable.appendChild(newRow);
    });
}

//------------------------------------------------------//
// Sorting functions

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

// Get and display the orderDetails from localStorage to the #booking-table
let bookingTable = document.querySelector("#booking-table tbody");

// Iterate over all keys in localStorage
for (let i = 0; i < localStorage.length; i++) {
    // Get key at index i
    let key = localStorage.key(i);

    // Check if key matches the format 'User_${email}'
    if (key.startsWith("User_")) {
        // Parse the stored data
        let storedData = JSON.parse(localStorage.getItem(key));

        // Get the first name and last name of the user
        let firstName = storedData.firstName;
        let lastName = storedData.lastName;

        // Check if orderDetails exist in the stored data
        if (storedData.orderDetails) {
            // Iterate through stored form data and display entries
            storedData.orderDetails.forEach((orderDetails) => {
                // Create new row for the table with each td has class name
                let newRow = document.createElement("tr");

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
                let formattedDate = "";
                let formattedTime = "";

                if (orderDetails.date) {
                    let date = new Date(orderDetails.date);
                    formattedDate = date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    });
                }

                if (orderDetails.time) {
                    // Format time to 12-hour format
                    let [hours, minutes] = orderDetails.time.split(":");
                    let period = +hours < 12 ? "AM" : "PM";

                    if (hours == 0) {
                        hours = 12;
                    } else if (hours > 12) {
                        hours = hours - 12;
                    }

                    formattedTime = `${hours}:${minutes} ${period}`;
                }

                // Set status of the booking
                let currentDate = new Date();
                let formattedCurrentDate = currentDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
                let status = "";

                if (!orderDetails.date) {
                    status = `<span class="text-danger fw-medium">Cancelled</span>`;
                } else if (formattedDate > formattedCurrentDate) {
                    status = `<span class="text-success fw-medium">Upcoming</span>`;
                } else if (formattedDate === formattedCurrentDate) {
                    status = `<span class="text-warning fw-medium">Ongoing</span>`;
                } else if (formattedDate < formattedCurrentDate) {
                    status = `<span class="text-primary fw-medium">Completed</span>`;
                }

                // SET THE CONTENT OF THE ROW WITH THE ORDER DETAILS
                let bookedDetails = `
        <td><span class="booking-id">${bookingNumber}</span></td>
        <td><span class="user-name-id">${firstName} ${lastName}</span></td>
        <td><span class= "package-id">${orderDetails.package}</span> <br> <span class="small">${addOns}</span></td>
        <td><span class="location-id small">${orderDetails.eventAddress}</span>, <span class="small">${orderDetails.municipality}</span>, <span class="small">${orderDetails.province}</span></td>
        <td><span class="date-id">${formattedDate}</span> <br> <span>${formattedTime}</span></td>
        <td><span class="total-price-id">₱${orderDetails.totalPrice}<span></td>
        <td><span class="status-id">${status}<span></td>
        <td><form><select class="form-select form-select-sm">
        <option class="small" selected disabled>Choose</option>
        <option value="1">Cancel</option>
        <option value="2">Reschedule</option></select></form></td>`;

                // Put the bookedDetails to the row
                newRow.innerHTML = bookedDetails;

                // Append the new row to the table
                bookingTable.appendChild(newRow);
            });
        }
    }
}

// ------------------------------------------------------//
// Cancel and Reschedule functions
let selectElements = document.querySelectorAll(".form-select");

// Add event listener for the change event to each select element
selectElements.forEach((selectElement) => {
    selectElement.addEventListener("change", function () {
        // Get the selected option
        let selectedOption = this.value;

        // Get the row element
        let row = this.closest("tr");

        // Get the status, date, and time elements
        let statusElement = row.querySelector(".status-id");
        let dateElement = row.querySelector(".date-id");
        let timeElement = row.querySelector(".time-id");

        // Get the booking id
        let bookingId = row.querySelector(".booking-id").textContent;

        // Check if 'Cancel' is selected
        if (selectedOption === "1") {
            // Show a confirmation prompt
            let confirmCancel = confirm("Are you sure you want to cancel this booking?");
            if (confirmCancel) {
                // Change status to Cancelled
                statusElement.innerHTML = '<span class="text-danger fw-medium">Cancelled</span>';

                // Permanent cancel of the booking
                for (let i = 0; i < localStorage.length; i++) {
                    // Get key at index i
                    let key = localStorage.key(i);

                    // Check if key matches the format 'User_${email}'
                    if (key.startsWith("User_")) {
                        // Parse the stored data
                        let storedData = JSON.parse(localStorage.getItem(key));

                        // Check if orderDetails exist in the stored data
                        if (storedData.orderDetails) {
                            // Find the orderDetail with the matching booking id
                            let orderDetail = storedData.orderDetails.find((od) => od.bookingNumber == bookingId);

                            // Check if a matching orderDetail was found
                            if (orderDetail) {
                                // Remove the date and time
                                orderDetail.date = "";
                                orderDetail.time = "";

                                // Stringify and save the updated data back to localStorage
                                localStorage.setItem(key, JSON.stringify(storedData));
                            }
                        }
                    }
                }
            }
        }

        // Check if 'Reschedule' is selected
        else if (selectedOption === "2") {
            // Show a prompt to enter the new date and time
            let newDate = prompt("Please enter the new date for this booking (YYYY-MM-DD):");
            let newTime = prompt("Please enter the new time for this booking (HH:MM):");

            // Regexp to check the date and time format
            let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            let timeRegex = /^\d{2}:\d{2}$/;

            // Check if the entered date and time follow the correct format
            if (!dateRegex.test(newDate) || !timeRegex.test(newTime)) {
                alert("Invalid date or time format. Please enter the date in the format YYYY-MM-DD and the time in the format HH:MM.");
                return;
            }

            if (newDate && newTime) {
                // Change the booking date and time
                dateElement.textContent = newDate;
                timeElement.textContent = newTime;

                // Iterate over all keys in localStorage
                for (let i = 0; i < localStorage.length; i++) {
                    // Get key at index i
                    let key = localStorage.key(i);

                    // Check if key matches the format 'User_${email}'
                    if (key.startsWith("User_")) {
                        // Parse the stored data
                        let storedData = JSON.parse(localStorage.getItem(key));

                        // Check if orderDetails exist in the stored data
                        if (storedData.orderDetails) {
                            // Find the orderDetail with the matching booking id
                            let orderDetailIndex = storedData.orderDetails.findIndex((od) => od.bookingNumber == bookingId);

                            // Check if a matching orderDetail was found
                            if (orderDetailIndex != -1) {
                                // Update the date and time
                                storedData.orderDetails[orderDetailIndex].date = newDate;
                                storedData.orderDetails[orderDetailIndex].time = newTime;

                                // Stringify and save the updated data back to localStorage
                                localStorage.setItem(key, JSON.stringify(storedData));
                            }
                        }
                    }
                }
            }
        }
    });
});

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

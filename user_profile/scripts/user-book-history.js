//Loader
let preLoader = document.getElementById("loader");

setTimeout(preLoaderHandler, 1000);

function preLoaderHandler() {
    preLoader.style.opacity = "0";
    preLoader.style.zIndex = "-100";
    preLoader.style.transition = "all .7s";
}

// ---------------------------------------- //

// display all user's all orderDetails
let currentUser = sessionStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentUser));
let bookingTable = document.querySelector("#bookingHistory tbody");

if (userData.orderDetails) {
    userData.orderDetails.forEach((orderDetails) => {
        let newRow = document.createElement("tr");

        // Add 000 to booking number
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
        currentDate.setHours(0, 0, 0, 0); // date format for comparison
        let status = "";

        if (!orderDetails.date) {
            status = `<span class="text-danger fw-medium">Cancelled</span>`;
        } else {
            let orderDate = new Date(orderDetails.date);
            orderDate.setHours(0, 0, 0, 0);

            if (orderDate.getTime() > currentDate.getTime()) {
                status = `<span class="text-success fw-medium">Upcoming</span>`;
            } else if (orderDate.getTime() === currentDate.getTime()) {
                status = `<span class="text-warning fw-medium">Ongoing</span>`;
            } else if (orderDate.getTime() < currentDate.getTime()) {
                status = `<span class="text-primary fw-medium">Completed</span>`;
            }
        }

        let bookedDetails = `
        <td><span class="booking-id">${bookingNumber}</span></td>
        <td><span class= "package-id">${orderDetails.package}</span> | <span class="small">${addOns}</span></td>
        <td><span class="date-id">${formattedDate}</span></td>
        <td><span class="time-id">${formattedTime}</span></td>
        <td><span class="status-id">${status}</span></td>
        `;

        // Put the bookedDetails to the row
        newRow.innerHTML = bookedDetails;

        // Append the new row to the table
        bookingTable.appendChild(newRow);
    });
}

// ---------------------------------------- //

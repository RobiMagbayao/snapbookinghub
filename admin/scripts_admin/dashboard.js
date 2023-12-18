// Display the number of upcoming bookings
function displayBookingsStats() {
    // Get the data from localStorage
    const storedFormData = JSON.parse(localStorage.getItem("orderDetails"));

    // Get the current date
    const currentDate = new Date();

    // Initialize the counter
    let upcomingBookings = "00";

    // Iterate through stored form data and display entries
    storedFormData.forEach((orderDetails) => {
        // Get the date of the event
        const eventDate = new Date(orderDetails.date);

        // Check if the event date is greater than the current date
        if (eventDate > currentDate) {
            upcomingBookings++;
        }
    });

    // Display the number of upcoming bookings
    document.getElementById("upcoming").innerHTML = upcomingBookings;

    // Display the number of total bookings
    document.getElementById("all-booking").innerHTML = storedFormData.length;

    // Display the number of finished/completed bookings
    document.getElementById("event-completed").innerHTML = storedFormData.length - upcomingBookings;
}

displayBookingsStats();

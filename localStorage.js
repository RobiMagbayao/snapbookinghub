//WRITE NEW FORM TO NEW HTML
const storedFormData = JSON.parse(localStorage.getItem('orderDetails'));

if (storedFormData) {
    // Iterate through stored form data and display entries
    storedFormData.forEach(orderDetails => {
        const newEntry = document.createElement("div");

        // Get the current timestamp
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        // Start building the inner HTML
        let innerHTML = `
        <strong>Date of Entry:</strong> ${formattedDate}, ${formattedTime}<br>
        <strong>Booking Number:</strong> ${orderDetails.bookingNumber}<br>
        <strong>Event Date:</strong> ${orderDetails.date}<br>
        <strong>Event Time:</strong> ${orderDetails.time}<br>
        <strong>Event Location:</strong> ${orderDetails.eventAddress}, ${orderDetails.municipality}, ${orderDetails.province}<br>
        <strong>Package:</strong> ${orderDetails.package}<br>
        <strong>Total Price: </strong> ₱${orderDetails.totalPrice}<br>`;

        // Check if add-ons are present in orderDetails
        if (orderDetails.userAddOnBirthdayProps) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnBirthdayProps}<br>`;
        }
        if (orderDetails.userAddOnWeddingProps) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnWeddingProps}<br>`;
        }
        if (orderDetails.userAddOnGraduationProps) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnGraduationProps}<br>`;
        }
        if (orderDetails.userAddOnPhotoFilter) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnPhotoFilter}<br>`;
        }
        if (orderDetails.userAddOnVideoMessage) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnVideoMessage}<br>`;
        }
        if (orderDetails.userAddOnBoomerang) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnBoomerang}<br>`;
        }
        if (orderDetails.userAddOnPhoneBooth) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnPhoneBooth}<br>`;
        }
        if (orderDetails.userAddOnPhotoBook) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnPhotoBook}<br>`;
        }
        if (orderDetails.userAddOnBackdrop) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnBackdrop}<br>`;
        }
        if (orderDetails.userAddOnPrintPhoto) {
            innerHTML += `<strong>Add-On</strong>: ${orderDetails.userAddOnPrintPhoto}<br>`;
        }

        // Add a horizontal line to separate add-ons from other details
        innerHTML += `<hr>`;

        // Set the innerHTML for the newEntry
        newEntry.innerHTML = innerHTML;

        // Append the entry to the output div
        document.getElementById("outputOrder").appendChild(newEntry);
    });
}

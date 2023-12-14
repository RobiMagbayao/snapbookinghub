//WRITE NEW FORM TO NEW HTML
const storedFormData = JSON.parse(localStorage.getItem('orderDetails'));

if (storedFormData) {
    // Iterate through stored form data and display entries
    storedFormData.forEach(orderDetails => {
        const newEntry = document.createElement("div");


        //PART THAT USER/ADMIN CAN SEE
        newEntry.innerHTML = `<strong>Event Date:</strong> ${orderDetails.date}<br>
        <strong>Event Time:</strong> ${orderDetails.time}<br>
        <strong>Event Location:</strong> ${orderDetails.eventAddress}, ${orderDetails.municipality}, ${orderDetails.province}<br>
        <strong>Total Price: </strong> ₱${orderDetails.totalPrice}<br>
        <hr>`;

        // Append the entry to the output div
        document.getElementById("outputOrder").appendChild(newEntry);
    });
}
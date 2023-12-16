function submitForm() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Get the current date and time
    const dateTime = new Date();
    const formattedDateTime = dateTime.toLocaleString();

    // Create an object with form data
    const formData = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: formattedDateTime
    };

    // Retrieve existing form data from localStorage or initialize an empty array
    const existingFormData = JSON.parse(localStorage.getItem('formData')) || [];

    // Add the new form data
    existingFormData.push(formData);

    // Store updated form data in localStorage
    localStorage.setItem('formData', JSON.stringify(existingFormData));

    // Reset the form's validation state
    form.classList.remove('was-validated');

    // Clear the form fields
    form.reset();
}


//WRITE NEW FORM TO NEW HTML
const storedFormData = JSON.parse(localStorage.getItem('formData'));

if (storedFormData) {
    // Iterate through stored form data and display entries
    storedFormData.forEach(formData => {
        const newEntry = document.createElement("div");

        newEntry.innerHTML = `<strong>Submitted at:</strong> ${formData.timestamp}<br>
                            <strong>Name:</strong> ${formData.name}<br>
                            <strong>Email:</strong> ${formData.email}<br>
                            <strong>Phone:</strong> ${formData.phone}<br>
                            <strong>Message:</strong> ${formData.message}<br>
                            <hr>`;

        // Append the entry to the output div
        document.getElementById("output").appendChild(newEntry);
    });
}

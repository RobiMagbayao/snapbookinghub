function submitForm() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Check if any input field is blank
    if (!name || !email || !phone || !message) {
        alert("Please fill in all fields.");
        return;
    }

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

    // Clear the form fields
    document.getElementById("contactForm").reset();
}


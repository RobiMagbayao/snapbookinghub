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

    alert("Your message has been submitted. We will get back to you as soon as we can.");
    window.location.href = "index.html";

}
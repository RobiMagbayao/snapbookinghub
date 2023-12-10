const storedFormData = JSON.parse(sessionStorage.getItem('formData'));

if (storedFormData) {
    // Iterate through stored form data and display entries
    storedFormData.forEach(formData => {
        const newEntry = document.createElement("div");

        newEntry.innerHTML = `<strong>Name:</strong> ${formData.name}<br>
                              <strong>Email:</strong> ${formData.email}<br>
                              <strong>Phone:</strong> ${formData.phone}<br>
                              <strong>Message:</strong> ${formData.message}<br>
                              <strong>Submitted at:</strong> ${formData.timestamp}<br><hr>`;

        // Append the entry to the output div
        document.getElementById("output").appendChild(newEntry);
    });
}

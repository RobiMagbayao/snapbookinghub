//Form Validation
(() => {
    'use strict'

    
    const forms = document.querySelectorAll('.needs-validation')


    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
        }, false)
    })
})()

//SAVE DATA TO LOCAL STORAGE
function submitEmailForm() {
    // Get form values
    const newsletterEmail = document.getElementById("newsletter-email").value;

    // Get the current date and time
    const newsletterDateTime = new Date();
    const formattedNewslatterDateTime = newsletterDateTime.toLocaleString();

    // Create an object with form data
    const newsletterData = {
        newsletterEmail: newsletterEmail,
        timestamp: formattedNewslatterDateTime
    };

    // Retrieve existing form data from localStorage or initialize an empty array
    const existingNewsletterData = JSON.parse(localStorage.getItem('newsletterData')) || [];

    // Add the new form data
    existingNewsletterData.push(newsletterData);

    // Store updated form data in localStorage
    localStorage.setItem('newsletterData', JSON.stringify(existingNewsletterData));

    // Clear the form fields
    document.getElementById("newsletterForm").reset();
}



//WRITE NEW FORM TO NEW HTML
const storedNewsletterData = JSON.parse(localStorage.getItem('newsletterData'));

if (storedNewsletterData) {
    // Iterate through stored form data and display entries
    storedNewsletterData.forEach(newsletterData => {
        const newNewsletterEntry = document.createElement("div");

        newNewsletterEntry.innerHTML = `<strong>Submitted at:</strong> ${newsletterData.timestamp}<br>
                            <strong>Email:</strong> ${newsletterData.newsletterEmail}<br>
                            <hr>`;

        // Append the entry to the output div
        document.getElementById("newsletter-Emails").appendChild(newNewsletterEntry);
    });
}
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

let subscriberCount = parseInt(localStorage.getItem("subscriberCount")) || 0;
const getSubscriberCount = JSON.parse(localStorage.getItem('subscriberCount'));
        
function submitEmailForm() {
    // Get form values
    const newsletterEmail = document.getElementById("newsletter-email").value;


    // Get the current date and time
    const newsletterDateTime = new Date();
    const formattedNewslatterDateTime = newsletterDateTime.toLocaleString();

    // Create an object with form data
    const newsletterData = {
        newsletterEmail: newsletterEmail,
        timestamp: formattedNewslatterDateTime,
        subscriberCount: subscriberCount
    };

    // Retrieve existing form data from localStorage or initialize an empty array
    const existingNewsletterData = JSON.parse(localStorage.getItem('newsletterData')) || [];

    // Add the new form data
    existingNewsletterData.push(newsletterData);

    // Store updated form data in localStorage
    localStorage.setItem('newsletterData', JSON.stringify(existingNewsletterData));

    // Clear the form fields
    document.getElementById("newsletterForm").reset();

    // Increment subscriberCount for the next subscription
    subscriberCount += 1;

    // Update bookingNumber in local storage
    localStorage.setItem("subscriberCount", subscriberCount.toString());
}


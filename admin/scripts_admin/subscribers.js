//WRITE NEW FORM TO NEW HTML
const storedNewsletterData = JSON.parse(localStorage.getItem('newsletterData'));
const getSubscriberCount = JSON.parse(localStorage.getItem('subscriberCount'));

if (storedNewsletterData) {
    // Iterate through stored form data and display entries
    storedNewsletterData.forEach(newsletterData => {
        const newNewsletterEntry = document.createElement("tr");

        newNewsletterEntry.innerHTML = ` <td><input id="${newsletterData.newsletterEmail}" class="form-check-input" type="checkbox" name="options[]"></td>
                                        <td>${newsletterData.newsletterEmail}</td>
                                        <td>${newsletterData.timestamp}</td>`

        // Append the entry to the output div
        document.getElementById("newsletter-Emails").appendChild(newNewsletterEntry);

        document.getElementById("subscriberCount").innerHTML = `Subscriber Count: ${getSubscriberCount}`
    });
}

function sendEmail() {
    const selectedEmails = document.querySelectorAll('input[type="checkbox"]:checked');
    const emailAddresses = Array.from(selectedEmails).map((checkbox) => checkbox.id).join(',');
  
    const subject = "SnapBookingHub Newsletter";
    const body = "Your email body content.";
  
    const mailtoLink = `mailto:${emailAddresses}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    // Open the default email client
    window.location.href = mailtoLink;
  }
  
  // Assuming you have a button with id="sendEmailButton"
  document.getElementById("sendEmailButton").addEventListener("click", sendEmail);
  
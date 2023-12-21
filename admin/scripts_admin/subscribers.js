//WRITE NEW FORM TO NEW HTML
const storedNewsletterData = JSON.parse(localStorage.getItem('newsletterData'));

if (storedNewsletterData) {
    // Iterate through stored form data and display entries
    storedNewsletterData.forEach(newsletterData => {
        const newNewsletterEntry = document.createElement("tr");

        newNewsletterEntry.innerHTML = ` <td><input id="${newsletterData.newsletterEmail}" class="form-check-input" type="checkbox" name="options[]"></td>
                                        <td>${newsletterData.newsletterEmail}</td>
                                        <td>${newsletterData.timestamp}</td>`

        // Append the entry to the output div
        document.getElementById("newsletter-Emails").appendChild(newNewsletterEntry);
        
    });
}

function sendEmail() {
    const selectedEmails = document.querySelectorAll('input[type="checkbox"]:checked:not(#selectAll)');
  
    if (selectedEmails.length === 0) {
      // If no checkboxes are selected, show an alert and return
      alert("Please select at least one subscriber to send the email to.");
      return;
    }
  
    const emailAddresses = Array.from(selectedEmails).map((checkbox) => checkbox.id).join(',');
  
    const subject = "SnapBookingHub Newsletter";
    const body = "Your email body content.";
  
    const mailtoLink = `mailto:${emailAddresses}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    // Open the default email client
    window.location.href = mailtoLink;
  }
  
  // Assuming you have a button with id="sendEmailButton"
  document.getElementById("sendEmailButton").addEventListener("click", sendEmail);
  

  function selectAll() {
    const selectAllCheckbox = document.getElementById("selectAll");
    const subscriberCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  
    // Loop through all subscriber checkboxes and set their checked state
    subscriberCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  }
  
  // Add event listener to the "Select All Subscribers" checkbox
  document.getElementById("selectAll").addEventListener("change", selectAll);
  
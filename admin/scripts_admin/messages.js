//WRITE NEW FORM TO NEW HTML
const storedFormData = JSON.parse(localStorage.getItem('formData'));

if (storedFormData) {
    // Iterate through stored form data and display entries
    storedFormData.forEach(formData => {
        const newEntry = document.createElement("tr");
        
        newEntry.innerHTML = `  <td class="fw-bold reply-link" style="cursor: pointer;">Reply</td>
                                <td>${formData.timestamp}</td>
                                <td>${formData.name}</td>
                                <td>${formData.email}</td>
                                <td>${formData.phone}</td>
                                <td>${formData.message}</td>`;

        // Append the entry to the output div
        document.getElementById("output").appendChild(newEntry);
    });
}

// Add event listeners to "Reply" links
const replyLinks = document.querySelectorAll('.reply-link');

replyLinks.forEach(link => {
    link.addEventListener('click', handleReply);
});

function handleReply(event) {
    const replyLink = event.target;

    if (replyLink.textContent === "Reply") {
        // Set the subject and body for the email
        const subject = "Welcome to SnapBookingHub";
        const body = `Hi ${event.target.parentElement.querySelector('td:nth-child(3)').textContent}, thanks for messaging us.`;

        // Create the mailto link
        const mailtoLink = `mailto:${event.target.parentElement.querySelector('td:nth-child(4)').textContent}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the default email client
        window.location.href = mailtoLink;

        // Change the link text to "Replied" with a delay of 3 seconds
        setTimeout(() => {
            replyLink.textContent = "Replied";
        }, 3000);
    } else if (replyLink.textContent === "Replied") {
        // Ask for confirmation to change status to "Reply"
        const confirmChange = confirm("Are you sure you want to change the status to 'Reply'?");

        if (confirmChange) {
            // Change the link text back to "Reply"
            replyLink.textContent = "Reply";
        }
    }
}



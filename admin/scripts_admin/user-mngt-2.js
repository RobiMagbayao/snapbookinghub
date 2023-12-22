// Gloval variables
const tableBody = document.getElementById("user-table");

// -------------------------------------------- //
// Get the registered accounts from localStorage adn display it in the table

// Loop through all keys in localStorage
for (let i = 0; i < localStorage.length; i++) {
    // Get key at index i
    let key = localStorage.key(i);

    // Check if the key starts with 'User_'
    if (key.startsWith("User_")) {
        // Retrieve the user details from localStorage
        let storedUserDetails = JSON.parse(localStorage.getItem(key));

        if (storedUserDetails) {
            let tableRow = document.createElement("tr");
            tableRow.innerHTML = `
            <td class="text-center"><input type="checkbox" /></td>
            <td>${storedUserDetails.firstName}&nbsp;${storedUserDetails.lastName}</td>
            <td>${storedUserDetails.phone}</td>
            <td>${storedUserDetails.email}</td>
            <td><input type="password" class="bg-transparent border-0 passwordid" value="${storedUserDetails.password}" disabled readonly/></td>
            `;
            tableBody.appendChild(tableRow);
        }
    }
}

// -------------------------------------------- //
//
// -------------------------------------------- //

// Check counter
const userTable = document.getElementById("user-table");
const selected = userTable.querySelectorAll('input[type="checkbox"]');
const checkCounter = document.getElementById("check-counter");
let checked = 0;

function Counter() {
    checked = 0;
    for (let i = 0; i < selected.length; i++) {
        if (selected[i].checked) {
            checked++;
        }
    }
    // Update the counter
    checkCounter.innerHTML = `<strong>${checked}</strong>`;

    // Disable ResetPassword if multiple checkbox are checked
    const resetPassword = document.getElementById("reset-password");
    const deleteUser = document.getElementById("delete-user");
    if (checked > 1) {
        resetPassword.disabled = true;
        resetPassword.style.cursor = "default";
        resetPassword.style.opacity = "0.5";
        resetPassword.addEventListener("mouseover", function () {
            this.style.color = "inherit";
        });
        deleteUser.disabled = true;
        deleteUser.style.cursor = "default";
        deleteUser.style.opacity = "0.5";
        deleteUser.addEventListener("mouseover", function () {
            this.style.color = "inherit";
        });
    } else {
        resetPassword.disabled = false;
        resetPassword.style.cursor = "pointer";
        resetPassword.style.opacity = "1";
        resetPassword.addEventListener("mouseover", function () {
            this.style.color = "var(--headline-text)";
        });
        resetPassword.addEventListener("mouseout", function () {
            this.style.color = "inherit";
        });
        deleteUser.disabled = false;
        deleteUser.style.cursor = "pointer";
        deleteUser.style.opacity = "1";
        deleteUser.addEventListener("mouseover", function () {
            this.style.color = "var(--headline-text)";
        });
        deleteUser.addEventListener("mouseout", function () {
            this.style.color = "inherit";
        });
    }
}

// evenListerner for counter and disable reset password
userTable.addEventListener("click", Counter);

// -------------------------------------------- //

function resetPassword(newPassword) {
    // Loop through the checkboxes
    for (let i = 0; i < selected.length; i++) {
        // If the checkbox is checked
        if (selected[i].checked) {
            // Get the parent row of the checkbox
            let parentRow = selected[i].parentNode.parentNode;
            // Get the email cell (assuming it's the 4th cell in the row)
            let emailCell = parentRow.cells[3];
            // Get the email
            let email = emailCell.textContent;

            // Get the user details from localStorage using the email
            let storedUserDetails = JSON.parse(localStorage.getItem(`User_${email}`));
            if (storedUserDetails) {
                // Update the password
                storedUserDetails.password = newPassword;
                // Store the updated details back in localStorage
                localStorage.setItem(`User_${email}`, JSON.stringify(storedUserDetails));

                // Alert the user that the password has been reset
                alert(`Password for ${email} has been reset.`);
            }

            //reload the page
            location.reload();
        }
    }

    // Call the Counter function to update the counter
    Counter();
}

document.getElementById("reset-password").addEventListener("click", function () {
    // Count the number of checked checkboxes
    let checkedCount = Array.from(selected).filter((checkbox) => checkbox.checked).length;

    // If more than one checkbox is checked, return
    if (checkedCount > 1) {
        return;
    }

    // Otherwise, prompt for the new password and reset it
    let newPassword = prompt("Enter new password");
    if (newPassword) {
        resetPassword(newPassword);
    }
});

// -------------------------------------------- //
// -------------------------------------------- //

// Delete user function
function deleteUser() {
    // Loop through the checkboxes
    for (let i = 0; i < selected.length; i++) {
        // If the checkbox is checked
        if (selected[i].checked) {
            // Get the parent row of the checkbox
            let parentRow = selected[i].parentNode.parentNode;
            // Get the email cell (assuming it's the 4th cell in the row)
            let emailCell = parentRow.cells[3];
            // Get the email
            let email = emailCell.textContent;

            // Get the user details from localStorage using the email
            let storedUserDetails = JSON.parse(localStorage.getItem(`User_${email}`));
            if (storedUserDetails) {
                // Confirm the admin that they will delete also its booking details
                let confirmDelete = confirm(`Deleting the account of ${email} will alos delete all of its booking details. Do you want to proceed?`);
                if (confirmDelete) {
                    // Remove the user from localStorage
                    localStorage.removeItem(`User_${email}`);

                    // Decrease the counter for CustomerID in localStorage
                    let customerID = localStorage.getItem("CustomerID");
                    customerID--;

                    // Remove the row from the table
                    parentRow.remove();

                    // Alert the user that the account has been deleted
                    alert(`Account for ${email} has been deleted.`);
                }
            }

            location.reload();
        }
    }

    // Call the Counter function to update the counter
    Counter();
}

document.getElementById("delete-user").addEventListener("click", function () {
    // disable deleteUser if multiple checkbox are checked
    let checkedCount = Array.from(selected).filter((checkbox) => checkbox.checked).length;
    if (checkedCount > 1) {
        return;
    } else {
        deleteUser();
    }
});

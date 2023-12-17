const checkCounter = document.getElementById("check-counter");
const editPassword = document.getElementById("edit-password");
const deleteUser = document.getElementById("delete-user");
const showPassword = document.getElementById("show-password");
const userTable = document.getElementById("user-table");

// Function for "check counter"
function updateCheckCounter() {
    const checkboxes = userTable.querySelectorAll('input[type="checkbox"]');
    let selected = 0;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selected++;
        }
    });
    checkCounter.innerText = selected;

    // Disable "Show Password" and "Edit Password" if multiple checkbox are checked
    if (selected > 1) {
        editPassword.disabled;
        editPassword.style.cursor = "default";
        editPassword.style.opacity = "0.5";
        editPassword.addEventListener("mouseover", function () {
            this.style.color = "inherit";
        });
        showPassword.disabled;
        showPassword.style.cursor = "default";
        showPassword.style.opacity = "0.5";
        showPassword.addEventListener("mouseover", function () {
            this.style.color = "inherit";
        });
    } else {
        editPassword.disabled = false;
        editPassword.style.cursor = "pointer";
        editPassword.style.opacity = "1";
        editPassword.addEventListener("mouseover", function () {
            this.style.color = "var(--headline-text)";
        });
        editPassword.addEventListener("mouseout", function () {
            this.style.color = "inherit";
        });
        showPassword.disabled = false;
        showPassword.style.cursor = "pointer";
        showPassword.style.opacity = "1";
        showPassword.addEventListener("mouseover", function () {
            this.style.color = "var(--headline-text)";
        });
        showPassword.addEventListener("mouseout", function () {
            this.style.color = "inherit";
        });
    }
}

// Event listener for the number of Selected if checkbox are checked
userTable.addEventListener("change", function check(event) {
    if (event.target.type === "checkbox") {
        updateCheckCounter();
    }
});

// Event listener for the "Edit Password"
editPassword.addEventListener("click", function editPass() {
    const checkedBoxes = userTable.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length > 1) {
        editPassword.disabled;
    } else {
        editPassword.disabled = false;
        checkedBoxes.forEach(function (checkedBox) {
            const passwordField = checkedBox.closest("tr").querySelector("#password-id");
            const newPassword = prompt("Enter new password");
            if (newPassword) {
                passwordField.value = newPassword;
            }
        });
    }
});

// Event listener for the "Delete User"
deleteUser.addEventListener("click", function deleteRow() {
    const checkedBox = userTable.querySelectorAll('input[type="checkbox"]:checked');
    checkedBox.forEach(function (checkbox) {
        const tRow = checkbox.closest("tr");
        tRow.parentElement.removeChild(tRow);
    });
    updateCheckCounter();
});

// Event listener for "Show Password"
showPassword.addEventListener("click", function () {
    const checkedBox = userTable.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBox.length > 1) {
        showPassword.disabled;
    } else {
        editPassword.disabled = false;
        checkedBox.forEach(function (checked) {
            const passwordInput = checked.closest("tr").querySelector("#password-id");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        });
    }
});

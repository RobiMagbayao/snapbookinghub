let adminId = document.getElementById("adminIdInput");
let adminPword = document.getElementById("adminPassInput");
let repeatPword = document.getElementById("adminRepeatPass");
let adminRegForm = document.getElementById("adminRegForm");

// Show Password
function showPass() {
    let eyeBtn1 = document.getElementById("showpass1");
    let eyeBtn2 = document.getElementById("showpass2");

    if (adminPword.type === "password") {
        adminPword.type = "text";
        repeatPword.type = "text";
        eyeBtn1.innerHTML = '<i class="bi bi-eye-slash"></i>';
        eyeBtn2.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else if (adminPword.type === "text") {
        adminPword.type = "password";
        repeatPword.type = "password";
        eyeBtn1.innerHTML = '<i class="bi bi-eye"></i>';
        eyeBtn2.innerHTML = '<i class="bi bi-eye"></i>';
    }
}

// Validate Password
adminPword.onkeyup = function () {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (
        adminPword.value.match(lowerCaseLetters) &&
        adminPword.value.match(upperCaseLetters) &&
        adminPword.value.match(numbers) &&
        adminPword.value.length >= 6
    ) {
        document.getElementById("notif").innerHTML = "";
    } else {
        document.getElementById("notif").innerHTML = "Password must contain 6+ characters with at least 1 number and 1 uppercase letter.";
    }
};

// Submit Registration
adminRegForm.addEventListener("submit", function regAdmin(e) {
    e.preventDefault();
    let adminName = adminId.value.trim();
    let adminPwd = adminPword.value.trim();
    if (repeatPword.value == adminPword.value) {
        localStorage.setItem("adminId", adminName);
        localStorage.setItem("adminPword", adminPwd);
        document.getElementById("notif").innerHTML = "Registration Complete, You will be redirect to the Log In Page";
        setTimeout(() => {
            location.replace("./");
        }, 3000);
    } else {
        document.getElementById("notif").innerHTML = "Password did not Match.";
    }
});

// Data inputted, Form Id and registered account registered in localStorage
let loginForm = document.getElementById("adminLogin");
let adminLoginId = document.getElementById("adminloginId");
let adminLoginPwd = document.getElementById("adminloginPwd");
let regAdminId = "admin";
let regAdminPwd = "password";

// When submitted the Form executes the function
loginForm.addEventListener("submit", function (x) {
    // Prevents refresh of the page when submitted
    x.preventDefault();
    // Compare inputted ID and Password to the stored regstred account
    if (adminLoginId.value == regAdminId && adminLoginPwd.value == regAdminPwd) {
        document.getElementById("error1").innerHTML = "";
        document.getElementById("loginBtn").innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Logging In...';
        setTimeout(() => {
            document.getElementById("logindiv").style.display = "none";
            document.getElementById("logindiv").style.zIndex = "-100";
        }, 4000);
    } else {
        document.getElementById("error1").innerHTML = "ID and Password did not Match.";
    }
});

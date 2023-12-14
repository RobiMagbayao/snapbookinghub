let loginForm = document.getElementById("adminLogin");
let adminLoginId = document.getElementById("adminloginId");
let adminLoginPwd = document.getElementById("adminloginPwd");
let regAdminId = localStorage.getItem("adminId");
let regAdminPwd = localStorage.getItem("adminPword");

loginForm.addEventListener("submit", function () {
    event.preventDefault();
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

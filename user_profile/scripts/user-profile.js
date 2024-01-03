//Loader
let preLoader = document.getElementById("loader");

setTimeout(preLoaderHandler, 1000);

function preLoaderHandler() {
    preLoader.style.opacity = "0";
    preLoader.style.zIndex = "-100";
    preLoader.style.transition = "all .7s";
}

// Time Greeting
const currentTime = new Date().getHours();
let greet = document.getElementById("Greet");

greet.innerText = currentTime;

if (currentTime >= 0 && currentTime <= 10) {
    greet.innerText = "Good Morning";
} else if (currentTime >= 11 && currentTime <= 12) {
    greet.innerText = "Good Noon";
} else if (currentTime >= 13 && currentTime <= 17) {
    greet.innerText = "Good Afternoon";
} else {
    greet.innerText = "Good Evening";
}

// Add User Data to HTML
let currentUser = sessionStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentUser));
let latestOrder = userData.orderDetails[userData.orderDetails.length - 1];

// Add 000 to booking number
let bookingNumber = latestOrder.bookingNumber;
if (bookingNumber < 10) {
    bookingNumber = "000" + bookingNumber;
} else if (bookingNumber < 100) {
    bookingNumber = "00" + bookingNumber;
} else if (bookingNumber < 1000) {
    bookingNumber = "0" + bookingNumber;
} else {
    bookingNumber = bookingNumber;
}

// Format Date and Time

var date = new Date(latestOrder.date);
latestOrder.date = date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

// format time AM and PM
var timeParts = latestOrder.time.split(":");
var hours = parseInt(timeParts[0]);
var minutes = parseInt(timeParts[1]);

// Convert to AM/PM format
var ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? "0" + minutes : minutes;
var strTime = hours + ":" + minutes + " " + ampm;
latestOrder.time = strTime;

window.addEventListener("load", () => {
    document.getElementById("fName").innerHTML = userData.firstName;
    document.getElementById("lName").innerHTML = userData.lastName;
    document.getElementById("userEmail").innerHTML = userData.email;
    document.getElementById("book-num").innerHTML = bookingNumber;
    document.getElementById("package-id").innerHTML = latestOrder.package;
    document.getElementById("book-date").innerHTML = latestOrder.date;
    document.getElementById("book-time").innerHTML = latestOrder.time;

    // Add-on list graphics

    let addOnFound = false;

    if (latestOrder.userAddOnBirthdayProps) {
        document.getElementById("birthdayProps").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnWeddingProps) {
        document.getElementById("weddingProps").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnGraduationProps) {
        document.getElementById("gradProps").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnPhotoFilter) {
        document.getElementById("photoFilter").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnVideoMessage) {
        document.getElementById("vidMessage").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnBoomerang) {
        document.getElementById("boomerang").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnPhoneBooth) {
        document.getElementById("phoneBooth").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnPhotoBook) {
        document.getElementById("photoBook").classList.add("added");
        addOnFound = true;
    }
    if (latestOrder.userAddOnBackdrop) {
        if (latestOrder.userAddOnBackdrop.includes("Balloon")) {
            document.getElementById("ballonBack").classList.add("added");
            addOnFound = true;
        }
        if (latestOrder.userAddOnBackdrop.includes("Sparkly")) {
            document.getElementById("sparklyBack").classList.add("added");
            addOnFound = true;
        }
        if (latestOrder.userAddOnBackdrop.includes("Flower")) {
            document.getElementById("flowerBack").classList.add("added");
            addOnFound = true;
        }
    }
    if (latestOrder.userAddOnPrintPhoto) {
        document.getElementById("printedPhoto").classList.add("added");
        addOnFound = true;
    }

    if (!addOnFound) {
        document.getElementById("noAddon").classList.add("added");
    }
});

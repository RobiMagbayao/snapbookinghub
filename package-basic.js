let totalPrice = 3000;
let printtotal = 0;
let backdropPriceAdded = false;
let orderDetails = {};

//VARIABLES FOR ADD-ONS INPUT
const birthdayProps = document.getElementById("birthdayProps");
const weddingProps = document.getElementById("weddingProps");
const graduationProps = document.getElementById("graduationProps");
const photoFilter = document.getElementById("photoFilter");
const videoMessage = document.getElementById("videoMessage");
const boomerang = document.getElementById("boomerang");
const phoneBooth = document.getElementById("phoneBooth");
const photoBook = document.getElementById("photoBook");
const balloonBackdrop = document.getElementById("balloonBackdrop");
const sparklyBackdrop = document.getElementById("sparklyBackdrop");
const flowerBackdrop = document.getElementById("flowerBackdrop");

//VARIABLES FOR TABLEROWS
const birthdayPropsTable = document.getElementById("birthdayPropsTable");
const weddingPropsTable = document.getElementById("weddingPropsTable");
const graduationPropsTable = document.getElementById("graduationPropsTable");
const photoFilterTable = document.getElementById("photoFilterTable");
const videoMessageTable = document.getElementById("videoMessageTable");
const boomerangTable = document.getElementById("boomerangTable");
const phoneBoothTable = document.getElementById("phoneBoothTable");
const photoBookTable = document.getElementById("photoBookTable");
const radioTable = document.getElementById("radioTable");
const printPhotoTable = document.getElementById("printPhotoTable");


birthdayProps.addEventListener("change", function() {
    if (birthdayProps.checked) {
        totalPrice += 500;
        birthdayPropsTable.style.display = "table-row";
        orderDetails.userAddOnBirthdayProps = "Birthday Props, Qty: 1, Price: 500";
    } else {
        totalPrice -= 500;
        birthdayPropsTable.style.display = "none";
        delete orderDetails.userAddOnBirthdayProps;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

weddingProps.addEventListener("change", function() {
    if (weddingProps.checked) {
        totalPrice += 500;
        weddingPropsTable.style.display = "table-row";
        orderDetails.userAddOnWeddingProps = "Wedding Props, Qty: 1, Price: 500";
    } else {
        totalPrice -= 500;
        weddingPropsTable.style.display = "none";
        delete orderDetails.userAddOnWeddingProps;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

graduationProps.addEventListener("change", function() {
    if (graduationProps.checked) {
        totalPrice += 500;
        graduationPropsTable.style.display = "table-row";
        orderDetails.userAddOnGraduationProps = "Graduation Props, Qty: 1, Price: 500";
    } else {
        totalPrice -= 500;
        graduationPropsTable.style.display = "none";
        delete orderDetails.userAddOnGraduationProps;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

photoFilter.addEventListener("change", function() {
    if (photoFilter.checked) {
        totalPrice += 500;
        photoFilterTable.style.display = "table-row";
        orderDetails.userAddOnPhotoFilter = "Photo Filter, Qty: 1, Price: 500";
    } else {
        totalPrice -= 500;
        photoFilterTable.style.display = "none";
        delete orderDetails.userAddOnPhotoFilter;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

videoMessage.addEventListener("change", function() {
    if (videoMessage.checked) {
        totalPrice += 700;
        videoMessageTable.style.display = "table-row";
        orderDetails.userAddOnVideoMessage = "Video Message, Qty: 1, Price: 700";
    } else {
        totalPrice -= 700;
        videoMessageTable.style.display = "none";
        delete orderDetails.userAddOnVideoMessage;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

boomerang.addEventListener("change", function() {
    if (boomerang.checked) {
        totalPrice += 500;
        boomerangTable.style.display = "table-row";
        orderDetails.userAddOnBoomerang = "Boomerang, Qty: 1, Price: 500";
    } else {
        totalPrice -= 500;
        boomerangTable.style.display = "none";
        delete orderDetails.userAddOnBoomerang;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

phoneBooth.addEventListener("change", function() {
    if (phoneBooth.checked) {
        totalPrice += 700;
        phoneBoothTable.style.display = "table-row";
        orderDetails.userAddOnPhoneBooth = "Phone Booth, Qty: 1, Price: 700";
    } else {
        totalPrice -= 700;
        phoneBoothTable.style.display = "none";
        delete orderDetails.userAddOnPhoneBooth;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});

photoBook.addEventListener("change", function() {
    if (photoBook.checked) {
        totalPrice += 700;
        photoBookTable.style.display = "table-row";
        orderDetails.userAddOnPhotoBook = "Photo Book, Qty: 1, Price: 700";
    } else {
        totalPrice -= 700;
        photoBookTable.style.display = "none";
        delete orderDetails.userAddOnPhotoBook;
    }
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
});




//FOR RADIO BUTTONS
const radioButtons = document.querySelectorAll('input[name="backdrop"]');

radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
        if (balloonBackdrop.checked) {
            setBackdropInfo("Balloon Backdrop"); 
            orderDetails.userAddOnBackdrop = "Balloon Backdrop, Qty: 1, Price: 500";
        }
        else if(sparklyBackdrop.checked){
            setBackdropInfo("Sparkly Backdrop"); 
            orderDetails.userAddOnBackdrop = "Sparkly Backdrop, Qty: 1, Price: 500";
        }
        else if(flowerBackdrop.checked){
            setBackdropInfo("Flower Backdrop");
            orderDetails.userAddOnBackdrop = "Flower Backdrop, Qty: 1, Price: 500";
        }
        radioTable.style.display = "table-row"; 
    });
});

function setBackdropInfo(backdropType) {
    document.getElementById("radioItem").innerHTML = backdropType;

    // Check if backdropPrice has not been added before
    if (!backdropPriceAdded) {
        // Add 500 to totalPrice only if it hasn't been added
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;

        // Set the flag to true to indicate that the price has been added
        backdropPriceAdded = true;
    }
}
     

//FOR PRINTED PHOTO
const photoSizeDropdown = document.getElementById("photoSize");
const photoQuantityInput = document.getElementById("photoQuantity");

photoSizeDropdown.addEventListener("change", updateResult);
photoQuantityInput.addEventListener("input", updateResult);

// Function to update the result row
function updateResult() {
    const selectedSize = photoSizeDropdown.value;
    let quantity = parseInt(photoQuantityInput.value) || 0;

    // If quantity is blank or 0, remove the result row
    if (quantity === 0 || quantity === '') {
        clearResult();
        printPhotoTable.style.display = "none";
        document.getElementById("warning").innerHTML = "";
        // Update previousPrinttotal to 0 when quantity is 0
        const previousPrinttotal = printtotal;
        printtotal = 0;
        // Update totalPrice by subtracting the previous printtotal and adding the new printtotal
        totalPrice = totalPrice - previousPrinttotal + printtotal;
        // Update the total price in the HTML
        document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
        //Update local storage
        delete orderDetails.userAddOnPrintPhoto;
        return;
    }

    let pricePerPiece = 0;

    

    if (selectedSize === "2x6" && quantity >= 100 && quantity <= 1000) {
        pricePerPiece = 8;
        printPhotoTable.style.display = "table-row";
        document.getElementById("warning").innerHTML = "";
    } else if (selectedSize === "4x6" && quantity >= 100 && quantity <= 1000) {
        pricePerPiece = 10;
        printPhotoTable.style.display = "table-row";
        document.getElementById('warning').innerHTML = "";
    } else if (selectedSize === "2x6" && quantity < 100) {
        pricePerPiece = 8;
        printPhotoTable.style.display = "table-row";
        quantity = 100;
        document.getElementById('warning').innerHTML = "Minimum quantity is 100 pieces";
    } else if (selectedSize === "2x6" && quantity > 1000) {
        pricePerPiece = 8;
        printPhotoTable.style.display = "table-row";
        quantity = 1000;
        document.getElementById('warning').innerHTML = "Maximum quantity is 1000 pieces";
    } else if (selectedSize === "4x6" && quantity < 100) {
        pricePerPiece = 10;
        printPhotoTable.style.display = "table-row";
        quantity = 100;
        document.getElementById('warning').innerHTML = "Minimum quantity is 100 pieces";
    } else if (selectedSize === "4x6" && quantity > 1000) {
        pricePerPiece = 10;
        printPhotoTable.style.display = "table-row";
        quantity = 1000;
        document.getElementById('warning').innerHTML = "Maximum quantity is 1000 pieces";
    }

   

    const previousPrinttotal = printtotal;
    printtotal = quantity * pricePerPiece;

    // Update totalPrice by subtracting the previous printtotal and adding the new printtotal
    totalPrice = totalPrice - previousPrinttotal + printtotal;

    //update local storage
    if (quantity > 0){
        orderDetails.userAddOnPrintPhoto = `Print Photo size ${selectedSize} inches, Qty: ${quantity}, Price: ${printtotal}`;
    }
    
    // Update result row
    document.getElementById("printItem").textContent = `Print Photo size ${selectedSize} inches`;
    document.getElementById("printQuantity").textContent = quantity;
    document.getElementById("printPrice").textContent = `₱${printtotal}`;

    // Update the total price in the HTML
    document.getElementById("totalPrice").innerHTML = `₱${totalPrice}`;
    
}

// Function to clear the result row
function clearResult() {
    document.getElementById("printItem").textContent = "";
    document.getElementById("printQuantity").textContent = "";
    document.getElementById("printPrice").textContent = "";
}

// Function for order details
// Function to format time in 12-hour format
function format12HourTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
    const period = hours < 12 ? "AM" : "PM";
    return `${formattedHours}:${minutes} ${period}`;
}

// Function to check if a date is in the past
function isPastDate(date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight
    return date <= currentDate;
}

// Function to check if a time is in the past
function isPastTime(time) {
    const currentTime = new Date();
    const [hours, minutes] = time.split(":");
    currentTime.setHours(hours, minutes, 0, 0);
    return currentTime < new Date();
}

// Function to get event details
function getEventDetails() {
    // Get values from the form
    var dateInput = document.getElementById("date");
    var timeInput = document.getElementById("time");
    var provinceValue = document.getElementById("province").value;
    var municipalityValue = document.getElementById("municipality").value;
    var eventAddressValue = document.getElementById("eventAddress").value;

    // Check if the selected date and time are in the past
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight

    if (selectedDate <= currentDate) {
        // If the selected date is in the past, automatically select the next day
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 2);
        dateInput.value = nextDay.toISOString().split("T")[0];
    }

    // Check if the selected date is less than 1 day from now
    const oneDayFromNow = new Date(currentDate);
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

    if (selectedDate < oneDayFromNow) {
        // If the selected date is less than 1 day from now, show an alert
        alert("Please select a date at least 1 day from now.");
        return;
    }

    // Format date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(selectedDate);

    // Format time using the custom function
    const formattedTime = format12HourTime(timeInput.value);

    document.getElementById("dateSummary").innerHTML = `<strong>Event Date: </strong> ${formattedDate}`;
    document.getElementById("timeSummary").innerHTML = `<strong>Event Time: </strong> ${formattedTime}`;
    document.getElementById("addressSummary").innerHTML = `<strong>Event Location: </strong> ${eventAddressValue}, ${municipalityValue}, ${provinceValue}`;
}

// Add event listeners for input fields
document.getElementById("date").addEventListener("input", getEventDetails);
document.getElementById("time").addEventListener("input", getEventDetails);
document.getElementById("province").addEventListener("change", getEventDetails);
document.getElementById("municipality").addEventListener("change", getEventDetails);
document.getElementById("eventAddress").addEventListener("input", getEventDetails);



//SAVING DATA TO LOCAL STORAGE

// 1 KEY, MULTIPLE OBJECTS

// Retrieve bookingNumber from local storage or initialize it to 1
let bookingNumber = parseInt(localStorage.getItem("bookingNumber")) || 1;



// Function to save order details to local storage
function saveOrderDetails() {

    // Get values from the form
    const dateValue = document.getElementById("date").value;
    const timeValue = document.getElementById("time").value;
    const provinceValue = document.getElementById("province").value;
    const municipalityValue = document.getElementById("municipality").value;
    const eventAddressValue = document.getElementById("eventAddress").value;

    // Check if required details are empty
    if (!dateValue || !timeValue || !municipalityValue || !eventAddressValue) {
        alert("Please input all required details (Date, Time, Municipality, and Event Address) before saving the order.");
        return;
    }

    orderDetails.bookingNumber = bookingNumber;
    orderDetails.date = document.getElementById("date").value;
    orderDetails.time = document.getElementById("time").value;
    orderDetails.province = document.getElementById("province").value;
    orderDetails.municipality = document.getElementById("municipality").value;
    orderDetails.eventAddress = document.getElementById("eventAddress").value;
    orderDetails.package = "Basic Package";
    orderDetails.totalPrice = totalPrice;

    const existingOrderData = JSON.parse(localStorage.getItem('orderDetails')) || [];

     // Add the new form data
     existingOrderData.push(orderDetails);

     // Store updated form data in localStorage
     localStorage.setItem('orderDetails', JSON.stringify(existingOrderData));

    // Increment bookingNumber for the next order
    bookingNumber += 1;

    // Update bookingNumber in local storage
    localStorage.setItem("bookingNumber", bookingNumber.toString());
}

// Add event listener to the button that triggers the saveOrderDetails function
document.getElementById("saveOrderButton").addEventListener("click", saveOrderDetails);


// CLEAR LOCAL STORAGE
document.getElementById("clearLocalStorageButton").addEventListener("click", clearLocalStorage);

function clearLocalStorage() {
    localStorage.clear();
    
    // Reset bookingNumber to 0
    bookingNumber = 0;
    localStorage.setItem("bookingNumber", bookingNumber.toString());

    console.log("Local Storage cleared.");
}



// MULTIPLE KEYS

// Retrieve keyNumber from local storage or initialize it to 1
let keyNumber = parseInt(localStorage.getItem("keyNumber")) || 1;

// Function to save order details to local storage

function bookingDetails() {

    // Get values from the form
    const dateValue = document.getElementById("date").value;
    const timeValue = document.getElementById("time").value;
    const municipalityValue = document.getElementById("municipality").value;
    const eventAddressValue = document.getElementById("eventAddress").value;

    // Check if required details are empty
    if (!dateValue || !timeValue || !municipalityValue || !eventAddressValue) {
        alert("Please input all required details (Date, Time, Municipality, and Event Address) before saving the order.");
        return;
    }

    orderDetails.keyNumber = keyNumber;
    orderDetails.date = document.getElementById("date").value;
    orderDetails.time = document.getElementById("time").value;
    orderDetails.province = document.getElementById("province").value;
    orderDetails.municipality = document.getElementById("municipality").value;
    orderDetails.eventAddress = document.getElementById("eventAddress").value;
    orderDetails.package = "Basic Package";
    orderDetails.totalPrice = totalPrice;

    const existingOrderData = JSON.parse(localStorage.getItem('orderDetails')) || [];

     // Add the new form data
     existingOrderData.push(orderDetails);

     // Store updated form data in localStorage
     localStorage.setItem(`eventDetails${keyNumber}`, JSON.stringify(orderDetails));

    // Increment bookingNumber for the next order
    keyNumber += 1;

    // Update bookingNumber in local storage
    localStorage.setItem("keyNumber", keyNumber.toString());
}
// Add event listener to the button that triggers the bookingDetails function
document.getElementById("orderDetailsButton").addEventListener("click", bookingDetails);

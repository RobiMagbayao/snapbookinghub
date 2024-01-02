// Get the current user from sessionStorage
var key = sessionStorage.getItem("currentUser");

// Get the user data from localStorage
var userData = JSON.parse(localStorage.getItem(key));

// Get the latest order details
var latestOrder = userData.orderDetails[userData.orderDetails.length - 1];

// Order Summary Page
window.onload = function () {
    // Format the date
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

    // Assign the formatted time back to latestOrder.time
    latestOrder.time = strTime;

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

    // Check if there are any add-ons if none, display "No Add-Ons"
    let addOns = "";
    if (latestOrder.userAddOnBirthdayProps) {
        addOns += "Birthday Props" + ", ";
    }
    if (latestOrder.userAddOnWeddingProps) {
        addOns += "Wedding Props" + ", ";
    }
    if (latestOrder.userAddOnGraduationProps) {
        addOns += "Graduation Props" + ", ";
    }
    if (latestOrder.userAddOnPhotoFilter) {
        addOns += "Photo Filter" + ", ";
    }
    if (latestOrder.userAddOnVideoMessage) {
        addOns += "Video Message" + ", ";
    }
    if (latestOrder.userAddOnBoomerang) {
        addOns += "Boomerang" + ", ";
    }
    if (latestOrder.userAddOnPhoneBooth) {
        addOns += "Phone Booth" + ", ";
    }
    if (latestOrder.userAddOnPhotoBook) {
        addOns += "Photo Book" + ", ";
    }
    if (latestOrder.userAddOnBackdrop) {
        addOns += "Backdrop" + ", ";
    }
    if (latestOrder.userAddOnPrintPhoto) {
        addOns += "Print Photo" + ", ";
    }
    if (addOns === "") {
        addOns = "No Add-Ons";
    } else {
        // Remove the last comma and space
        addOns = addOns.slice(0, -2);
    }

    // Display the order details in the HTML
    document.getElementById("bookingNum").innerHTML = bookingNumber;
    document.getElementById("packageName").innerHTML = latestOrder.package;
    document.getElementById("addOns").innerHTML = addOns;
    document.getElementById("dateTime").innerHTML = latestOrder.date + " at " + latestOrder.time;
    document.getElementById("location").innerHTML = latestOrder.eventAddress + ", " + latestOrder.municipality + ", " + latestOrder.province;
    document.getElementById("totalPrice").innerHTML = "₱ " + latestOrder.totalPrice;
};

let total = latestOrder.totalPrice;

// ---------------------------------------- //
// Google Pay API
// Google Pay API configuration
const cardPaymentMethod = {
    type: "CARD",
    tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
            gateway: "example",
            gatewayMerchantId: "gatewayMerchantId",
        },
    },
    parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
    },
};
const googlePayConfigurations = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod],
};

let googlePayClient;

function onGooglePayLoaded() {
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: "TEST",
    });

    googlePayClient
        .isReadyToPay(googlePayConfigurations)
        .then(function (response) {
            if (response.result) {
                createAndAddButton();
            } else {
                alert("Unable to pay using Google Pay");
            }
        })
        .catch(function (err) {
            console.error("Error determining readiness to use Google Pay: ", err);
        });
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked,
        buttonColor: "default",
        buttonType: "book",
    });
    document.getElementById("googlePayButtonContainer").appendChild(googlePayButton);
}

function onGooglePayButtonClicked() {
    const paymentDataRequest = { ...googlePayConfigurations };
    paymentDataRequest.merchantInfo = {
        merchantId: "BCR2DN4TZKBZFLDY",
        merchantName: "SnapBookingHub",
    };
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: "FINAL",
        totalPrice: `${total}`,
        currencyCode: "PHP",
    };

    googlePayClient
        .loadPaymentData(paymentDataRequest)
        .then((paymentData) => processPaymentData(paymentData))
        .catch((err) => console.error("Error loading payment data: ", err));
}

function processPaymentData(paymentData) {
    fetch(orderEndpointURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: paymentData,
    });
}

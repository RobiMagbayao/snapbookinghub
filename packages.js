let totalPrice = 3000;
let printtotal = 0;
let backdropPriceAdded = false;

// Map to store added rows
const addedRows = new Map();

// Function to add new row
function addRow(item, quantity, price, checkboxId) {
    const newEntry = document.createElement("tr");

    newEntry.innerHTML = `<td class="py-2">${item}</td>
                         <td class="py-2">${quantity}</td>
                         <td class="py-2">${price}</td>`;

    // Append the entry to the table body
    document.getElementById("orderSummaryTable").appendChild(newEntry);

    // Store the added row in the map
    addedRows.set(checkboxId, newEntry);
}

// Function to remove row
function removeRow(checkboxId) {
    // Retrieve the row from the map
    const rowToRemove = addedRows.get(checkboxId);

    // Remove the row from the table
    if (rowToRemove) {
        rowToRemove.remove();
        // Remove the entry from the map
        addedRows.delete(checkboxId);
    }
}


// Add event listener to checkboxes
const birthdayProps = document.getElementById("birthdayProps");
const weddingProps = document.getElementById("weddingProps");
const graduationProps = document.getElementById("graduationProps");
const balloonBackdrop = document.getElementById("balloonBackdrop");
const sparklyBackdrop = document.getElementById("sparklyBackdrop");
const flowerBackdrop = document.getElementById("flowerBackdrop");
const photoFilter = document.getElementById("photoFilter");
const videoMessage = document.getElementById("videoMessage");
const boomerang = document.getElementById("boomerang");
const phoneBooth = document.getElementById("phoneBooth");
const photoBook = document.getElementById("photoBook");

birthdayProps.addEventListener("change", function() {
    if (birthdayProps.checked) {
        addRow('Birthday Props', 1, 500, "birthdayProps");
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("birthdayProps");
        totalPrice -= 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

weddingProps.addEventListener("change", function() {
    if (weddingProps.checked) {
        addRow('Wedding Props', 1, 500, "weddingProps");
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("weddingProps");
        totalPrice -= 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

graduationProps.addEventListener("change", function() {
    if (graduationProps.checked) {
        addRow('Graduation Props', 1, 500, "graduationProps");
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("graduationProps");
        totalPrice -= 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});


photoFilter.addEventListener("change", function() {
    if (photoFilter.checked) {
        addRow('Photo Filters', 1, 500, "photoFilter");
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("photoFilter");
        totalPrice -= 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

videoMessage.addEventListener("change", function() {
    if (videoMessage.checked) {
        addRow('Video Message', 1, 700, "videoMessage");
        totalPrice += 700;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("videoMessage");
        totalPrice -= 700;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

boomerang.addEventListener("change", function() {
    if (boomerang.checked) {
        addRow('Boomerang', 1, 500, "boomerang");
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("boomerang");
        totalPrice -= 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

phoneBooth.addEventListener("change", function() {
    if (phoneBooth.checked) {
        addRow('Phone Booth', 1, 700, "phoneBooth");
        totalPrice += 700;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("phoneBooth");
        totalPrice -= 700;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

photoBook.addEventListener("change", function() {
    if (photoBook.checked) {
        addRow('Photobook', 1, 700, "photoBook");
        totalPrice += 700;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    } else {
        removeRow("photoBook");
        totalPrice -= 700;
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
});

balloonBackdrop.addEventListener("change", function () {
    if (balloonBackdrop.checked) {
        setBackdropInfo("Balloon Backdrop");
    }
});

sparklyBackdrop.addEventListener("change", function () {
    if (sparklyBackdrop.checked) {
        setBackdropInfo("Sparkly Backdrop");
    }
});

flowerBackdrop.addEventListener("change", function () {
    if (flowerBackdrop.checked) {
        setBackdropInfo("Flower Backdrop");
    }
});

const radioButtons = document.querySelectorAll('input[name="backdrop"]');
const radioTable = document.getElementById("radioTable");

radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
        if (radioButton.checked) {
            setBackdropInfo("Balloon Backdrop"); // Update with the appropriate backdropType
            radioTable.style.display = "table-row"; // Show the table when a radio button is checked
        }
    });
});

function setBackdropInfo(backdropType) {
    document.getElementById("radioItem").innerHTML = backdropType;
    document.getElementById("radioQuantity").innerHTML = "1";
    document.getElementById("radioPrice").innerHTML = "500";

    // Check if backdropPrice has not been added before
    if (!backdropPriceAdded) {
        // Add 500 to totalPrice only if it hasn't been added
        totalPrice += 500;
        document.getElementById("totalPrice").innerHTML = totalPrice;

        // Set the flag to true to indicate that the price has been added
        backdropPriceAdded = true;
    }
}
     

//for Printed Photo 
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
        document.getElementById('warning').innerHTML = "";
        // Update previousPrinttotal to 0 when quantity is 0
        const previousPrinttotal = printtotal;
        printtotal = 0;
        // Update totalPrice by subtracting the previous printtotal and adding the new printtotal
        totalPrice = totalPrice - previousPrinttotal + printtotal;
        // Update the total price in the HTML
        document.getElementById("totalPrice").innerHTML = totalPrice;
        return;
    }

    

    let pricePerPiece = 0;

    if (selectedSize === "2x6" && quantity >= 100 && quantity <= 1000) {
        pricePerPiece = 8;
        document.getElementById('warning').innerHTML = "";
    } else if (selectedSize === "4x6" && quantity >= 100 && quantity <= 1000) {
        pricePerPiece = 10;
        document.getElementById('warning').innerHTML = "";
    } else if (selectedSize === "2x6" && quantity < 100) {
        pricePerPiece = 8;
        //clearResult();
        quantity = 100;
        document.getElementById('warning').innerHTML = "Minimum quantity is 100 pieces";
    } else if (selectedSize === "2x6" && quantity > 1000) {
        pricePerPiece = 8;
        quantity = 1000;
        document.getElementById('warning').innerHTML = "Maximum quantity is 1000 pieces";
    } else if (selectedSize === "4x6" && quantity < 100) {
        pricePerPiece = 10;
        //clearResult();
        quantity = 100;
        document.getElementById('warning').innerHTML = "Minimum quantity is 100 pieces";
    } else if (selectedSize === "4x6" && quantity > 1000) {
        pricePerPiece = 10;
        quantity = 1000;
        document.getElementById('warning').innerHTML = "Maximum quantity is 1000 pieces";
    }

    


    const previousPrinttotal = printtotal;
    printtotal = quantity * pricePerPiece;

    // Update totalPrice by subtracting the previous printtotal and adding the new printtotal
    totalPrice = totalPrice - previousPrinttotal + printtotal;
    
    // Update result row
    document.getElementById("printItem").textContent = `Print Photo size ${selectedSize} inches`;
    document.getElementById("printQuantity").textContent = quantity;
    document.getElementById("printPrice").textContent = `${printtotal}`;

    // Update the total price in the HTML
    document.getElementById("totalPrice").innerHTML = totalPrice;
    
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

// Function for order details
function getEventDetails() {
    // Get values from the form
    var dateValue = document.getElementById("date").value;
    var timeValue = document.getElementById("time").value;
    var provinceValue = document.getElementById("province").value;
    var municipalityValue = document.getElementById("municipality").value;
    var eventAddressValue = document.getElementById("eventAddress").value;

    // Format date using Intl.DateTimeFormat
    const dateObject = new Date(dateValue);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(dateObject);

    // Format time using the custom function
    const formattedTime = format12HourTime(timeValue);

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


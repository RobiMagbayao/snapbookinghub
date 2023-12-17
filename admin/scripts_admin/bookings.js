var ascending = true;

function sortBookingNum() {
    var table = document.querySelector("#booking-table");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (rowA, rowB) {
        var idA = Number(rowA.querySelector(".booking-id").textContent);
        var idB = Number(rowB.querySelector(".booking-id").textContent);
        return ascending ? idA - idB : idB - idA;
    });

    // Rearrange the rows in the tbody
    rows.forEach(function (row) {
        tbody.appendChild(row);
    });

    // Toggle the sorting order for the next call
    ascending = !ascending;
}

// Attach the sorting function to the sort button
document.querySelector("#sort-bookingNum").addEventListener("click", sortBookingNum);

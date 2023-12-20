window.onload = function () {
    fetch("./navbar07301987.html")
        .then((response) => response.text())
        .then((data) => {
            var navbarDiv = document.getElementById("navbarSBH");
            navbarDiv.innerHTML = data;

            // Execute any scripts in the navbar HTML
            Array.from(navbarDiv.getElementsByTagName("script")).forEach(function (oldScript) {
                var newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach(function (attr) {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Initialize any Bootstrap modals in the navbar
            var modals = document.querySelectorAll(".modal");
            for (var i = 0; i < modals.length; i++) {
                new bootstrap.Modal(modals[i]);
            }
        });
};

includeHTML();

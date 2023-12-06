//Loader
let preLoader = document.getElementById("loader");

setTimeout(preLoaderHandler, 2500);

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

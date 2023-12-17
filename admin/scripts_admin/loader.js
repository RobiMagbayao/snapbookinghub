//Loader
const preLoader = document.getElementById("loader");

setTimeout(preLoaderHandler, 1000);

function preLoaderHandler() {
    preLoader.style.opacity = "0";
    preLoader.style.zIndex = "-100";
    preLoader.style.transition = "all .7s";
}

//Loader
let preLoader = document.getElementById("loader");

setTimeout(preLoaderHandler, 100);

function preLoaderHandler() {
    preLoader.style.opacity = "0";
    preLoader.style.zIndex = "-100";
    preLoader.style.transition = "all .7s";
}

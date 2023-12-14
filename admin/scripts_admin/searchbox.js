const searchBox = document.getElementById("searchBox");
const submitButton = document.getElementById("submitButton");
const iframeElement = document.getElementById("userframe");
const form = document.getElementById("searchForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = searchBox.value;
    findTextInIframeContent(text, iframeElement);
});

function findTextInIframeContent(text, iframeElement) {
    const iframeDocument = iframeElement.contentWindow.document;

    clearHighlights(iframeDocument);

    // Find all text within specific elements
    const contentElements = iframeDocument.querySelectorAll("p, span, a, li, table, td");
    for (const element of contentElements) {
        const foundText = element.querySelectorAll("*");
        for (const ftext of foundText) {
            // Check if node contains the search text
            if (ftext.textContent.includes(text)) {
                // Highlight the same text
                highlightNode(ftext, text);
            }
        }
    }
}

function clearHighlights(document) {
    const highlights = document.querySelectorAll(".highlighter");
    for (const highlight of highlights) {
        highlight.classList.remove("highlighter");
    }
}

function highlightNode(node, text) {
    node.innerHTML = node.innerHTML.replace(new RegExp(text, "gi"), `<span class="highlighter">$&</span>`);
}

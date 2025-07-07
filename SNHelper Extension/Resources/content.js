browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

function replaceTbodyWithThead() {
    const tbodies = document.querySelectorAll('tbody');
    tbodies.forEach(tbody => {
        const thead = document.createElement('thead');

        // Copy attributes
        for (const attr of tbody.attributes) {
            thead.setAttribute(attr.name, attr.value);
        }

        // Move child nodes
        while (tbody.firstChild) {
            thead.appendChild(tbody.firstChild);
        }

        // Replace tbody with thead
        tbody.parentNode.replaceChild(thead, tbody);
    });
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
    if (request.action === "executeReplaceTbodyWithThead") {
        replaceTbodyWithThead();
        // Optionally, send a response back
        // sendResponse({ status: "completed" });
    }
    // Keep the listener alive for asynchronous sendResponse if needed in the future
    // return true;
});

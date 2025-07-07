browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
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

// Run the script after the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceTbodyWithThead);
} else {
    // DOMContentLoaded has already fired
    replaceTbodyWithThead();
}

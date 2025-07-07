// Listener for when the browser action button (toolbar icon) is clicked
browser.action.onClicked.addListener((tab) => {
    // Query for the active tab in the current window
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        // Ensure we have at least one tab (should be the active one)
        if (tabs[0] && tabs[0].id) {
            const activeTabId = tabs[0].id;
            // Send a message to the content script in the active tab
            browser.tabs.sendMessage(activeTabId, { action: "executeReplaceTbodyWithThead" })
                .then(response => {
                    console.log("Message sent to content script and received response:", response);
                })
                .catch(error => {
                    console.error("Error sending message to content script:", error, "Tab ID:", activeTabId);
                    // This error might occur if the content script isn't loaded in the tab,
                    // or the tab is a privileged page (e.g., about:addons, about:debugging).
                });
        } else {
            console.error("Could not find active tab or tab ID.");
        }
    }).catch(error => {
        console.error("Error querying for active tab:", error);
    });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        return Promise.resolve({ farewell: "goodbye" });
});

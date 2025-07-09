document.addEventListener('DOMContentLoaded', function() {
    const replaceButton = document.getElementById('replace-button');
    if (replaceButton) {
        replaceButton.addEventListener('click', function() {
            browser.tabs.query({active: true, currentWindow: true})
                .then((tabs) => {
                    browser.tabs.sendMessage(tabs[0].id, {
                        action: "replaceTbodyWithThead"
                    }).then(response => {
                        console.log("Message sent to content script");
                        if (response.result === "success") {
                            console.log("tbody replaced successfully.");
                        } else {
                            console.log("Something went wrong.");
                        }
                    }).catch(error => {
                        console.error("Error sending message:", error);
                    });
                })
                .catch(error => {
                    console.error("Error finding active tab:", error);
                });
        });
    } else {
        console.error("Could not find the replace-button element.");
    }
});

// content.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'logHistory') {
        logCurrentPageHistory();
    }
});

function logCurrentPageHistory() {
    // Get current page URL and title
    let url = window.location.href;
    let title = document.title;

    chrome.runtime.sendMessage({
        action: 'saveHistory',
        url: url,
        title: title
    });
}

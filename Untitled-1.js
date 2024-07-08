// background.js

// Listen for changes in browser history
chrome.history.onVisited.addListener(function(result) {
    console.log('Visited URL: ' + result.url);
    
    // Example function to save history to local storage
    saveHistoryToLocalStorage(result.url, result.title);
});

// Function to save history entry to local storage
function saveHistoryToLocalStorage(url, title) {
    let historyEntry = {
        url: url,
        title: title,
        timestamp: new Date().getTime()  // Optionally, store timestamp
    };

    // Retrieve existing history entries from storage
    chrome.storage.local.get({history: []}, function(result) {
        let history = result.history;
        history.push(historyEntry);

        // Save updated history to storage
        chrome.storage.local.set({history: history}, function() {
            console.log('History entry saved: ' + JSON.stringify(historyEntry));
        });
    });
}

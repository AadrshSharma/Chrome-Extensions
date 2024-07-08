// Listen for changes in browser history
chrome.history.onVisited.addListener(function(result) {
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
    chrome.storage.local.get({history: []}, function(data) {
        let history = data.history || [];

        // Ensure history is an array
        if (!Array.isArray(history)) {
            console.error('History data retrieved is not an array:', history);
            history = []; // Reset history to empty array
        }

        history.push(historyEntry);

        // Save updated history to storage
        chrome.storage.local.set({history: history}, function() {
            if (chrome.runtime.lastError) {
                console.error('Failed to save history entry:', chrome.runtime.lastError);
            } else {
                console.debug('History entry saved:', historyEntry);
            }
        });
    });
}

// Function to fetch and log all history entries to console
function logAllHistoryToConsole() {
    chrome.storage.local.get('history', function(data) {
        let history = data.history || [];

        console.log('All history entries:');
        history.forEach(function(entry) {
            console.log(entry.url + ' - ' + entry.title);
        });
    });
}

// Initial log of all history entries when extension loads
logAllHistoryToConsole();

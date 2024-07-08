// Background script (service worker) - background.js

chrome.runtime.onInstalled.addListener(function() {
    // Example: Periodically fetch history
    chrome.history.search({text: ''}, function(historyItems) {
        historyItems.forEach(function(result) {
            saveHistoryToStorage(result.url, result.title);
        });
    });
});

// Function to save history entry to local storage
function saveHistoryToStorage(url, title) {
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
                console.error('Failed to save history entry:', chrome.runtime.lastError.message);
            } else {
                console.debug('History entry saved:', historyEntry);
            }
        });
    });
}

// Function to fetch and log all history entries to console (for testing)
function logAllHistoryToConsole() {
    chrome.storage.local.get('history', function(data) {
        let history = data.history || [];

        console.groupCollapsed('All history entries:');
        history.forEach(function(entry) {
            console.log(entry.url + ' - ' + entry.title);
        });
        console.groupEnd();
    });
}

logAllHistoryToConsole();

function saveHistoryToFirebase(url, title) {
    let historyEntry = {
        url: url,
        title: title,
        timestamp: new Date().getTime()
    };

    // Get a reference to the Firebase database
    let dbRef = firebase.database().ref('history');

    // Push the new history entry to Firebase
    dbRef.push(historyEntry)
        .then(() => {
            console.debug('History entry saved:', historyEntry);
        })
        .catch(error => {
            console.error('Failed to save history entry:', error.message);
        });
}

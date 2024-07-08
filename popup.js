document.addEventListener('DOMContentLoaded', function() {
    var storeButton = document.getElementById('storeButton');
    var retrieveButton = document.getElementById('retrieveButton');
    var resultDiv = document.getElementById('result');
  
    storeButton.addEventListener('click', function() {
      // Store current page URL
      var currentPageUrl = window.location.href;
      chrome.storage.local.set({ 'history': currentPageUrl }, function() {
        console.log('History stored successfully:', currentPageUrl);
        resultDiv.textContent = 'Stored History: ' + currentPageUrl;
      });
    });
  
    retrieveButton.addEventListener('click', function() {
      // Retrieve stored history
      chrome.storage.local.get('history', function(data) {
        var storedHistory = data.history;
        if (storedHistory) {
          console.log('Retrieved History:', storedHistory);
          resultDiv.textContent = 'Retrieved History: ' + storedHistory;
        } else {
          console.log('No history found in local storage.');
          resultDiv.textContent = 'No history found in local storage.';
        }
      });
    });
  });
  
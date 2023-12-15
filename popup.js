document.getElementById("openProfileBtn").addEventListener("click", function () {
  // Load the LinkedIn profile URLs from the JSON file
  fetch('linkedin_urls.json')
    .then(response => response.json())
    .then(data => {
      const linkedinUrls = data.linkedinUrls;

      // Validate each LinkedIn profile URL using a simple regex
      const validUrls = linkedinUrls.filter(profileUrl => {
        const urlRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
        return urlRegex.test(profileUrl);
      });

      // Check if any URLs are invalid
      if (validUrls.length !== linkedinUrls.length) {
        console.error("Some LinkedIn profile URLs are invalid");
        displayErrorMessage("Some LinkedIn profile URLs are invalid");
        return;
      }

      // Open each valid LinkedIn profile URL one by one in the current tab
      openNextTab(validUrls, 0);
    })
    .catch(error => {
      console.error('Error loading LinkedIn profile URLs:', error);
      displayErrorMessage('Error loading LinkedIn profile URLs');
    });
});

function openNextTab(urls, index) {
  // Open the next URL in the current tab
  if (index < urls.length) {
    chrome.tabs.update({ url: urls[index] }, function (tab) {
      // Wait for the tab to load before opening the next one
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener); // Remove the listener
          openNextTab(urls, index + 1); // Open the next URL
        }
      });
    });
  }
}

function displayErrorMessage(message) {
  // Display an error message in the popup
  const errorMessageContainer = document.getElementById("errorMessage");
  errorMessageContainer.textContent = message;

  // Clear the error message after a short delay
  setTimeout(() => {
    errorMessageContainer.textContent = '';
  }, 3000); // 3000 milliseconds (3 seconds)
}

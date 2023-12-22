document.getElementById("openProfileBtn").addEventListener("click", function () {
  // Load the LinkedIn profile URLs from the JSON file
  fetch('linkedin_urls.json')
    .then(response => response.json())
    .then(data => {
      const linkedinUrls = data.linkedinUrls;

      // Validate each LinkedIn profile URL using a simple regex
      const validUrls = linkedinUrls.filter(profileUrl => {
        const urlRegex = /^https:\/\/www\.linkedin\.com\//;
        return urlRegex.test(profileUrl);
      });

      // Check if any URLs are invalid
      if (validUrls.length !== linkedinUrls.length) {
        console.error("Some LinkedIn profile URLs are invalid");
        displayErrorMessage("Some LinkedIn profile URLs are invalid");
        return;
      }

      // Open all valid LinkedIn profile URLs in the current tab with a delay
      openAllTabs(validUrls, 0);
    })
    .catch(error => {
      console.error('Error loading LinkedIn profile URLs:', error);
      displayErrorMessage('Error loading LinkedIn profile URLs');
    });
});

function openAllTabs(urls, index) {
  // Open the next URL in the current tab
  if (index < urls.length) {
    chrome.tabs.update({ url: urls[index], active: false }, function (tab) {
      // Wait for the tab to load before opening the next one
      setTimeout(function () {
        openAllTabs(urls, index + 1); // Open the next URL with a delay
      }, 3000); // 3000 milliseconds (3 seconds)
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

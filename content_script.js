// content_script.js
// This script is injected into the LinkedIn search results page to capture and store links

// Capture all links on the page
const allLinks = Array.from(document.links).map(link => link.href);

// Store the array in local storage
localStorage.setItem("allLinks", JSON.stringify(allLinks));

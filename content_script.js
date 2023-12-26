// Function to capture LinkedIn profiles
function captureLinkedInProfiles() {
    const profiles = Array.from(document.querySelectorAll('.flex.flex-column'));
    const linkedinProfiles = profiles.map(profile => {
        const name = profile.querySelector('.artdeco-entity-lockup__title a span')?.textContent.trim();
        const photoUrl = profile.querySelector('.artdeco-entity-lockup__image img')?.src;
        const organizationName = profile.querySelector('.artdeco-entity-lockup__badge + .artdeco-entity-lockup__subtitle')?.textContent.trim();
        const title = profile.querySelector('.artdeco-entity-lockup__highlight-keyword')?.textContent.trim();
        const location = profile.querySelector('.artdeco-entity-lockup__caption')?.textContent.trim();

        return {
            name,
            photoUrl,
            organizationName,
            title,
            location,
        };
    });

    // Retrieve existing profiles from localStorage
    const existingProfiles = JSON.parse(localStorage.getItem('linkedinProfiles')) || [];

    // Combine existing and new profiles, and store in localStorage
    const allProfiles = existingProfiles.concat(linkedinProfiles);
    localStorage.setItem('linkedinProfiles', JSON.stringify(allProfiles));

    // Display the extracted data in the console
    console.log("LinkedIn profiles captured:", allProfiles);
}

// Function to scroll to the bottom of the page
function scrollToBottom() {
    window.scrollBy(0, window.innerHeight);
}

// Function to check for new profiles and capture them
function checkAndCaptureProfiles() {
    const newProfiles = document.querySelectorAll('.flex.flex-column');
    const existingProfileCount = JSON.parse(localStorage.getItem('linkedinProfiles'))?.length || 0;

    if (newProfiles.length > existingProfileCount) {
        // Capture the new profiles
        captureLinkedInProfiles();

        // Scroll to load more profiles
        scrollToBottom();
    } else {
        // Stop the interval if no new profiles are found
        clearInterval(intervalId);
    }
}

// Initial capture when the page is loaded
captureLinkedInProfiles();

// Scroll to load more profiles
scrollToBottom();

// Check for new profiles every second
const scrollIncrement = 500; // Adjust the scroll increment as needed
const intervalId = setInterval(checkAndCaptureProfiles, 1000);

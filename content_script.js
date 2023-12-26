document.addEventListener('DOMContentLoaded', function () {

    const profiles = Array.from(document.querySelectorAll('.flex.flex-column'));
    const linkedinPeople = profiles.map(profile => {
        const profileLink = profile.querySelector('.artdeco-entity-lockup__title a')?.getAttribute('href');
        const name = profile.querySelector('.artdeco-entity-lockup__title span')?.textContent.trim();
        const photoUrl = profile.querySelector('.artdeco-entity-lockup__image img')?.getAttribute('src');
        const orgLinkElement = profile.querySelector('.artdeco-entity-lockup__subtitle a');
        const organizationName = orgLinkElement?.textContent.trim();
        const organizationLinkedInUid = orgLinkElement?.getAttribute('href')?.match(/\/company\/(\d+)/)?.[1];
        const title = profile.querySelector('.artdeco-entity-lockup__highlight-keyword')?.textContent.trim();
        const locationElement = profile.querySelector('.artdeco-entity-lockup__caption');
        const presentRawAddress = locationElement?.textContent.trim();

        return {
            href: `https://www.linkedin.com${profileLink}`,
            name,
            photo_url: photoUrl,
            organization_name: organizationName,
            organization_linkedin_uid: organizationLinkedInUid,
            title,
            present_raw_address: presentRawAddress,
        };
    });

    // Display the extracted data in the console
    console.log("LinkedIn people captured:", linkedinPeople);

    // Store in localStorage
    localStorage.setItem('linkedinPeople', JSON.stringify(linkedinPeople));
});

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('startButton');  // Get "Get Started" button
    const landingPage = document.querySelector('.landing-page');  // Get the landing page element
    const searchPage = document.querySelector('.search-page');    // Get the search page element

    // Log to confirm the script is running
    console.log('Script loaded and running.');

    // Check if all elements are found
    if (startButton) {
        console.log('Start button found.');
    } else {
        console.error('Start button NOT found.');
    }

    if (landingPage) {
        console.log('Landing page found.');
    } else {
        console.error('Landing page NOT found.');
    }

    if (searchPage) {
        console.log('Search page found.');
    } else {
        console.error('Search page NOT found.');
    }

    // Add event listener to the "Get Started" button
    startButton.addEventListener('click', function () {
        console.log('Get Started button clicked.');

        // Check if landing and search page elements exist before trying to manipulate them
        if (landingPage && searchPage) {
            // Hide the landing page and show the search page
            landingPage.classList.add('d-none');
            console.log('Landing page hidden.');

            searchPage.classList.add('active');
            console.log('Search page shown.');
        } else {
            console.error('Could not transition: Landing page or search page element not found.');
        }
    });
});

    // Park search form functionality
    const form = document.getElementById("parkSearchForm");
    const input = document.getElementById("parkName");
    const tableBody = document.getElementById("parkData");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const resultsMessage = document.getElementById("resultsMessage");
    const loader = document.getElementById("loader");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchTerm = input.value.trim();

        if (searchTerm === "") {
            alert("Please enter a park name.");
            return;
        }

        // Show loader
        loader.classList.remove('d-none');
        tableBody.innerHTML = "";
        noResultsMessage.style.display = "none";
        resultsMessage.style.display = "none";

        const encodedURL = encodeURI(
            'https://data.winnipeg.ca/resource/tx3d-pfxq.json?' +
            `$where=lower(location_description) LIKE lower('%${searchTerm}%')` +
            '&$order=location_description DESC' +
            '&$limit=100'
        );

        fetch(encodedURL)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch data.");
                }
            })
            .then(function (data) {
                loader.classList.add('d-none');

                if (data.length === 0) {
                    noResultsMessage.style.display = "block";
                } else {
                    resultsMessage.style.display = "block";
                    resultsMessage.textContent = "Here’s a list of the requested parks in Winnipeg:";

                    data.forEach(function (item) {
                        let location_description = item.location_description;
                        let row = tableBody.insertRow();
                        let cell = row.insertCell(0);
                        cell.textContent = location_description;
                    });
                }
            })
            .catch(function (error) {
                loader.classList.add('d-none');
                console.error('Fetch error:', error);
                resultsMessage.textContent = "An error occurred while fetching the data. Please try again later.";
                resultsMessage.style.display = "block";
            });

        input.value = "";
    });

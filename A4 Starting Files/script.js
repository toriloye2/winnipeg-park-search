/******w**************

    Assignment 4 Javascript
    Name: Oriloye Toyyib
    Date:
    Description:

*********************/

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("parkSearchForm");
    const input = document.getElementById("parkName");
    const tableBody = document.getElementById("parkData");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const resultsMessage = document.getElementById("resultsMessage");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = input.value.trim();

      if (searchTerm === "") {
        alert("Please enter a park name.");
        return;
      }

      // Clear previous results
      tableBody.innerHTML = "";
      noResultsMessage.style.display = "none";
      resultsMessage.style.display = "none";

      const encodedURL = encodeURI(
        'https://data.winnipeg.ca/resource/tx3d-pfxq.json?' +
        `$where=lower(location_description) LIKE lower('%${searchTerm}%')` +
        '&$order=location_description DESC' +
        '&$limit=100'
      );

      // Show loading message
      resultsMessage.textContent = "Loading...";
      resultsMessage.style.display = "block";

      fetch(encodedURL)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data.");
          }
        })
        .then(function (data) {
          // Clear the loading message
          resultsMessage.style.display = "none";

          if (data.length === 0) {
            // Show "No results found" message
            noResultsMessage.style.display = "block";
          } else {
            // Show results
            resultsMessage.style.display = "block";
            resultsMessage.textContent = "Here’s a list of the requested parks in Winnipeg:";

            for (let item of data) {
              let location_description = item.location_description;
              let row = tableBody.insertRow();
              let cell = row.insertCell(0);
              cell.textContent = location_description;
            }
          }
        })
        .catch(function (error) {
          console.error('Fetch error:', error);
          resultsMessage.textContent = "An error occurred while fetching the data. Please try again later.";
          resultsMessage.style.display = "block";
        });

      // Clear the input field after submission
      input.value = "";
    });
  });

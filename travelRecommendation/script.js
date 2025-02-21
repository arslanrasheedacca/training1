document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultsContainer = document.getElementById('results-container');

    // Fetch travel recommendations
    async function fetchTravelData() {
        try {
            const response = await fetch('travel_recommendation_api.json'); //https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json
            return await response.json();
        } catch (error) {
            console.error('Error fetching travel data:', error);
            return null;
        }
    }

    // Search and filter recommendations
    async function searchRecommendations() {
        const travelData = await fetchTravelData();
        if (!travelData) return;

        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Filter recommendations based on keyword
        const filteredResults = travelData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );

        displayRecommendations(filteredResults);
    }

    // Display recommendations
    function displayRecommendations(recommendations) {
        resultsContainer.innerHTML = '';

        recommendations.forEach(recommendation => {
            const card = document.createElement('div');
            card.classList.add('recommendation-card');
            
            card.innerHTML = `
                <img src="${recommendation.imageUrl}" alt="${recommendation.name}">
                <div class="recommendation-details">
                    <h3>${recommendation.name}</h3>
                    <p>${recommendation.description}</p>
                    <p>Category: ${recommendation.category}</p>
                    <button class="book-now">Visit</button>
                </div>
            `;

            resultsContainer.appendChild(card);
        });
    }

    // Reset search results
    function resetSearch() {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    }

    // Event Listeners
    searchBtn?.addEventListener('click', searchRecommendations);
    resetBtn?.addEventListener('click', resetSearch);

    // Optional: Time display for recommended country
    function displayCountryTime(timeZone) {
        const options = { 
            timeZone: timeZone, 
            hour12: true, 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        };
        const countryTime = new Date().toLocaleTimeString('en-US', options);
        console.log(`Current time in ${timeZone}:`, countryTime);
    }
});
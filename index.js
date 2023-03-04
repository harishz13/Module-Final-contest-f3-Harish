const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const searchHistoryList = document.querySelector('#search-history');

// event listener to search form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter a search term.');
    return;
  }
  const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      displaySearchResults(data.items);
      saveSearchTerm(searchTerm);
    });
    
});

// Display search history on page load


// event listener to search history items
searchHistoryList.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('search-history-item')) {
    const searchTerm = event.target.textContent;
    searchInput.value = searchTerm;
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        displaySearchResults(data.items);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while fetching search results.');
      });
  }
});

// showing the search results
function displaySearchResults(results) {
  searchResults.innerHTML = '';
  if (results.length === 0) {
    searchResults.innerHTML = '<p>No results found.</p>';
    return;
  }
  const resultItems = results.map(result => {
    const title = result.volumeInfo.title;
    const authors = result.volumeInfo.authors ? result.volumeInfo.authors.join(', ') : 'Unknown';
    const thumbnailUrl = result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : '';
    return `
      <div class="search-result">
        <img src="${thumbnailUrl}" alt="${title}" />
        <div>
          <h3>${title}</h3>
          <p>by ${authors}</p>
        </div>
      </div>
    `;
  });
  searchResults.innerHTML = resultItems.join('');
}

// Save search term to localStorage
function saveSearchTerm(term) {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!searchHistory.includes(term)) {
    searchHistory.push(term);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    const searchHistoryItem = `<li><a href="#" class="search-history-item">${term}</a></li>`;
    searchHistoryList.insertAdjacentHTML('beforeend', searchHistoryItem);
  }
}
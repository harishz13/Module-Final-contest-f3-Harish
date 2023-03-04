const searchHistoryList = document.querySelector('#search-history');
const clearHistoryButton = document.querySelector('#clear-history');

const searchResults = document.querySelector('#search-results');




window.addEventListener('load', () => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (searchHistory.length > 0) {
      const searchHistoryItems = searchHistory.map(term => {
        return `<li><a href="#" class="search-history-item">${term}</a></li>`;
      });
      searchHistoryList.innerHTML = searchHistoryItems.join('');
    }
   
  });





  clearHistoryButton.addEventListener('click',()=>{localStorage.removeItem("searchHistory");
  alert("Search history cleared."); searchHistoryList.innerHTML = "";});






 
  
  const links = document.querySelectorAll('.search-history-item a');

  links.forEach(function(link) {
    console.log(link.value);
    link.addEventListener('click', displaySearchResults(link.textContent));
  });

  function displaySearchResults(results) {
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(results)}`;
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      displayResults(data.items);
      });}

     function displayResults(results){
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
     searchResults.innerHTML = resultItems.join('');}
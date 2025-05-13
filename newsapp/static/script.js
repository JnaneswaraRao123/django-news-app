function fetchNews() {
  const query = document.getElementById('search').value || 'technology';
  const url = `/api/news/?q=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('news-container');
      container.innerHTML = '';

      if (!data.articles || data.articles.length === 0) {
        container.innerHTML = '<p>No articles found.</p>';
        return;
      }

      data.articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'article';
        newsItem.innerHTML = `
          <h2>${article.title}</h2>
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="Image">` : ''}
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        `;
        
        container.appendChild(newsItem);
        

      });
    })
    .catch(error => {
      console.error(error);
      document.getElementById('news-container').innerHTML = '<p>Error fetching news.</p>';
    });
}

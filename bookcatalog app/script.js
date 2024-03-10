const form = document.getElementById('search-form');
const bookList = document.getElementById('book-list');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-query').value;
  searchBooks(query);
});

async function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      displayBooks(data.items);
    } else {
      bookList.innerHTML = '<p>No books found.</p>';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayBooks(books) {
  bookList.innerHTML = '';

  books.forEach(book => {
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');
    bookItem.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <div>
        <h2>${title}</h2>
        <p>Author(s): ${authors}</p>
      </div>
    `;
    bookList.appendChild(bookItem);
  });
}

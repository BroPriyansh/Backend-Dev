const express = require('express');
const validateYear = require('../middleware/validateYear');

const router = express.Router();

// In-memory data
global.books = [
  { id: 1, title: 'Clean Code', author: 'Robert Martin', year: 2008 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', year: 1999 },
  { id: 3, title: 'You Don\'t Know JS', author: 'Kyle Simpson', year: 2015 }
];

// Exercise 1 & 3: Filtering + Pagination
router.get('/', (req, res) => {
  let { author, year, page = 1, limit = 10 } = req.query;

  let filteredBooks = [...global.books];

  // Filtering by author
  if (author) {
    filteredBooks = filteredBooks.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Filtering by year
  if (year) {
    filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
  }

  // Pagination
  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    total: filteredBooks.length,
    page,
    limit,
    data: paginatedBooks
  });
});

// GET single book
router.get('/:id', (req, res) => {
  const book = global.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Create book (with year validation)
router.post('/', validateYear, (req, res) => {
  const { title, author, year } = req.body;

  const newBook = {
    id: global.books.length + 1,
    title,
    author,
    year
  };

  global.books.push(newBook);
  res.status(201).json(newBook);
});

// Update book
router.put('/:id', validateYear, (req, res) => {
  const book = global.books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author, year } = req.body;

  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;

  res.json(book);
});

// Delete book
router.delete('/:id', (req, res) => {
  const index = global.books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = global.books.splice(index, 1);
  res.json({ message: 'Book deleted', book: deleted[0] });
});

module.exports = router;
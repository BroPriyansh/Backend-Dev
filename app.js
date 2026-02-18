const express = require('express');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes);

// Search endpoint (Exercise 5)
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: 'Search query (q) is required' });
  }

  const results = global.books.filter(
    book =>
      book.title.toLowerCase().includes(q.toLowerCase()) ||
      book.author.toLowerCase().includes(q.toLowerCase())
  );

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
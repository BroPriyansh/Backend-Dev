// Exercise 4: Full CRUD for Authors
const express = require('express');
const router = express.Router();

let authors = [
  { id: 1, name: 'Robert Martin', country: 'USA' },
  { id: 2, name: 'Andrew Hunt', country: 'USA' }
];

// GET all authors
router.get('/', (req, res) => {
  res.json(authors);
});

// GET single author
router.get('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
});

// CREATE author
router.post('/', (req, res) => {
  const { name, country } = req.body;

  const newAuthor = {
    id: authors.length + 1,
    name,
    country
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// UPDATE author
router.put('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });

  const { name, country } = req.body;
  if (name) author.name = name;
  if (country) author.country = country;

  res.json(author);
});

// DELETE author
router.delete('/:id', (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Author not found' });

  const deleted = authors.splice(index, 1);
  res.json({ message: 'Author deleted', author: deleted[0] });
});

module.exports = router;
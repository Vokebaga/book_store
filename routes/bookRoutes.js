const express = require("express");
const Book = require("../models/book");
const router = express.Router();

// Task 1: Get the book list
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Task 2: Get books based on ISBN
router.get("/isbn/:isbn", async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  res.json(book);
});

// Task 3: Get all books by Author
router.get("/author/:author", async (req, res) => {
  const books = await Book.find({ author: req.params.author });
  res.json(books);
});

// Task 4: Get all books based on Title
router.get("/title/:title", async (req, res) => {
  const books = await Book.find({ title: { $regex: req.params.title, $options: "i" } });
  res.json(books);
});

// Task 5: Get book reviews
router.get("/:id/reviews", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book.reviews);
});

module.exports = router;

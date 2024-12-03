const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Book = require("../models/book");
const { jwtSecret } = require("../config");

const router = express.Router();

// Task 6: Register New user
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User registered successfully" });
});

// Task 7: Login as a Registered user
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.json({ token });
});

// Middleware for authentication
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Task 8: Add/Modify a book review
router.post("/books/:id/reviews", authenticate, async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviewIndex = book.reviews.findIndex((r) => r.userId.toString() === req.userId);
  if (reviewIndex > -1) {
    book.reviews[reviewIndex].review = req.body.review;
  } else {
    book.reviews.push({ userId: req.userId, review: req.body.review });
  }
  await book.save();
  res.json(book);
});

// Task 9: Delete book review
router.delete("/books/:id/reviews", authenticate, async (req, res) => {
  const book = await Book.findById(req.params.id);
  book.reviews = book.reviews.filter((r) => r.userId.toString() !== req.userId);
  await book.save();
  res.json(book);
});

module.exports = router;

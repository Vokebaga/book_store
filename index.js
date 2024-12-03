const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Для обработки JSON-запросов

// Мок-данные книг
const books = [
  { isbn: "978-3-16-148410-0", title: "Book One", author: "Author One", reviews: [] },
  { isbn: "978-1-23-456789-7", title: "Book Two", author: "Author Two", reviews: [] },
];

// Мок-данные пользователей
const users = [
  { id: 1, username: "user1", password: "password1" }
];

// Task 1: Получить список книг
app.get("/books", (req, res) => {
  res.json(books);
});

// Task 2: Получить книгу по ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 3: Получить книги по автору
app.get("/books/author/:author", (req, res) => {
  const authorBooks = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  res.json(authorBooks);
});

// Task 4: Получить книги по названию
app.get("/books/title/:title", (req, res) => {
  const titleBooks = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
  res.json(titleBooks);
});

// Task 5: Получить отзывы о книге
app.get("/books/:isbn/reviews", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 6: Регистрация нового пользователя
app.post("/users/register", (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.status(201).json(user);
});

// Task 7: Вход зарегистрированного пользователя
app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Login successful", userId: user.id });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Task 8: Добавить или изменить отзыв о книге
app.post("/books/:isbn/review", (req, res) => {
  const { review } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    book.reviews.push(review);
    res.status(201).json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 9: Удалить отзыв
app.delete("/books/:isbn/review", (req, res) => {
  const { review } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    book.reviews = book.reviews.filter(r => r !== review);
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


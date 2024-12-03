const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  reviews: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      review: String,
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);

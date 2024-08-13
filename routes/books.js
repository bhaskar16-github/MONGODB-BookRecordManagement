const express = require("express");

const {
  getAllBooks,
  getsingleBookById,
  getIssuedAllBooks,
  addNewBook,
  updateBookById,
} = require ("../controllers/book-controller");


const {UserModel, BookModel} = require("../models");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getsingleBookById);

router.get("/issued/byuser", getIssuedAllBooks);

router.post("/", addNewBook);

router.put("/:id", updateBookById);

module.exports = router;
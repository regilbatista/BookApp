const express = require("express");

const router = express.Router();


const adminBookController = require("../controllers/adminBookController");

router.get("/books", adminBookController.getBooklist);

router.get("/add-books", adminBookController.getAddBook);

router.post("/add-books", adminBookController.postAddBook);

router.get("/edit-books/:bookId", adminBookController.getEditBook);

router.post("/edit-books", adminBookController.postEditBook);

router.post("/drop-books", adminBookController.postDeleteBook);

module.exports = router;
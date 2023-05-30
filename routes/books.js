const express = require("express");

const router = express.Router();


const booksController = require("../controllers/booksController");

router.get("/", booksController.getBook);

router.post("/found", booksController.postfoundBook);

router.post("/filter", booksController.postfilterBook);

router.get("/selected/:bookId", booksController.getSelectedBook);

module.exports = router;
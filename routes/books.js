const express = require("express");

const router = express.Router();

const booksController = require("../controllers/booksController");
const isAuth = require("../middlewares/is-auth");

router.get("/", booksController.getBook);

router.post("/found", booksController.postfoundBook);

router.post("/filter", booksController.postfilterBook);

router.get("/selected/:bookId", booksController.getSelectedBook);


module.exports = router;
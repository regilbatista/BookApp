const express = require("express");

const router = express.Router();

const adminBookController = require("../controllers/adminBookController");
const isAdmin = require("../middlewares/is-admin");

router.get("/books",isAdmin, adminBookController.getBooklist);

router.get("/add-books",isAdmin, adminBookController.getAddBook);

router.post("/add-books",isAdmin, adminBookController.postAddBook);

router.get("/edit-books/:bookId",isAdmin, adminBookController.getEditBook);

router.post("/edit-books",isAdmin, adminBookController.postEditBook);

router.post("/drop-books",isAdmin, adminBookController.postDeleteBook);

module.exports = router;
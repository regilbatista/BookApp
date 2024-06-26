const express = require("express");

const router = express.Router();

const adminLoansController = require("../controllers/adminLoansController");
const isAdmin = require("../middlewares/is-admin");

router.get("/loans",isAdmin, adminLoansController.getLoans);

router.get("/selected/:bookId", adminLoansController.getSelectedBook);

// router.get("/add-books",isAdmin, adminLoansController.getAddBook);

// router.post("/add-books",isAdmin, adminLoansController.postAddBook);

// router.get("/edit-books/:bookId",isAdmin, adminLoansController.getEditBook);

// router.post("/edit-books",isAdmin, adminLoansController.postEditBook);

// router.post("/drop-books",isAdmin, adminLoansController.postDeleteBook);

module.exports = router;
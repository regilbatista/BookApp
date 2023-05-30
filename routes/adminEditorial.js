const express = require("express");

const router = express.Router();


const adminEditorialsController = require("../controllers/adminEditorialController");

router.get("/editorials", adminEditorialsController.getEditoriallist);

router.get("/add-editorials", adminEditorialsController.getAddEditorial);

router.post("/add-editorials", adminEditorialsController.postAddEditorial);

router.get("/edit-editorials/:editorialId", adminEditorialsController.getEditEditorial);

router.post("/edit-editorials", adminEditorialsController.postEditEditorial);

router.post("/drop-editorials", adminEditorialsController.postDeleteEditorial);

module.exports = router;
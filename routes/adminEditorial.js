const express = require("express");

const router = express.Router();

const adminEditorialsController = require("../controllers/adminEditorialController");
const isAdmin = require("../middlewares/is-admin");

router.get("/editorials",isAdmin, adminEditorialsController.getEditoriallist);

router.get("/add-editorials",isAdmin, adminEditorialsController.getAddEditorial);

router.post("/add-editorials",isAdmin, adminEditorialsController.postAddEditorial);

router.get("/edit-editorials/:editorialId",isAdmin, adminEditorialsController.getEditEditorial);

router.post("/edit-editorials",isAdmin, adminEditorialsController.postEditEditorial);

router.post("/drop-editorials",isAdmin, adminEditorialsController.postDeleteEditorial);

module.exports = router;
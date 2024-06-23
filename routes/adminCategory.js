const express = require("express");

const router = express.Router();

const adminCategorysController = require("../controllers/adminCategoryController");
const isAdmin = require("../middlewares/is-admin");

router.get("/categorys",isAdmin, adminCategorysController.getCategorylist);

router.get("/add-categorys",isAdmin, adminCategorysController.getAddCategory);

router.post("/add-categorys",isAdmin, adminCategorysController.postAddCategory);

router.get("/edit-categorys/:categoryId",isAdmin, adminCategorysController.getEditCategory);

router.post("/edit-categorys",isAdmin, adminCategorysController.postEditCategory);

router.post("/drop-categorys",isAdmin, adminCategorysController.postDeleteCategory);

module.exports = router;
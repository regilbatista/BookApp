const express = require("express");

const router = express.Router();


const adminCategorysController = require("../controllers/adminCategoryController");

router.get("/categorys", adminCategorysController.getCategorylist);

router.get("/add-categorys", adminCategorysController.getAddCategory);

router.post("/add-categorys", adminCategorysController.postAddCategory);

router.get("/edit-categorys/:categoryId", adminCategorysController.getEditCategory);

router.post("/edit-categorys", adminCategorysController.postEditCategory);

router.post("/drop-categorys", adminCategorysController.postDeleteCategory);

module.exports = router;
const express = require("express");

const router = express.Router();


const adminWritersController = require("../controllers/adminWriterController");
const isAdmin = require("../middlewares/is-admin");

router.get("/writers",isAdmin, adminWritersController.getWriterlist);

router.get("/add-writers",isAdmin, adminWritersController.getAddWriter);

router.post("/add-writers",isAdmin, adminWritersController.postAddWriter);

router.get("/edit-writers/:writerId",isAdmin, adminWritersController.getEditWriter);

router.post("/edit-writers",isAdmin, adminWritersController.postEditWriter);

router.post("/drop-writers",isAdmin, adminWritersController.postDeleteWriter);

module.exports = router;
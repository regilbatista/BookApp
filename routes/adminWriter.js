const express = require("express");

const router = express.Router();


const adminWritersController = require("../controllers/adminWriterController");

router.get("/writers", adminWritersController.getWriterlist);

router.get("/add-writers", adminWritersController.getAddWriter);

router.post("/add-writers", adminWritersController.postAddWriter);

router.get("/edit-writers/:writerId", adminWritersController.getEditWriter);

router.post("/edit-writers", adminWritersController.postEditWriter);

router.post("/drop-writers", adminWritersController.postDeleteWriter);

module.exports = router;
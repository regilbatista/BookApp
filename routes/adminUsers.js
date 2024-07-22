const express = require("express");

const router = express.Router();

const adminUsersController = require("../controllers/adminUsersController");
const isAdmin = require("../middlewares/is-admin");

router.get("/users",isAdmin, adminUsersController.getUserslist);

router.get("/add-users",isAdmin, adminUsersController.getUsers);

router.post("/add-users",isAdmin, adminUsersController.PostAddUsers);

router.get("/edit-users/:userId",isAdmin, adminUsersController.getEditUser);

router.post("/edit-users",isAdmin, adminUsersController.postEditUser);

router.post("/drop-users",isAdmin, adminUsersController.postDeleteUser);

module.exports = router;
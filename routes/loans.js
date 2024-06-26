const express = require("express");

const router = express.Router();

const loansController = require("../controllers/loansController");
const isAuth = require("../middlewares/is-auth");

router.post("/loans",isAuth, loansController.postAddloan);

router.get("/loans",isAuth, loansController.getLoansByUser);

router.post("/devolution",isAuth, loansController.postDelBook);

module.exports = router;
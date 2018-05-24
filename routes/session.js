var router = require("express").Router();
var sessionController = require("../controllers/sessionController");

router.get("/logout",sessionController.logout);
router.post("/login",sessionController.login);

module.exports = router;